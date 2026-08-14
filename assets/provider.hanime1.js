export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'hanime1.com',
  base: 'hanime1.com',
  name: 'Hanime1',
  host: ['hanime1.com', 'hanime1.me', 'hanimeone.me'],
  word: ['R18', '里番'],
}

export const routes = [
  {
    key: 'list',
    path: '/search',
  },
  {
    key: 'search',
    match: 'word',
    path: '/search',
    paramMap: { word: 'query' },
  }
]

export const entryMeta = async ({ url }) => {
  console.info(`[Hanime1] fetch meta url from Dart Engine: ${url}`)
  const { document } = await dio(url, { pipe: ['cloudflare'] }).then(parseHTML)
  const result = []
  const genreItems = [...document.querySelectorAll('.simple-dropdown-item.genre-option')]
  const genres = new Set()
  for (const item of genreItems) {
    const value = item.getAttribute('data-value')
    const name = item.querySelector('.hentai-sort-options')?.textContent?.trim() || value
    if (value && !genres.has(value)) {
      genres.add(value)
      result.push({
        mode: 'radio',
        name,
        code: `genre=${encodeURIComponent(value)}`
      })
    }
  }

  const tagSections = [...document.querySelectorAll('h5')]
  const tags = new Set()

  for (const h5 of tagSections) {
    const categoryName = h5.textContent?.trim()
    if (!categoryName) continue

    const labels = []
    let sibling = h5.nextElementSibling
    while (sibling && sibling.tagName !== 'H5') {
      if (sibling.classList?.contains('hentai-tags-wrapper')) {
        labels.push(sibling)
      }
      sibling = sibling.nextElementSibling
    }

    if (labels.length > 0) {
      result.push({ mode: 'line', name: categoryName })

      for (const label of labels) {
        const input = label.querySelector('input[name="tags[]"]')
        const span = label.querySelector('.checkmark')
        if (input && span) {
          const value = input.getAttribute('value')
          const name = span.textContent?.trim()
          if (value && !tags.has(value)) {
            tags.add(value)
            result.push({
              mode: 'choice',
              name: name || value,
              code: `tags[]=${encodeURIComponent(value)}`
            })
          }
        }
      }
    }
  }

  return result
}

export const entryList = async ({ url }) => {
  console.info('[Hanime1] fetch list url from Dart Engine:', url)
  const { document } = await dio(url, { pipe: ['cloudflare'] }).then(parseHTML)
  const rows = [...document.querySelectorAll('.home-rows-videos-wrapper a')]
    .filter(el => el.getAttribute('href')?.includes('watch'))
    .map(el => {
      const href = el.getAttribute('href')
      return {
        mode: 'video',
        code: hash(`${meta.code}:${new URL(href).searchParams.get('v')}`),
        link: href,
        cove: el.querySelector('img')?.getAttribute('src'),
        name: el.querySelector('.home-rows-videos-title')?.textContent?.trim(),
        cardAction: scheme({ method: 'entryPost', link: href }),
      }
    })

  const cols = [...document.querySelectorAll('.horizontal-row > .video-item-container')]
    .map(el => {
      const href = el.querySelector('a')?.getAttribute('href')
      return {
        mode: 'video',
        code: hash(`${meta.code}:${new URL(href).searchParams.get('v')}`),
        link: href,
        name_more: el.querySelector('.subtitle')?.textContent?.trim()?.split(' ')[0],
        cove: el.querySelector('img')?.getAttribute('src'),
        name: el.querySelector('.title')?.textContent?.trim(),
        cardAction: scheme({ method: 'entryPost', link: href }),
      }
    })

  return [...rows, ...cols]
}

export const entryPost = async ({ url }) => {
  console.info('[Hanime1] fetch post detail url from Dart Engine:', url)
  const { document } = await dio(url, { pipe: ['cloudflare'] }).then(parseHTML)
  const sources = [...document.querySelectorAll('video#player source')]
    .map(v => ({ src: v.getAttribute('src') || v.src, size: parseInt(v.getAttribute('size') || '0', 10) }))
    .sort((a, b) => b.size - a.size)
  const videoSrc = sources.length > 0 ? sources[0].src : ''
  const authorName = document.querySelector('#video-artist-name')?.textContent?.trim() ?? ''
  return {
    cove_more: document.querySelector('#video-user-avatar + img')?.getAttribute('src') || '',
    name_more: authorName ? `${authorName}@word=${encodeURIComponent(authorName)}` : '',
    note: document.querySelector('.video-caption-text')?.textContent?.trim() || '',
    word: [...document.querySelectorAll('.single-video-tag a[href*="search"]')]
      .map(el => {
        const tagText = el.textContent?.split('(')[0].replace('#', '').trim()
        if (!tagText) return null
        const href = el.getAttribute('href') ?? ''
        const queryParams = new URLSearchParams(href.split('?')[1] ?? '')
        const tagVal = queryParams.get('tags[]')
        if (tagVal) {
          return `${tagText}@tags[]=${encodeURIComponent(tagVal)}`
        }
        const queryVal = queryParams.get('query')
        if (queryVal) {
          return `${tagText}@word=${encodeURIComponent(queryVal)}`
        }
        return null
      })
      .filter(Boolean),
    card: videoSrc ? [{ data: videoSrc }] : []
  }
}