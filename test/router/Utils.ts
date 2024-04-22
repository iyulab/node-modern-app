import type { RouteInfo } from "./model";

/**
 * pathname 경로를 조합하여 반환합니다.
 */
export function combinePath(...paths: string[]) {
  return "/" + paths.map(p => p.replace(/^\/|\/$/g, ''))
  .filter(p => p.length > 0)
  .join('/');
}

/**
 * URL 문자열을 파싱하여 새로운 URL 정보를 반환합니다.
 */
export function parseURL(url: string): RouteInfo {
  let urlObj: URL;
  try {
    if (url.startsWith('http')) {
      urlObj = new URL(url);
    } else if (url.startsWith('/')) {
      urlObj = new URL(url, window.location.origin);
    } else {
      urlObj = new URL(window.location.href + url);
    }
  } catch (error) {
    throw new Error(`Invalid URL: ${url}`);
  }
  return {
    href: urlObj.href,
    origin: urlObj.origin,
    path: urlObj.href.replace(urlObj.origin, ''),
    pathname: urlObj.pathname,
    query: new URLSearchParams(urlObj.search),
    hash: urlObj.hash,
    params: {},
  };
}

/**
 * /foo/* -> /foo/bar/baz 와 같은 와일드카드 패턴을 처리하기 위한 함수
 */
export function getTailGroup(groups: {[key: string]: string | undefined}) {
  let tailKey: string | undefined;
  for (const key of Object.keys(groups)) {
    if (/\d+/.test(key) && (tailKey === undefined || key > tailKey!)) {
      tailKey = key;
    }
  }
  return tailKey && groups[tailKey];
}