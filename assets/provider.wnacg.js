export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'wnacg.ru',
  base: 'wnacg.ru',
  name: '绅士漫画',
  host: ['wn09.shop', 'wnacg.com', 'wnacg.org', 'wnacg.ru', 'wn01.shop'],
  word: ['R18', '本子', '漫画'],
}

// Agent: 根据 Wnacg 官网 HTML 源码精准对齐生成的声明式数组路由规则 喵🐾
export const routes = [
  {
    key: 'list',
    type: 'template',
    pattern: '/albums-index-page-{page}.html',
  },
  {
    key: 'ranking',
    match: 'type',
    type: 'template',
    pattern: '/albums-{albums}-page-{page}-type-{type}-cate-{cate}.html',
    defaults: { albums: 'favorite_ranking' }
  },
  {
    key: 'tag',
    match: 'tag',
    type: 'template',
    pattern: '/albums-index-page-{page}-tag-{tag}.html',
  },
  {
    key: 'cate',
    match: 'cate',
    type: 'template',
    pattern: '/albums-index-page-{page}-cate-{cate}.html',
  },
  {
    key: 'search',
    match: 'word',
    path: '/search/',
    paging: { pageKey: 'p' },
    paramMap: { word: 'q' },
    defaults: { syn: 'yes', f: '_all', s: 'create_time_DESC' }
  }
]

export const entryMeta = async ({ url, host }) => {
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)
  const items = []
  items.push({ mode: 'radio', name: '最近更新', code: 'albums=index' })
  items.push({ mode: 'radio', name: '今日排行', code: 'albums=favorite_ranking&type=day' })
  items.push({ mode: 'radio', name: '本周排行', code: 'albums=favorite_ranking&type=week' })
  items.push({ mode: 'radio', name: '本月排行', code: 'albums=favorite_ranking&type=month' })
  items.push({ mode: 'radio', name: '今年排行', code: 'albums=favorite_ranking&type=year' })

  const navItems = [...document.querySelectorAll('#album_tabs > li')]
  for (const li of navItems) {
    const mainA = li.querySelector('a')
    const name = mainA?.textContent?.trim()
    const href = mainA?.getAttribute('href') || ''

    if (!name || name === '首頁' || name === '論壇' || name === '更新' || name === '排行') continue
    if (href.includes('wnbbs')) continue
    if (href.startsWith('http') && !href.includes(host)) continue

    items.push({ mode: 'line', name: name })

    const mainCate = href.match(/cate-(\d+)/)?.[1]
    if (mainCate) {
      items.push({ mode: 'radio', name: `全部${name}`, code: `cate=${mainCate}` })
    }

    const subs = li.querySelectorAll('.onemenulayout a')
    for (const sub of subs) {
      const subName = sub.textContent?.trim()
      const subHref = sub.getAttribute('href') || ''

      if (subHref.startsWith('http') && !subHref.includes(host)) continue

      const subCate = subHref.match(/cate-(\d+)/)?.[1]
      if (subCate) {
        items.push({ mode: 'radio', name: `${name}-${subName}`, code: `cate=${subCate}` })
      }
    }
  }

  return items
}

export const entryList = async ({ url, code }) => {
  console.info('[wnacg] fetch list url from Dart Engine:', url)
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)
  return [...document.querySelectorAll('.pic_box a')]
    .filter(el => el.getAttribute('href')?.includes('/photos'))
    .map(el => {
      const href = el.getAttribute('href') || ''
      const aid = href.match(/aid-(\d+)/)?.[1] || href
      const fullLink = new URL(href, url).href
      const imgSrc = el.querySelector('img')?.getAttribute('src')
      const fullCove = imgSrc ? new URL(imgSrc, url).href : ''
      return {
        mode: 'comic',
        code: hash(`${code}:${aid}`),
        link: fullLink,
        cove: fullCove,
        name: el.getAttribute('title') || el.querySelector('img')?.getAttribute('alt') || '',
        cardAction: scheme({ method: 'entryPost', link: fullLink })
      }
    })
}

export const entryPost = async ({ link }) => {
  console.info('[wnacg] fetch detail link from Dart Engine:', link)
  const { document } = await fetch(link).then(v => v.text()).then(parseHTML)
  const metaInfo = [...document.querySelectorAll('.uwconn > label')]
    .map(el => (el.textContent || '').replace(/[：:]/g, '').replace('分類', '').replace('頁數', '').trim())
    .filter(Boolean)
  const tags = [...document.querySelectorAll('.addtags a.tagshow')].map(el => {
    const tagName = (el.textContent || '').trim()
    return `${tagName}@tag=${tagName}`
  })
  const galleryUrl = link.replace('photos-index', 'photos-gallery')
  const galleryText = await fetch(galleryUrl).then(v => v.text())
  const regex = RegExp(String.raw`//[^\"]+/[^\"]+\.[^\"]+`, 'g')
  const matches = Array.from(galleryText.matchAll(regex))
  const gallery = matches.map((e) => 'https:' + e[0].substring(0, e[0].length - 1))
  return {
    word: [...metaInfo, ...tags],
    card: gallery.length > 0 ? [{ data: gallery }] : []
  }
}