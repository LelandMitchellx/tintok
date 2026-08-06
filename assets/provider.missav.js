export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'missav.ws',
  base: 'missav.ws',
  name: 'MISSAV',
  host: ['missav.ws', 'missav.live', 'missav.ai'],
  word: ['R18', 'JAV'],
}

// Agent: 声明式数组路由规则 喵🐾
export const routes = [
  {
    key: 'list',
    path: '/cn/new',
  },
  {
    key: 'search',
    match: 'word',
    type: 'template',
    pattern: '/cn/search/{word}',
  },
  {
    key: 'category',
    match: 'genres',
    type: 'template',
    pattern: '/cn/genres/{genres}',
  },
  {
    key: 'path',
    match: 'path',
    type: 'template',
    pattern: '/cn/{path}',
  }
]

export const entryMeta = async ({ url }) => {
  const genres = []
  for (const p of [1, 2, 3, 4, 5]) {
    const { document } = await dio(`${url}/cn/genres?page=${p}`, { pipe: ['cloudflare'] }).then(parseHTML)
    const links = [...document.querySelectorAll('a.text-nord13')]
      .map(v => v.getAttribute('href'))
      .filter(f => f && f.includes('genres'))

    for (const href of links) {
      const name = decodeURIComponent(href.split('/').filter(Boolean).pop() || '')
      if (name && !genres.some(g => g.name === name)) {
        genres.push({ mode: 'radio', name, code: `genres=${encodeURIComponent(name)}` })
      }
    }
  }

  return [
    { mode: 'radio', name: '最新', code: 'path=new' },
    { mode: 'radio', name: '中文字幕', code: 'path=chinese-subtitle' },
    { mode: 'radio', name: '新作上市', code: 'path=release' },
    { mode: 'radio', name: '无码流出', code: 'path=uncensored-leak' },
    { mode: 'line', name: '排行' },
    { mode: 'radio', name: '今日热门', code: 'path=today-hot' },
    { mode: 'radio', name: '本週热门', code: 'path=weekly-hot' },
    { mode: 'radio', name: '本月热门', code: 'path=monthly-hot' },
    { mode: 'line', name: '类型' },
    ...genres
  ]
}

export const entryList = async ({ url }) => {
  console.info('[MISSAV] fetch list url from Dart Engine:', url)
  const html = await dio(url, { pipe: ['cloudflare', 'cookies'] })
  const { document } = parseHTML(html)

  return [...document.querySelectorAll('.thumbnail.group')].map(el => {
    const a = el.querySelector('a')
    const href = a?.getAttribute('href') || ''
    const cardLink = href.startsWith('http') ? href : new URL(href, url).href
    const postId = href.split('/').filter(Boolean).pop() || cardLink
    const img = el.querySelector('img')
    const cove = img?.getAttribute('data-src') || img?.getAttribute('src') || ''
    const name = el.querySelector('.truncate')?.textContent?.trim() || img?.getAttribute('alt') || ''

    return {
      mode: 'video',
      code: hash(`${postId}:${meta.code}`),
      link: cardLink,
      cove: cove.startsWith('http') ? cove : (cove ? new URL(cove, url).href : ''),
      name: name,
      cardAction: scheme({ method: 'entryPost', link: cardLink })
    }
  })
}

export const entryPost = async ({ url }) => {
  console.info('[MISSAV] fetch post detail url from Dart Engine:', url)
  if (!url) return { card: [] }

  // Agent: 通过 onRequest 捕获包含 surrit.com / playlist.m3u8 媒体直链 喵🐾
  const videoSrc = await onRequest(url, ['playlist.m3u8', 'video.m3u8', 'surrit.com', '.m3u8']).catch(() => '')
  const { document } = await dio(url, { pipe: ['cloudflare', 'cookies'] }).then(parseHTML)
  const words = []
  const keyMap = {
    '女优': 'actresses',
    '类型': 'genres',
    '系列': 'series',
    '发行商': 'makers',
    '标籤': 'tags',
    '标签': 'tags'
  }

  const containers = [...document.querySelectorAll('div.text-secondary')]
  for (const container of containers) {
    const label = container.querySelector('span')?.textContent?.replace(':', '')?.trim()
    if (!label || label === '标题') continue

    const links = [...container.querySelectorAll('a')]
    if (links.length > 0) {
      const key = keyMap[label] || 'tag'
      links.forEach(l => {
        const name = l.textContent.trim()
        if (name) words.push(`${name}@${key}=${encodeURIComponent(name)}`)
      })
    }
  }

  const note = document.querySelector('.mt-4.text-sm')?.textContent?.trim() || ''

  return {
    word: words,
    note: note,
    card: videoSrc ? [{
      data: videoSrc,
      headers: {
        referer: url, // 👈 绝不可少防盗链 Referer 请求头！
      }
    }] : []
  }
}