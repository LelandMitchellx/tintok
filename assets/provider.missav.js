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
  // const genres = []
  // for (const p of [1, 2, 3, 4, 5]) {
  //   const { document } = await dio(`${url}/cn/genres?page=${p}`, { pipe: ['cloudflare'] }).then(parseHTML)
  //   const links = [...document.querySelectorAll('a.text-nord13')]
  //     .map(v => v.getAttribute('href'))
  //     .filter(f => f && f.includes('genres'))

  //   for (const href of links) {
  //     const name = decodeURIComponent(href.split('/').filter(Boolean).pop() || '')
  //     if (name && !genres.some(g => g.name === name)) {
  //       genres.push({ mode: 'radio', name, code: `genres=${encodeURIComponent(name)}` })
  //     }
  //   }
  // }

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

    {
        "mode": "radio",
        "name": "高清",
        "code": "genres=%E9%AB%98%E6%B8%85"
    },
    {
        "mode": "radio",
        "name": "独家",
        "code": "genres=%E7%8B%AC%E5%AE%B6"
    },
    {
        "mode": "radio",
        "name": "中出",
        "code": "genres=%E4%B8%AD%E5%87%BA"
    },
    {
        "mode": "radio",
        "name": "单体作品",
        "code": "genres=%E5%8D%95%E4%BD%93%E4%BD%9C%E5%93%81"
    },
    {
        "mode": "radio",
        "name": "巨乳",
        "code": "genres=%E5%B7%A8%E4%B9%B3"
    },
    {
        "mode": "radio",
        "name": "人妻",
        "code": "genres=%E4%BA%BA%E5%A6%BB"
    },
    {
        "mode": "radio",
        "name": "熟女",
        "code": "genres=%E7%86%9F%E5%A5%B3"
    },
    {
        "mode": "radio",
        "name": "素人",
        "code": "genres=%E7%B4%A0%E4%BA%BA"
    },
    {
        "mode": "radio",
        "name": "美少女",
        "code": "genres=%E7%BE%8E%E5%B0%91%E5%A5%B3"
    },
    {
        "mode": "radio",
        "name": "口交",
        "code": "genres=%E5%8F%A3%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "多人运动",
        "code": "genres=%E5%A4%9A%E4%BA%BA%E8%BF%90%E5%8A%A8"
    },
    {
        "mode": "radio",
        "name": "骑乘",
        "code": "genres=%E9%AA%91%E4%B9%98"
    },
    {
        "mode": "radio",
        "name": "薄格",
        "code": "genres=%E8%96%84%E6%A0%BC"
    },
    {
        "mode": "radio",
        "name": "痴女",
        "code": "genres=%E7%97%B4%E5%A5%B3"
    },
    {
        "mode": "radio",
        "name": "4小时以上",
        "code": "genres=4%E5%B0%8F%E6%97%B6%E4%BB%A5%E4%B8%8A"
    },
    {
        "mode": "radio",
        "name": "女高中生",
        "code": "genres=%E5%A5%B3%E9%AB%98%E4%B8%AD%E7%94%9F"
    },
    {
        "mode": "radio",
        "name": "潮吹",
        "code": "genres=%E6%BD%AE%E5%90%B9"
    },
    {
        "mode": "radio",
        "name": "苗条",
        "code": "genres=%E8%8B%97%E6%9D%A1"
    },
    {
        "mode": "radio",
        "name": "自拍",
        "code": "genres=%E8%87%AA%E6%8B%8D"
    },
    {
        "mode": "radio",
        "name": "合集",
        "code": "genres=%E5%90%88%E9%9B%86"
    },
    {
        "mode": "radio",
        "name": "乳交",
        "code": "genres=%E4%B9%B3%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "美乳",
        "code": "genres=%E7%BE%8E%E4%B9%B3"
    },
    {
        "mode": "radio",
        "name": "恋物癖",
        "code": "genres=%E6%81%8B%E7%89%A9%E7%99%96"
    },
    {
        "mode": "radio",
        "name": "NTR",
        "code": "genres=NTR"
    },
    {
        "mode": "radio",
        "name": "企划",
        "code": "genres=%E4%BC%81%E5%88%92"
    },
    {
        "mode": "radio",
        "name": "乱伦",
        "code": "genres=%E4%B9%B1%E4%BC%A6"
    },
    {
        "mode": "radio",
        "name": "搭讪",
        "code": "genres=%E6%90%AD%E8%AE%AA"
    },
    {
        "mode": "radio",
        "name": "颜射",
        "code": "genres=%E9%A2%9C%E5%B0%84"
    },
    {
        "mode": "radio",
        "name": "淫乱",
        "code": "genres=%E6%B7%AB%E4%B9%B1"
    },
    {
        "mode": "radio",
        "name": "偷拍",
        "code": "genres=%E5%81%B7%E6%8B%8D"
    },
    {
        "mode": "radio",
        "name": "4K",
        "code": "genres=4K"
    },
    {
        "mode": "radio",
        "name": "剧情",
        "code": "genres=%E5%89%A7%E6%83%85"
    },
    {
        "mode": "radio",
        "name": "自慰",
        "code": "genres=%E8%87%AA%E6%85%B0"
    },
    {
        "mode": "radio",
        "name": "手淫",
        "code": "genres=%E6%89%8B%E6%B7%AB"
    },
    {
        "mode": "radio",
        "name": "姐姐",
        "code": "genres=%E5%A7%90%E5%A7%90"
    },
    {
        "mode": "radio",
        "name": "羞辱",
        "code": "genres=%E7%BE%9E%E8%BE%B1"
    },
    {
        "mode": "radio",
        "name": "纪录片",
        "code": "genres=%E7%BA%AA%E5%BD%95%E7%89%87"
    },
    {
        "mode": "radio",
        "name": "拘束",
        "code": "genres=%E6%8B%98%E6%9D%9F"
    },
    {
        "mode": "radio",
        "name": "角色扮演",
        "code": "genres=%E8%A7%92%E8%89%B2%E6%89%AE%E6%BC%94"
    },
    {
        "mode": "radio",
        "name": "不伦",
        "code": "genres=%E4%B8%8D%E4%BC%A6"
    },
    {
        "mode": "radio",
        "name": "OL",
        "code": "genres=OL"
    },
    {
        "mode": "radio",
        "name": "妄想",
        "code": "genres=%E5%A6%84%E6%83%B3"
    },
    {
        "mode": "radio",
        "name": "制服",
        "code": "genres=%E5%88%B6%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "辣妹",
        "code": "genres=%E8%BE%A3%E5%A6%B9"
    },
    {
        "mode": "radio",
        "name": "女同性恋",
        "code": "genres=%E5%A5%B3%E5%90%8C%E6%80%A7%E6%81%8B"
    },
    {
        "mode": "radio",
        "name": "羞耻",
        "code": "genres=%E7%BE%9E%E8%80%BB"
    },
    {
        "mode": "radio",
        "name": "女大学生",
        "code": "genres=%E5%A5%B3%E5%A4%A7%E5%AD%A6%E7%94%9F"
    },
    {
        "mode": "radio",
        "name": "舔阴",
        "code": "genres=%E8%88%94%E9%98%B4"
    },
    {
        "mode": "radio",
        "name": "剃毛",
        "code": "genres=%E5%89%83%E6%AF%9B"
    },
    {
        "mode": "radio",
        "name": "按摩棒",
        "code": "genres=%E6%8C%89%E6%91%A9%E6%A3%92"
    },
    {
        "mode": "radio",
        "name": "指插",
        "code": "genres=%E6%8C%87%E6%8F%92"
    },
    {
        "mode": "radio",
        "name": "肛门",
        "code": "genres=%E8%82%9B%E9%97%A8"
    },
    {
        "mode": "radio",
        "name": "大屁股",
        "code": "genres=%E5%A4%A7%E5%B1%81%E8%82%A1"
    },
    {
        "mode": "radio",
        "name": "主观视角",
        "code": "genres=%E4%B8%BB%E8%A7%82%E8%A7%86%E8%A7%92"
    },
    {
        "mode": "radio",
        "name": "SM",
        "code": "genres=SM"
    },
    {
        "mode": "radio",
        "name": "仅送货",
        "code": "genres=%E4%BB%85%E9%80%81%E8%B4%A7"
    },
    {
        "mode": "radio",
        "name": "乱交",
        "code": "genres=%E4%B9%B1%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "出道作",
        "code": "genres=%E5%87%BA%E9%81%93%E4%BD%9C"
    },
    {
        "mode": "radio",
        "name": "屁股偏好",
        "code": "genres=%E5%B1%81%E8%82%A1%E5%81%8F%E5%A5%BD"
    },
    {
        "mode": "radio",
        "name": "风俗娘",
        "code": "genres=%E9%A3%8E%E4%BF%97%E5%A8%98"
    },
    {
        "mode": "radio",
        "name": "校服",
        "code": "genres=%E6%A0%A1%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "小只马",
        "code": "genres=%E5%B0%8F%E5%8F%AA%E9%A9%AC"
    },
    {
        "mode": "radio",
        "name": "玩具",
        "code": "genres=%E7%8E%A9%E5%85%B7"
    },
    {
        "mode": "radio",
        "name": "强制口交",
        "code": "genres=%E5%BC%BA%E5%88%B6%E5%8F%A3%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "各种职业",
        "code": "genres=%E5%90%84%E7%A7%8D%E8%81%8C%E4%B8%9A"
    },
    {
        "mode": "radio",
        "name": "丝袜",
        "code": "genres=%E4%B8%9D%E8%A2%9C"
    },
    {
        "mode": "radio",
        "name": "母亲",
        "code": "genres=%E6%AF%8D%E4%BA%B2"
    },
    {
        "mode": "radio",
        "name": "淫语",
        "code": "genres=%E6%B7%AB%E8%AF%AD"
    },
    {
        "mode": "radio",
        "name": "野外露出",
        "code": "genres=%E9%87%8E%E5%A4%96%E9%9C%B2%E5%87%BA"
    },
    {
        "mode": "radio",
        "name": "放尿",
        "code": "genres=%E6%94%BE%E5%B0%BF"
    },
    {
        "mode": "radio",
        "name": "按摩",
        "code": "genres=%E6%8C%89%E6%91%A9"
    },
    {
        "mode": "radio",
        "name": "全高清 (FHD)",
        "code": "genres=%E5%85%A8%E9%AB%98%E6%B8%85%20(FHD)"
    },
    {
        "mode": "radio",
        "name": "接吻",
        "code": "genres=%E6%8E%A5%E5%90%BB"
    },
    {
        "mode": "radio",
        "name": "女教师",
        "code": "genres=%E5%A5%B3%E6%95%99%E5%B8%88"
    },
    {
        "mode": "radio",
        "name": "按摩油",
        "code": "genres=%E6%8C%89%E6%91%A9%E6%B2%B9"
    },
    {
        "mode": "radio",
        "name": "内衣",
        "code": "genres=%E5%86%85%E8%A1%A3"
    },
    {
        "mode": "radio",
        "name": "吞精",
        "code": "genres=%E5%90%9E%E7%B2%BE"
    },
    {
        "mode": "radio",
        "name": "姐妹",
        "code": "genres=%E5%A7%90%E5%A6%B9"
    },
    {
        "mode": "radio",
        "name": "贫乳",
        "code": "genres=%E8%B4%AB%E4%B9%B3"
    },
    {
        "mode": "radio",
        "name": "泳装",
        "code": "genres=%E6%B3%B3%E8%A3%85"
    },
    {
        "mode": "radio",
        "name": "多人颜射",
        "code": "genres=%E5%A4%9A%E4%BA%BA%E9%A2%9C%E5%B0%84"
    },
    {
        "mode": "radio",
        "name": "水手服",
        "code": "genres=%E6%B0%B4%E6%89%8B%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "年轻妻子",
        "code": "genres=%E5%B9%B4%E8%BD%BB%E5%A6%BB%E5%AD%90"
    },
    {
        "mode": "radio",
        "name": "护士",
        "code": "genres=%E6%8A%A4%E5%A3%AB"
    },
    {
        "mode": "radio",
        "name": "和服",
        "code": "genres=%E5%92%8C%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "回春按摩",
        "code": "genres=%E5%9B%9E%E6%98%A5%E6%8C%89%E6%91%A9"
    },
    {
        "mode": "radio",
        "name": "超薄格",
        "code": "genres=%E8%B6%85%E8%96%84%E6%A0%BC"
    },
    {
        "mode": "radio",
        "name": "69",
        "code": "genres=69"
    },
    {
        "mode": "radio",
        "name": "胖妹",
        "code": "genres=%E8%83%96%E5%A6%B9"
    },
    {
        "mode": "radio",
        "name": "短裙",
        "code": "genres=%E7%9F%AD%E8%A3%99"
    },
    {
        "mode": "radio",
        "name": "极限高潮",
        "code": "genres=%E6%9E%81%E9%99%90%E9%AB%98%E6%BD%AE"
    },
    {
        "mode": "radio",
        "name": "好屁股",
        "code": "genres=%E5%A5%BD%E5%B1%81%E8%82%A1"
    },
    {
        "mode": "radio",
        "name": "恋足",
        "code": "genres=%E6%81%8B%E8%B6%B3"
    },
    {
        "mode": "radio",
        "name": "捆绑",
        "code": "genres=%E6%8D%86%E7%BB%91"
    },
    {
        "mode": "radio",
        "name": "巨乳偏好",
        "code": "genres=%E5%B7%A8%E4%B9%B3%E5%81%8F%E5%A5%BD"
    },
    {
        "mode": "radio",
        "name": "处女",
        "code": "genres=%E5%A4%84%E5%A5%B3"
    },
    {
        "mode": "radio",
        "name": "投稿",
        "code": "genres=%E6%8A%95%E7%A8%BF"
    },
    {
        "mode": "radio",
        "name": "大特写",
        "code": "genres=%E5%A4%A7%E7%89%B9%E5%86%99"
    },
    {
        "mode": "radio",
        "name": "眼镜娘",
        "code": "genres=%E7%9C%BC%E9%95%9C%E5%A8%98"
    },
    {
        "mode": "radio",
        "name": "M男",
        "code": "genres=M%E7%94%B7"
    },
    {
        "mode": "radio",
        "name": "温泉",
        "code": "genres=%E6%B8%A9%E6%B3%89"
    },
    {
        "mode": "radio",
        "name": "爆汗",
        "code": "genres=%E7%88%86%E6%B1%97"
    },
    {
        "mode": "radio",
        "name": "偶像艺人",
        "code": "genres=%E5%81%B6%E5%83%8F%E8%89%BA%E4%BA%BA"
    },
    {
        "mode": "radio",
        "name": "巨根",
        "code": "genres=%E5%B7%A8%E6%A0%B9"
    },
    {
        "mode": "radio",
        "name": "高妹",
        "code": "genres=%E9%AB%98%E5%A6%B9"
    },
    {
        "mode": "radio",
        "name": "媚药",
        "code": "genres=%E5%AA%9A%E8%8D%AF"
    },
    {
        "mode": "radio",
        "name": "已婚女人",
        "code": "genres=%E5%B7%B2%E5%A9%9A%E5%A5%B3%E4%BA%BA"
    },
    {
        "mode": "radio",
        "name": "颜面骑乘",
        "code": "genres=%E9%A2%9C%E9%9D%A2%E9%AA%91%E4%B9%98"
    },
    {
        "mode": "radio",
        "name": "运动服",
        "code": "genres=%E8%BF%90%E5%8A%A8%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "女仆",
        "code": "genres=%E5%A5%B3%E4%BB%86"
    },
    {
        "mode": "radio",
        "name": "女同性恋接吻",
        "code": "genres=%E5%A5%B3%E5%90%8C%E6%80%A7%E6%81%8B%E6%8E%A5%E5%90%BB"
    },
    {
        "mode": "radio",
        "name": "夫妻",
        "code": "genres=%E5%A4%AB%E5%A6%BB"
    },
    {
        "mode": "radio",
        "name": "监禁",
        "code": "genres=%E7%9B%91%E7%A6%81"
    },
    {
        "mode": "radio",
        "name": "脚交",
        "code": "genres=%E8%84%9A%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "迷你裙",
        "code": "genres=%E8%BF%B7%E4%BD%A0%E8%A3%99"
    },
    {
        "mode": "radio",
        "name": "震蛋",
        "code": "genres=%E9%9C%87%E8%9B%8B"
    },
    {
        "mode": "radio",
        "name": "义母",
        "code": "genres=%E4%B9%89%E6%AF%8D"
    },
    {
        "mode": "radio",
        "name": "皮肤白",
        "code": "genres=%E7%9A%AE%E8%82%A4%E7%99%BD"
    },
    {
        "mode": "radio",
        "name": "肛交",
        "code": "genres=%E8%82%9B%E4%BA%A4"
    },
    {
        "mode": "radio",
        "name": "艾曼纽",
        "code": "genres=%E8%89%BE%E6%9B%BC%E7%BA%BD"
    },
    {
        "mode": "radio",
        "name": "恶作剧",
        "code": "genres=%E6%81%B6%E4%BD%9C%E5%89%A7"
    },
    {
        "mode": "radio",
        "name": "超乳",
        "code": "genres=%E8%B6%85%E4%B9%B3"
    },
    {
        "mode": "radio",
        "name": "美腿",
        "code": "genres=%E7%BE%8E%E8%85%BF"
    },
    {
        "mode": "radio",
        "name": "广告偶像",
        "code": "genres=%E5%B9%BF%E5%91%8A%E5%81%B6%E5%83%8F"
    },
    {
        "mode": "radio",
        "name": "鬼畜",
        "code": "genres=%E9%AC%BC%E7%95%9C"
    },
    {
        "mode": "radio",
        "name": "女优合集",
        "code": "genres=%E5%A5%B3%E4%BC%98%E5%90%88%E9%9B%86"
    },
    {
        "mode": "radio",
        "name": "格斗",
        "code": "genres=%E6%A0%BC%E6%96%97"
    },
    {
        "mode": "radio",
        "name": "特摄",
        "code": "genres=%E7%89%B9%E6%91%84"
    },
    {
        "mode": "radio",
        "name": "黑人男优",
        "code": "genres=%E9%BB%91%E4%BA%BA%E7%94%B7%E4%BC%98"
    },
    {
        "mode": "radio",
        "name": "后入",
        "code": "genres=%E5%90%8E%E5%85%A5"
    },
    {
        "mode": "radio",
        "name": "女战士",
        "code": "genres=%E5%A5%B3%E6%88%98%E5%A3%AB"
    },
    {
        "mode": "radio",
        "name": "家庭教师",
        "code": "genres=%E5%AE%B6%E5%BA%AD%E6%95%99%E5%B8%88"
    },
    {
        "mode": "radio",
        "name": "变性者",
        "code": "genres=%E5%8F%98%E6%80%A7%E8%80%85"
    },
    {
        "mode": "radio",
        "name": "M女",
        "code": "genres=M%E5%A5%B3"
    },
    {
        "mode": "radio",
        "name": "情色写真",
        "code": "genres=%E6%83%85%E8%89%B2%E5%86%99%E7%9C%9F"
    },
    {
        "mode": "radio",
        "name": "后宫",
        "code": "genres=%E5%90%8E%E5%AE%AB"
    },
    {
        "mode": "radio",
        "name": "拷问",
        "code": "genres=%E6%8B%B7%E9%97%AE"
    },
    {
        "mode": "radio",
        "name": "多个故事",
        "code": "genres=%E5%A4%9A%E4%B8%AA%E6%95%85%E4%BA%8B"
    },
    {
        "mode": "radio",
        "name": "性感",
        "code": "genres=%E6%80%A7%E6%84%9F"
    },
    {
        "mode": "radio",
        "name": "未亡人",
        "code": "genres=%E6%9C%AA%E4%BA%A1%E4%BA%BA"
    },
    {
        "mode": "radio",
        "name": "即时插入",
        "code": "genres=%E5%8D%B3%E6%97%B6%E6%8F%92%E5%85%A5"
    },
    {
        "mode": "radio",
        "name": "清纯",
        "code": "genres=%E6%B8%85%E7%BA%AF"
    },
    {
        "mode": "radio",
        "name": "黑发",
        "code": "genres=%E9%BB%91%E5%8F%91"
    },
    {
        "mode": "radio",
        "name": "校园故事",
        "code": "genres=%E6%A0%A1%E5%9B%AD%E6%95%85%E4%BA%8B"
    },
    {
        "mode": "radio",
        "name": "恋爱",
        "code": "genres=%E6%81%8B%E7%88%B1"
    },
    {
        "mode": "radio",
        "name": "体操服",
        "code": "genres=%E4%BD%93%E6%93%8D%E6%9C%8D"
    },
    {
        "mode": "radio",
        "name": "3P、4P",
        "code": "genres=3P%E3%80%814P"
    },
    {
        "mode": "radio",
        "name": "伪娘",
        "code": "genres=%E4%BC%AA%E5%A8%98"
    },
    {
        "mode": "radio",
        "name": "灌肠",
        "code": "genres=%E7%81%8C%E8%82%A0"
    },
    {
        "mode": "radio",
        "name": "车震",
        "code": "genres=%E8%BD%A6%E9%9C%87"
    },
    {
        "mode": "radio",
        "name": "婊子",
        "code": "genres=%E5%A9%8A%E5%AD%90"
    },
    {
        "mode": "radio",
        "name": "女医生",
        "code": "genres=%E5%A5%B3%E5%8C%BB%E7%94%9F"
    },
    {
        "mode": "radio",
        "name": "空姐",
        "code": "genres=%E7%A9%BA%E5%A7%90"
    },
    {
        "mode": "radio",
        "name": "泡泡浴",
        "code": "genres=%E6%B3%A1%E6%B3%A1%E6%B5%B4"
    },
    {
        "mode": "radio",
        "name": "幻想",
        "code": "genres=%E5%B9%BB%E6%83%B3"
    },
    {
        "mode": "radio",
        "name": "女性向",
        "code": "genres=%E5%A5%B3%E6%80%A7%E5%90%91"
    },
    {
        "mode": "radio",
        "name": "白人",
        "code": "genres=%E7%99%BD%E4%BA%BA"
    },
    {
        "mode": "radio",
        "name": "大小姐",
        "code": "genres=%E5%A4%A7%E5%B0%8F%E5%A7%90"
    },
    {
        "mode": "radio",
        "name": "女搜查官",
        "code": "genres=%E5%A5%B3%E6%90%9C%E6%9F%A5%E5%AE%98"
    },
    {
        "mode": "radio",
        "name": "女上司",
        "code": "genres=%E5%A5%B3%E4%B8%8A%E5%8F%B8"
    },
    {
        "mode": "radio",
        "name": "体育",
        "code": "genres=%E4%BD%93%E8%82%B2"
    },
    {
        "mode": "radio",
        "name": "舞蹈",
        "code": "genres=%E8%88%9E%E8%B9%88"
    },
    {
        "mode": "radio",
        "name": "格斗家",
        "code": "genres=%E6%A0%BC%E6%96%97%E5%AE%B6"
    },
    {
        "mode": "radio",
        "name": "感谢祭",
        "code": "genres=%E6%84%9F%E8%B0%A2%E7%A5%AD"
    },
    {
        "mode": "radio",
        "name": "外国女优",
        "code": "genres=%E5%A4%96%E5%9B%BD%E5%A5%B3%E4%BC%98"
    },
    {
        "mode": "radio",
        "name": "古铜色",
        "code": "genres=%E5%8F%A4%E9%93%9C%E8%89%B2"
    },
    {
        "mode": "radio",
        "name": "原创",
        "code": "genres=%E5%8E%9F%E5%88%9B"
    },
    {
        "mode": "radio",
        "name": "最佳，综合",
        "code": "genres=%E6%9C%80%E4%BD%B3%EF%BC%8C%E7%BB%BC%E5%90%88"
    },
    {
        "mode": "radio",
        "name": "VR",
        "code": "genres=VR"
    },
    {
        "mode": "radio",
        "name": "只送货的业馀爱好者",
        "code": "genres=%E5%8F%AA%E9%80%81%E8%B4%A7%E7%9A%84%E4%B8%9A%E9%A6%80%E7%88%B1%E5%A5%BD%E8%80%85"
    },
    {
        "mode": "radio",
        "name": "模特儿",
        "code": "genres=%E6%A8%A1%E7%89%B9%E5%84%BF"
    }
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
    card: videoSrc ? [{ data: videoSrc, headers: {referer: url} }] : []
  }
}