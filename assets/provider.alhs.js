export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

// Agent: 艾利浩斯 (ALHS) 小说模块元数据与基础配置 喵🐾
export const meta = {
  code: 'alhs.xyz',
  base: 'alhs.xyz',
  name: '艾利浩斯',
  host: ['alhs.xyz'],
  word: ['R18', '小说'],
}

// Agent: 声明式路由定义（支持全量列表、Tag分类过滤与关键字搜索） 喵🐾
export const routes = [
  {
    key: 'list',
    type: 'template',
    pattern: '/index.php/page/{page}',
  },
  {
    key: 'tag',
    match: 'tag',
    type: 'template',
    pattern: '/index.php/archives/tag/{tag}/page/{page}',
  },
  {
    key: 'search',
    match: 'word',
    path: '/',
    paging: { pageKey: 'page' },
    paramMap: { word: 's' },
  }
]

// Agent: 分类与过滤器标签配置 喵🐾
export const entryMeta = async () => [
  { mode: 'radio', name: '最新', code: '@route=list' },
  { mode: 'line', name: '热门分类' },
  { mode: 'radio', name: 'SM', code: 'tag=sm' },
  { mode: 'radio', name: '调教', code: 'tag=tiao-jiao' },
  { mode: 'radio', name: '口交', code: 'tag=kou-jiao' },
  { mode: 'radio', name: '女仆', code: 'tag=nv-pu' },
  { mode: 'radio', name: '人妻', code: 'tag=ren-qi' },
  { mode: 'radio', name: '巨乳', code: 'tag=ju-ru' },
  { mode: 'radio', name: '强制', code: 'tag=qiang-zhi' },
  { mode: 'radio', name: '催眠', code: 'tag=cui-mian' },
  { mode: 'radio', name: '恋物', code: 'tag=lian-wu' },
  { mode: 'radio', name: '足控', code: 'tag=zu-kong' },
]

// Agent: 小说列表解析器（精准对齐 ALHS 真实 DOM 结构：提取文章ID、标题、作者、字数、Tag slug 并补全随机二次元封面） 喵🐾
export const entryList = async ({ url }) => {
  console.info('[alhs] fetch list url from Dart Engine:', url)
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)

  const items = [...document.querySelectorAll('article')].map(el => {
    const titleEl = el.querySelector('a.post-title') || el.querySelector('.post-title a') || el.querySelector('.post-title')
    const href = titleEl?.getAttribute('href') || el.querySelector('a')?.getAttribute('href') || ''
    const fullLink = href ? new URL(href, url).href : ''
    const title = titleEl?.textContent?.trim() || ''
    const id = el.getAttribute('id')?.replace('post-', '') || ''
    const author = el.querySelector('.post-meta-detail-author a')?.textContent?.trim() || ''
    const category = el.querySelector('.post-meta-detail-catagory-link')?.textContent?.trim() || ''
    const wordCount = el.querySelector('.post-meta-detail-words')?.textContent?.trim()?.replace(/\s+/g, '') || ''

    // 精准从 /archives/tag/{slug}/ 中提取 tag 的 slug 路由值
    const tags = [...el.querySelectorAll('.post-tags a')].map(t => {
      const tagName = t.textContent?.trim()
      const tagSlug = t.getAttribute('href')?.match(/\/tag\/([^\/]+)\/?/)?.[1] || tagName
      return tagName ? `${tagName}@tag=${tagSlug}` : null
    }).filter(Boolean)

    const wordList = [
      category ? `${category}@word=${encodeURIComponent(category)}` : null,
      wordCount || null,
      ...tags
    ].filter(Boolean)

    const thumbImg = el.querySelector('img')?.getAttribute('src') || ''
    const cove = thumbImg ? (thumbImg.startsWith('http') ? thumbImg : new URL(thumbImg, url).href) : ''

    return {
      mode: 'novel',
      code: hash(`${meta.code}:${id || fullLink}`),
      link: fullLink,
      name: title,
      name_more: author ? `${author}@word=${encodeURIComponent(author)}` : '',
      cove: cove,
      word: wordList,
      cardAction: scheme({ method: 'entryPost', link: fullLink }),
    }
  }).filter(item => item.link && item.name)

  const covers = await fetch('https://manyacg.top/api/__api_party/acgapi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/artwork/random',
      query: { page: 1, page_size: items.length, r18: 2, limit: items.length },
      headers: [],
      method: 'GET',
    }),
  })
    .then(r => r.json())
    .then(res => (res?.data ?? []).map(v => v?.pictures[0]?.regular ?? ''))
    .catch(() => items.map(() => ''))

  return items.map((item, i) => ({
    ...item,
    cove: item.cove || covers[i] || '',
  }))
}

// Agent: 小说正文详情解析器（输出包含分段段落列表的 PlayCard 契约） 喵🐾
export const entryPost = async ({ url }) => {
  console.info('[alhs] fetch detail url from Dart Engine:', url)
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)

  const title = document.querySelector('a.post-title, h1.post-title, .entry-title, h1')?.textContent?.trim() || ''
  const author = document.querySelector('.post-meta-detail-author a')?.textContent?.trim() || ''
  const contentEl = document.querySelector('#post_content, .post-content')

  let paragraphs = []
  if (contentEl) {
    const pElements = [...contentEl.querySelectorAll('p')].map(p => p.textContent?.trim()).filter(Boolean)
    if (pElements.length > 0) {
      paragraphs = pElements
    } else {
      paragraphs = (contentEl.textContent || '')
        .split('\n')
        .map(v => v.trim())
        .filter(Boolean)
    }
  }

  const tags = [...document.querySelectorAll('.post-tags a')].map(el => {
    const tagName = el.textContent?.trim()
    const tagSlug = el.getAttribute('href')?.match(/\/tag\/([^\/]+)\/?/)?.[1] || tagName
    return tagName ? `${tagName}@tag=${tagSlug}` : null
  }).filter(Boolean)

  return {
    name: title,
    name_more: author ? `${author}@word=${encodeURIComponent(author)}` : '',
    word: tags,
    card: [
      {
        name: title || '正文',
        data: paragraphs,
      }
    ]
  }
}