// Agent: 极简 GitHub 下载代理 Worker (仅允许 GitHub 域名)
const GITHUB_URL_REGEX = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)*(?:github\.com|githubusercontent\.com)(?::\d+)?\//i;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let target = url.pathname.slice(1) + url.search + url.hash;

    if (!target) {
      return new Response('Usage: https://domain.com/https://github.com/...', { status: 400 });
    }

    // 自动补全 / 修正协议头
    if (target.startsWith('http:/') && !target.startsWith('http://')) {
      target = target.replace('http:/', 'http://');
    } else if (target.startsWith('https:/') && !target.startsWith('https://')) {
      target = target.replace('https:/', 'https://');
    } else if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }

    // 校验只允许 GitHub 相关域名
    if (!GITHUB_URL_REGEX.test(target)) {
      return new Response('Forbidden: Only GitHub URLs are allowed', { status: 403 });
    }

    try {
      const res = await fetch(target, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow',
      });
      const headers = new Headers(res.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(res.body, { status: res.status, headers });
    } catch (err) {
      return new Response(err.message, { status: 500 });
    }
  },
};
