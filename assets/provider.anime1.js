export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'anime1.me',
  base: 'anime1.me',
  name: 'Anime1',
  host: ['anime1.me'],
  word: ['动漫'],
}

export const routes = [
  {
    key: 'list',
    path: '/animelist.json',
  },
  {
    key: 'post',
    type: 'template',
    pattern: '/?cat={cat}',
  }
]

export const entryMeta = async () => [
  { mode: 'radio', name: '最新', code: 'type=latest' }
]

export const entryList = async ({ url, page = 1, word, size = 20 }) => {
  console.info('[Anime1] fetch list url from Dart Engine:', url)
  const json = await fetch(url).then(v => v.json())
  const list = word ? json.filter(([_, name]) => name.toLowerCase().includes(word.toLowerCase())) : json
  return list
    .slice((page - 1) * size, page * size)
    .map(([id, name]) => ({
      code: hash(`${meta.code}:${id}`),
      link: `https://${meta.base}/?cat=${id}`,
      cove: 'https://sta.anicdn.com/playerImg/8.jpg',
      name: name,
      mode: 'video',
      cardAction: scheme({ method: 'entryPost', link: `https://${meta.base}/?cat=${id}`, cat: id }),
    }))
}

export const entryPost = async ({ url }) => {
  console.info('[Anime1] fetch detail url from Dart Engine:', url)
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)
  const articles = [...document.querySelectorAll('article.post')]
  return Promise.all(
    articles.map(async article => {
      const videoEl = article.querySelector('video')
      if (!videoEl) return null
      const apiReq = decodeURIComponent(videoEl.getAttribute('data-apireq'))
      const res = await fetch('https://v.anime1.me/api', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ d: apiReq }).toString(),
      })
      const data = await res.json()
      const setCookie = res.headers.get('set-cookie') || ''
      const eMatch = setCookie.match(/(?:^|\s|;|,)e=([^;]+)/)
      const pMatch = setCookie.match(/(?:^|\s|;|,)p=([^;]+)/)
      const hMatch = setCookie.match(/(?:^|\s|;|,)h=([^;]+)/)
      const cookieStr = [eMatch ? `e=${eMatch[1]}` : '', pMatch ? `p=${pMatch[1]}` : '', hMatch ? `h=${hMatch[1]}` : ''].filter(Boolean).join(';')
      return {
        data: `https:${data.s[0].src}`,
        headers: { cookie: cookieStr },
      }
    })
  )
    .then(v => v.filter(Boolean))
    .then(v => v.reverse().map((v, k) => ({ ...v, name: `No.${k + 1}` })))
    .then(card => ({ card }))
}