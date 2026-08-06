export const { parseHTML } = await import('https://gcore.jsdelivr.net/npm/linkedom/worker.min.js');

export const meta = {
  code: 'nyaa.si',
  base: 'nyaa.si',
  name: 'Nyaa',
  host: ['nyaa.si', 'sukebei.nyaa.si'],
  word: ['R18', '磁力'],
}

// Agent: 声明式数组路由规则 喵🐾
export const routes = [
  {
    key: 'list',
    path: '/',
    paging: { pageKey: 'p' },
  },
  {
    key: 'search',
    match: 'word',
    path: '/',
    paging: { pageKey: 'p' },
    paramMap: { word: 'q' },
  }
]

// Agent: 根据是否为 sukebei 子域动态返回相匹配的 entryMeta 分类 喵🐾
export const entryMeta = async (args = {}) => {
  const isSukebei = (args?.base || '').includes('sukebei') ||
    (args?.url || '').includes('sukebei');

  if (isSukebei) {
    return [
      { mode: 'radio', name: 'All categories', code: 'c=0_0' },
      { mode: 'radio', name: 'Art - 全部', code: 'c=1_0' },
      { mode: 'radio', name: 'Art - Anime', code: 'c=1_1' },
      { mode: 'radio', name: 'Art - Doujinshi', code: 'c=1_2' },
      { mode: 'radio', name: 'Art - Games', code: 'c=1_3' },
      { mode: 'radio', name: 'Art - Manga', code: 'c=1_4' },
      { mode: 'radio', name: 'Art - Pictures', code: 'c=1_5' },
      { mode: 'radio', name: 'Real Life - 全部', code: 'c=2_0' },
      { mode: 'radio', name: 'Real Life - Pictures', code: 'c=2_1' },
      { mode: 'radio', name: 'Real Life - Videos', code: 'c=2_2' },
    ]
  }

  return [
    { mode: 'radio', name: '全部分类', code: 'c=0_0' },
    { mode: 'radio', name: '动画 - 全部', code: 'c=1_0' },
    { mode: 'radio', name: '动画 - AMV/MV', code: 'c=1_1' },
    { mode: 'radio', name: '动画 - 英语熟肉', code: 'c=1_2' },
    { mode: 'radio', name: '动画 - 非英语字幕', code: 'c=1_3' },
    { mode: 'radio', name: '动画 - 生肉', code: 'c=1_4' },
    { mode: 'radio', name: '音频 - 全部', code: 'c=2_0' },
    { mode: 'radio', name: '音频 - 无损音乐', code: 'c=2_1' },
    { mode: 'radio', name: '音频 - 有损音乐', code: 'c=2_2' },
    { mode: 'radio', name: '书籍 - 全部', code: 'c=3_0' },
    { mode: 'radio', name: '书籍 - 英语熟肉', code: 'c=3_1' },
    { mode: 'radio', name: '书籍 - 非英语字幕', code: 'c=3_2' },
    { mode: 'radio', name: '书籍 - 生肉', code: 'c=3_3' },
    { mode: 'radio', name: '真人 - 全部', code: 'c=4_0' },
    { mode: 'radio', name: '真人 - 英语熟肉', code: 'c=4_1' },
    { mode: 'radio', name: '真人 - 偶像/PV', code: 'c=4_2' },
    { mode: 'radio', name: '真人 - 非英语字幕', code: 'c=4_3' },
    { mode: 'radio', name: '真人 - 生肉', code: 'c=4_4' },
    { mode: 'radio', name: '图片 - 全部', code: 'c=5_0' },
    { mode: 'radio', name: '图片 - 图案/画集', code: 'c=5_1' },
    { mode: 'radio', name: '图片 - 照片', code: 'c=5_2' },
    { mode: 'radio', name: '软件 - 全部', code: 'c=6_0' },
    { mode: 'radio', name: '软件 - 应用', code: 'c=6_1' },
    { mode: 'radio', name: '软件 - 游戏', code: 'c=6_2' },
  ]
}

export const entryList = async ({ url }) => {
  console.info('[Nyaa] fetch list url from Dart Engine:', url)
  const { document } = await fetch(url).then(v => v.text()).then(parseHTML)

  const items = [
    ...document.querySelectorAll('.success'),
    ...document.querySelectorAll('.default'),
  ].map(v => {
    const td = v.querySelectorAll('td')
    const magnet = new URL(td[2].querySelectorAll('a')[1]?.href)
    const name = td[1].querySelector('a')?.getAttribute('title') ?? ''
    const xt = magnet?.searchParams.get('xt').split(':').at(-1)
    return {
      code: hash(xt),
      name,
      link: td[2].querySelectorAll('a')[1]?.href,
      mode: 'magnet',
    }
  })

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
    .then(res => (res?.data ?? []).map(v => v?.pictures[0].regular ?? meta.cove))
    .catch(() => items.map(() => meta.cove))

  return items.map((item, i) => ({ ...item, cove: covers[i] ?? meta.cove }))
}