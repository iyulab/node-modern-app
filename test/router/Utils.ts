import type { RouteInfo } from "./Model";

/**
 * pathname 경로를 조합하여 반환합니다.
 * - 절대 경로로 반환됩니다.
 */
export function combinePath(...paths: string[]) {
  return "/" + paths.map(p => p.replace(/^\/|\/$/g, ''))
  .filter(p => p.length > 0)
  .join('/');
}

/**
 * URL 문자열을 파싱하여 새로운 URL 정보를 반환합니다.
 * - ?로 시작하는 쿼리스트링, #으로 시작하는 해시값은 현재 경로에서 추가됩니다.
 * - 상대경로는 basepath를 기준으로 절대경로로 변환됩니다.
 */
export function parseURL(url: string, basepath: string): RouteInfo {
  let urlObj: URL;
  try {
    if (url.startsWith('http')) {
      urlObj = new URL(url);
    } else if (url.startsWith('/')) {
      urlObj = new URL(url, window.location.origin);
    } else if (url.startsWith('?')) {
      urlObj = new URL(window.location.pathname + url, window.location.origin);
    } else if (url.startsWith('#')) {
      urlObj = new URL(window.location.pathname + window.location.search + url, window.location.origin);
    } else {
      basepath = catchBasePath(url, basepath);
      urlObj = new URL(combinePath(basepath, url), window.location.origin);
    }
  } catch (error) {
    throw new Error(`잘못된 URL 형식입니다.: ${url}`);
  }
  return {
    href: urlObj.href,
    origin: urlObj.origin,
    basepath: basepath,
    path: urlObj.href.replace(urlObj.origin, ''),
    pathname: urlObj.pathname,
    query: new URLSearchParams(urlObj.search),
    hash: urlObj.hash,
    params: {},
  };
}

/**
 * 현재 경로상의 basepath를 반환합니다.
 * @example
 * catchBasePath('/app/123/user/config', '/app/:id') => '/app/123'
 */
export function catchBasePath(pathname: string, basepath: string) {
  if (basepath === '/') return '/';
  basepath = basepath + '/*';

  const pattern = new URLPattern({ pathname: basepath });
  const match = pattern.exec({ pathname: pathname });
  if (match) {
    const rawPath = match.pathname.input;
    const restPath = match.pathname.groups?.["0"];
    return rawPath.replace("/" + restPath, '');
  } else {
    throw new Error(`잘못된 경로 입니다.: ${pathname}`);
  }
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
