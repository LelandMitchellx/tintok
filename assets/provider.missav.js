export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'missav.ws',
  base: 'missav.ws',
  name: 'MISSAV',
  host: ['missav.ws', 'missav.live', 'missav.ai'],
  word: ['R18', 'JAV'],
}

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
    pattern: '/{path}',
  }
]

export const entryMeta = async ({ url, host }) => {
  const { document } = await dio(url, { pipe: ['webview', 'cookies'] }).then(parseHTML)
  // Agent: 排除非媒体浏览的个人/系统页面 喵🐾
  const ignorePatterns = ['/vip', '/saved', '/playlists', '/history', '/login', '/register']
  const isExcludedPath = (pathname) => ignorePatterns.some(p => pathname.includes(p))

  // Agent: 精准定位 mobile 导航菜单容器，避免被页面其他可能存在的 py-1 干扰 喵🐾
  const container = document.querySelector('div[x-show*="showDropdown"] div.py-1')
    || [...document.querySelectorAll('div.py-1')].find(el => el.querySelector('a[href*="chinese-subtitle"]') || el.querySelector('a[@click], a[x-show]'))
    || document.querySelector('div.py-1')
  if (!container) return []

  const result = []
  const directChildren = [...container.children]

  for (let i = 0; i < directChildren.length; i++) {
    const el = directChildren[i]

    // Agent: 折叠菜单分组（如: 观看日本 AV / 素人 / 无码影片 / 亚洲 AV 等） 喵🐾
    if (el.tagName === 'A' && (el.getAttribute('@click.prevent') || el.querySelector('span'))) {
      const groupName = el.querySelector('span')?.textContent?.trim() || ''
      const nextEl = directChildren[i + 1]

      if (nextEl && nextEl.tagName === 'SPAN') {
        const subLinks = [...nextEl.querySelectorAll('a')]
        const groupItems = []

        for (const subA of subLinks) {
          const href = subA.getAttribute('href') || ''
          if (!href) continue

          try {
            const linkUrl = new URL(href, url)
            // 🔒 Agent: 严格校验同源 host，非同源链接（如第三方广告外链）一律剔除 喵🐾
            if (linkUrl.host === host && !isExcludedPath(linkUrl.pathname)) {
              const text = subA.textContent.trim()
              const cleanPath = linkUrl.pathname.replace(/^\/+/, '')
              if (text && cleanPath && !groupItems.some(item => item.code === `path=${cleanPath}`)) {
                groupItems.push({
                  mode: 'radio',
                  name: text,
                  code: `path=${cleanPath}`
                })
              }
            }
          } catch (_) {}
        }

        // Agent: 仅当组内含有有效同源分类时才添加该分组，若全为外链广告（如'更多好站'）则整组排除 喵🐾
        if (groupItems.length > 0 && groupName) {
          result.push({ mode: 'line', name: groupName })
          result.push(...groupItems)
        }
        i++ // 跳过已消费的 span 容器
        continue
      }
    }

    // Agent: 独立直达链接（如: 中文字幕） 喵🐾
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') || ''
      if (!href) continue

      try {
        const linkUrl = new URL(href, url)
        // 🔒 Agent: 必须为同源 host 且非个人管理路径 喵🐾
        if (linkUrl.host === host && !isExcludedPath(linkUrl.pathname)) {
          const text = el.textContent.trim()
          const cleanPath = linkUrl.pathname.replace(/^\/+/, '')
          if (text && cleanPath && !result.some(item => item.code === `path=${cleanPath}`)) {
            result.push({
              mode: 'radio',
              name: text,
              code: `path=${cleanPath}`
            })
          }
        }
      } catch (_) {}
    }
  }

  // Agent: 并发异步拉取 /cn/genres 详细类型/标签数据 喵🐾
  try {
    const origin = new URL(url).origin
    const pages = [1, 2, 3, 4, 5]
    const genreDocs = await Promise.all(
      pages.map(p => dio(`${origin}/cn/genres?page=${p}`, { pipe: ['webview', 'cookies'] })
        .then(parseHTML)
        .catch(() => null))
    )

    const genres = []
    for (const doc of genreDocs) {
      if (!doc || !doc.document) continue
      const links = [...doc.document.querySelectorAll('a.text-nord13, a[href*="/genres/"]')]
        .map(v => v.getAttribute('href'))
        .filter(f => f && f.includes('genres'))

      for (const href of links) {
        const name = decodeURIComponent(href.split('/').filter(Boolean).pop() || '')
        if (name && name !== 'genres' && !genres.some(g => g.name === name)) {
          genres.push({
            mode: 'radio',
            name,
            code: `genres=${encodeURIComponent(name)}`
          })
        }
      }
    }

    if (genres.length > 0) {
      result.push({ mode: 'line', name: '类型' })
      result.push(...genres)
    }
  } catch (_) {}

  return result
}

export const entryList = async ({ code, url }) => {
  console.info('[MISSAV] fetch list url from Dart Engine:', url)
  const { document } = await dio(url, { pipe: ['webview', 'cookies'] }).then(parseHTML)
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
      code: hash(`${code}:${postId}`),
      link: cardLink,
      cove: cove.startsWith('http') ? cove : (cove ? new URL(cove, url).href : ''),
      name: name,
      cardAction: scheme({ method: 'entryPost', url: cardLink })
    }
  })
}

export const entryPost = async ({ url }) => {
  console.info('[MISSAV] fetch post detail url from Dart Engine:', url)
  const videoSrc = await onRequest(url, ['playlist.m3u8', 'video.m3u8', 'surrit.com', '.m3u8']).catch(() => '')
  const { document } = await dio(url, { pipe: ['webview', 'cookies'] }).then(parseHTML)
  const words = []
  const keyMap = { '女优': 'actresses', '类型': 'genres', '系列': 'series', '发行商': 'makers', '标籤': 'tags', '标签': 'tags' }
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
  return {
    word: words,
    note: document.querySelector('.mt-4.text-sm')?.textContent?.trim() || '',
    card: videoSrc ? [{ data: videoSrc, headers: { referer: url } }] : []
  }
}