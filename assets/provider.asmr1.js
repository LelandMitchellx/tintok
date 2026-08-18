export const meta = {
  code: 'asmr.one',
  base: 'asmr.one',
  name: 'ASMR1',
  host: ['api.asmr-200.com', 'api.asmr-100.com', 'api.asmr-300.com', 'api.asmr.one'],
  word: ['R18', 'ASMR'],
}

export const routes = [
  {
    key: 'list',
    path: '/api/works',
    paging: { pageKey: 'page' },
    defaults: { pageSize: 20 }
  },
  {
    key: 'popular',
    path: '/api/recommender/popular',
    paging: { pageKey: 'page' },
    defaults: { pageSize: 20 }
  },
  {
    key: 'post',
    type: 'template',
    pattern: '/api/tracks/{id}',
  }
]

export const entryMeta = async ({ url }) => {
  // Agent: 从 Dart 引擎传入的 URL 提取 origin，避免硬编码 API 域名 喵🐾
  const base = new URL(url).origin
  const tags = await fetch(`${base}/api/tags/`)
    .then(r => r.json())
    .catch(() => [])

  const tagItems = tags
    .sort((a, b) => b.count - a.count)
    .map(t => ({
      mode: 'choice',
      name: t.i18n?.['zh-cn']?.name || t.name,
      code: `tag=${t.name}`
    }))

  return [
    { mode: 'radio', name: '最新', code: 'routeKey=list' },
    { mode: 'radio', name: '热门', code: 'routeKey=popular' },

    { mode: 'line', name: '分类' },
    { mode: 'choice', name: '发售', code: 'order=release' },
    { mode: 'choice', name: '收录', code: 'order=create_date' },
    { mode: 'choice', name: '评分', code: 'order=rate_average_2dp' },
    { mode: 'choice', name: '销量', code: 'order=dl_count' },
    { mode: 'choice', name: '价格', code: 'order=price' },
    { mode: 'choice', name: '评论', code: 'order=review_count' },
    { mode: 'choice', name: 'RJ号', code: 'order=id' },
    { mode: 'choice', name: 'R18', code: 'order=nsfw' },
    { mode: 'choice', name: '随机', code: 'order=random' },

    { mode: 'line', name: '排序' },
    { mode: 'choice', name: '最新', code: 'sort=desc' },
    { mode: 'choice', name: '最旧', code: 'sort=asc' },

    { mode: 'line', name: '字幕' },
    { mode: 'choice', name: '有字幕', code: 'subtitle=1' },
    { mode: 'choice', name: '无字幕', code: 'subtitle=0' },

    { mode: 'line', name: '标签' },
    ...tagItems
  ]
}

// Agent: 搜索接口特殊处理 — word/tag/tags 需拼接为 $tag:xxx$ 路径格式，无法通过声明式路由表达 喵🐾
export const entryList = async (args) => {
  const host = new URL(args.url)

  // Agent: 根据传入的参数构造 ASMR1 路径搜索格式（word 直接拼接，tag 转 $tag:xxx$ 语法）喵🐾
  let q = ''
  if (args.word) q += args.word
  if (args.tag) q += ` $tag:${args.tag}$`
  if (args.tags) {
    const tagsArr = Array.isArray(args.tags) ? args.tags : [args.tags]
    tagsArr.forEach(t => { if (t) q += ` $tag:${t}$` })
  }

  if (q.trim().length > 0) {
    // Agent: ASMR1 搜索接口为路径拼接格式 /api/search/{encodedQuery} 喵🐾
    host.pathname = '/api/search/' + encodeURIComponent(q)
    host.searchParams.set('includeTranslationWorks', 'true')
  }

  // Agent: 清除非 API 参数，避免污染请求 喵🐾
  host.searchParams.delete('tag')
  host.searchParams.delete('tags')
  host.searchParams.delete('word')

  console.info('[ASMR1] fetch list url:', host.toString())
  const works = await fetch(host).then(v => v.json()).then(v => v.works || v).catch(err => {
    console.error('[ASMR1] fetch list error:', err)
    return []
  })

  return works.map(item => ({
    code: hash(`${meta.code}:${item.id}`),
    link: `https://${meta.base}/work/${item.id}`,
    mode: 'audio',
    name_more: item.name,
    cove: item.mainCoverUrl,
    name: item.title,
    word: [`RJ${`${item.id}`.padStart(8, '0')}@word=RJ${`${item.id}`.padStart(8, '0')}`, ...(item.tags || []).map(t => `${t.name}@tag=${t.name}`)],
    cardAction: scheme({ method: 'entryPost', link: `https://api.asmr-200.com/api/tracks/${item.id}`, id: item.id })
  }))
}

export const entryPost = async ({ url }) => {
  console.info('[ASMR1] fetch post detail url from Dart Engine:', url)
  const data = await fetch(url).then(v => v.json())
  const extractTracks = items => {
    const cards = []
    const walk = (list, parentTitle = '') => {
      for (const item of list) {
        if (item.type === 'folder' && item.children) {
          walk(item.children, item.title)
        } else if (item.type === 'audio' && item.mediaDownloadUrl) {
          cards.push({
            data: item.mediaDownloadUrl,
            name: parentTitle ? `${parentTitle} - ${item.title}` : item.title,
            // Agent: 检索同级目录中的同名字幕文件 (.vtt / .lrc) 写入 track 喵🐾
            track: list.find(s => s.title === item.title + '.vtt' || s.title === item.title + '.lrc' || s.title === item.title.replace(/\.[^/.]+$/, '.vtt') || s.title === item.title.replace(/\.[^/.]+$/, '.lrc'))?.mediaDownloadUrl || undefined
          })
        }
      }
    }
    walk(items)
    return cards
  }

  const cards = extractTracks(data)
  return { card: cards }
}