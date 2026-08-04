export const meta = {
  code: 'iwara.tv',
  base: 'iwara.tv',
  name: 'Iwara 666',
  host: ['api.iwara.tv', 'iwara.tv'],
  word: ['R18', 'MMD'],
}

// Agent: 声明式数组路由规则 喵🐾
export const routes = [
  {
    key: 'list',
    base: 'api.{domain}',
    path: '/videos',
    paging: { pageKey: 'page', startPage: 0 },
    defaults: { rating: 'all', sort: 'trending', limit: 49 }
  },
  {
    key: 'search',
    match: 'word',
    base: 'api.{domain}',
    path: '/search',
    paging: { pageKey: 'page', startPage: 0 },
    paramMap: { word: 'query' },
    defaults: { type: 'videos', sort: 'relevance' }
  },
  {
    key: 'post',
    type: 'template',
    base: 'api.{domain}',
    pattern: '/video/{id}',
  }
]

export const entryMeta = async () => [
  { mode: 'radio', name: '热门', code: 'sort=trending' },
  { mode: 'radio', name: '最新', code: 'sort=date' },
  { mode: 'radio', name: '榜单', code: 'sort=popularity' },
  { mode: 'radio', name: '浏览', code: 'sort=views' },
  { mode: 'radio', name: '点赞', code: 'sort=likes' },
]

export const entryList = async ({ url }) => {
  console.log('[iwara.tv] fetch list url from Dart Engine:', url)

  const data = await fetch(url).then(v => v.json()).catch(err => {
    console.log('[iwara.tv] fetch error:', err)
    return {}
  })

  console.log('[iwara.tv] fetch data count:', Array.isArray(data?.results) ? data.results.length : 0)
  const list = Array.isArray(data?.results) ? data.results : (Array.isArray(data) ? data : [])
  return Promise.all(list
    .filter(f => f && f.file && !f.embedUrl && f.status == 'active')
    .map(async v => ({
      code: hash(`${v.id}:${meta.code}`),
      cove: `https://i.iwara.tv/image/thumbnail/${v.file.id}/thumbnail-${String(v.thumbnail || 0).padStart(2, '0')}.jpg`,
      name: v.title || '',
      name_more: `${v.user?.name || ''}@user=${v.user?.id}`,
      cove_more: v.user?.avatar ? `https://i.iwara.tv/image/avatar/${v.user?.avatar?.id}/${v.user?.avatar?.name}` : 'https://www.iwara.tv/images/default-avatar.jpg',
      mode: 'video',
      link: `https://${meta.base}/video/${v.id}`,
      word: (v.tags || []).map(t => `${t?.id}@tags=${t?.id}`),
      cardAction: scheme({ method: 'entryPost', link: `https://${meta.base}/video/${v.id}`, id: v.id }),
    })))
}

export const entryPost = async ({ url }) => {
  console.log('[iwara.tv] fetch post detail url from Dart Engine:', url)
  if (!url) return { card: [] }

  const data = await fetch(url).then(r => r.json()).catch(err => {
    console.log('[iwara.tv] fetch post detail error:', err)
    return {}
  })

  const fileId = data.file?.id
  const fileUrlObj = data.fileUrl ? new URL(data.fileUrl) : null
  const expires = fileUrlObj ? fileUrlObj.searchParams.get('expires') : ''
  const xversion = hash(`${fileId}_${expires}_mSvL05GfEmeEmsEYfGCnVpEjYgTJraJN`, 'sha-1')
  const sources = await fetch(data.fileUrl, { headers: { 'x-version': xversion } }).then(r => r.json()).catch(() => [])
  const source = Array.isArray(sources) ? sources.find(f => f?.name === 'Source') : null
  return {
    note: data.body || '',
    card: source ? [{ data: `https:${source.src.view}` }] : [],
  }
}
