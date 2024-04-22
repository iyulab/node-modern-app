// 노드와 브라우저에서 URLPattern을 지원하지 않는 경우에만 로드
// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist 
if (!globalThis.URLPattern) { 
  await import("urlpattern-polyfill");
}

import type { Route, RouteInfo } from './Route';
import type { ULayout } from '../layouts/Layout';
import type { UOutlet } from './Outlet';

export interface RouterConfig {
  root: ULayout;
  basepath?: string;
  routes: Route[];
  fallback?: any;
}

export class Router {
  private readonly root: ULayout;
  private readonly fallback?: any;

  private readonly _basepath: string;
  private readonly _routes: Route[] = [];
  private _currentRoute?: Route;
  private _routeInfo?: RouteInfo;

  public get basepath() {
    return this._basepath;
  }
  public get routes() {
    return this._routes;
  }
  public get currentRoute() {
    return this._currentRoute;
  }
  public get routeInfo() {
    return this._routeInfo;
  }

  constructor(config: RouterConfig) {
    this.root = config.root;    
    this.fallback = config.fallback;
    this._basepath = this.setBasepath(config.basepath || '/');
    this._routes = this.setRoutes(config.routes, this._basepath);
    this.connect();
  }

  /**
   * 라우터 연결
   */
  public connect() {
    window.addEventListener('popstate', this.onPopstate);
    this.onPopstate();
  }

  /**
   * 라우터 연결 해제
   */
  public disconnect() {
    window.removeEventListener('popstate', this.onPopstate);
  }

  /**
   * 지정한 경로로 이동
   * - 상대경로일 경우 basepath와 조합되어 이동합니다.
   * @param url 이동할 경로
   */
  public async go(url: string) {
    // URL 분석
    const routeInfo = this.parseURL(url);

    // 동일한 경로로 이동하는 경우 동작하지 않음
    if (routeInfo.href === this._routeInfo?.href) return;

    // 일치하는 라우트 찾기
    const route = this.getRoute(routeInfo.pathname);
    if(!route && routeInfo.pathname !== this._basepath) {
      throw new Error(`No route found for pathname: ${routeInfo.pathname}`);
    }

    // 데이터 로딩 및 라우팅 정보 업데이트
    routeInfo.params = route?.pattern?.exec({

      pathname: routeInfo.pathname,
    })?.pathname.groups || {};
    if (typeof route?.loader === 'function') {
      routeInfo.data = await route.loader(routeInfo);
    }
    this._currentRoute = route;
    this._routeInfo = routeInfo;
    document.title = route?.title || document.title;
    window.history.pushState({}, '', routeInfo.href);
    document.dispatchEvent(new CustomEvent('route-change', { detail: routeInfo }));
    console.log('route-change', routeInfo);

    // 페이지 렌더링
    await this.root.updateComplete;
    const outlet = this.root.shadowRoot?.querySelector('u-outlet') as UOutlet;
    if(route?.component) {
      outlet.renderReactComponent(route.component);
    } else if (route?.element) {
      outlet.renderLitElement(route.element);
    } else {
      outlet.removeDom();
    }
  }

  /**
   * 라우터 기본 경로로 이동
   */
  public async goBase() {
    await this.go(this._basepath);
  }

  /**
   * 라우터 기본 경로 재설정
  */
  private setBasepath(basepath: string) {
    return "/" + basepath.replace(/^\/|\/$/g, '');
  }

  /**
   * 라우터 경로 재설정 및 URLPattern 생성
   */
  private setRoutes(routes: Route[], basepath: string) {
    routes.forEach((route) => {
      route.path = route.index ? '' : route.path;
      route.path = route.path.replace(/^\/|\/$/g, '');
      route.pattern ||= new URLPattern({
        pathname: basepath + '/' + route.path,
      });
    });
    return [...this._routes, ...routes];
  }

  /**
   * 경로와 일치하는 라우트를 찾습니다.
   * URLPattern을 사용하여 경로를 비교합니다.
   */
  private getRoute(pathname: string) {
    const route = this._routes.find((route) => route.pattern?.test({ pathname: pathname }));
    if (route) {
      return route;
    }
    if (this.fallback) {
      return {
        path: '*',
        pattern: new URLPattern({ pathname: '*' }),
        element: this.fallback,
      } as Route;
    }
    return undefined;
  }

  /**
   * 브라우저 히스토리 이벤트가 발생했을 때 라우팅 처리
   */
  private onPopstate = () => {
    const href = window.location.href;
    this.go(href);
  };

  /**
   * URL 문자열을 파싱하여 새로운 URL 정보를 반환합니다.
   */
  private parseURL(url: string): RouteInfo {
    let urlObj: URL;
    try {
      if (url.startsWith('http')) {
        urlObj = new URL(url);
      } else if (url.startsWith('/')) {
        urlObj = new URL(url, window.location.origin);
      } else {
        urlObj = new URL(this._basepath + url, window.location.origin);
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
   * pathname 경로를 조합하여 반환합니다.
   */
  // private combinePath(...paths: string[]) {
  //   return paths.map(p => p.replace(/^\/|\/$/g, '')).join('/');
  // }

  /**
   * 전체 문서에서 a 태그의 이벤트가 발생했을 때 라우팅 처리
   * - 현재 사용하지 않습니다!
   */
  // private onClick = (e: MouseEvent) => {
  //   // 네비게이션 이벤트가 아닌 경우 리턴
  //   const isNonNavigationClick = e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey;
  //   if (e.defaultPrevented || isNonNavigationClick) return;

  //   // 클릭한 타겟이 a 태그가 아닌 경우 리턴
  //   const anchor = e.composedPath()
  //     .find((n) => (n as HTMLElement).tagName === 'A') as
  //     | HTMLAnchorElement | undefined;
  //   if ( anchor === undefined || anchor.target !== '' ||
  //     anchor.hasAttribute('download') || anchor.getAttribute('rel') === 'external'
  //   ) {
  //     return;
  //   }

  //   // a 태그의 href 속성이 비어있거나 mailto: 로 시작하는 경우 리턴
  //   const href = anchor.href;
  //   if (href === '' || href.startsWith('mailto:')) return;

  //   // a 태그의 origin 속성이 현재 origin과 다른 경우 리턴
  //   const origin = location.origin || location.protocol + '//' + location.host;
  //   if (anchor.origin !== origin) return;

  //   // a 태그의 href 속성이 현재 location.href와 다른 경우 라우팅
  //   e.preventDefault();
  //   if (href !== window.location.href) {
  //     window.history.pushState({}, '', href);
  //     this.goto(anchor.pathname);
  //   }
  // };
  
  /**
   * /foo/* -> /foo/bar/baz 와 같은 와일드카드 패턴을 처리하기 위한 함수
   * - 현재 사용하지 않습니다!
   */
  // private getTailGroup = (groups: {[key: string]: string | undefined}) => {
  //   let tailKey: string | undefined;
  //   for (const key of Object.keys(groups)) {
  //     if (/\d+/.test(key) && (tailKey === undefined || key > tailKey!)) {
  //       tailKey = key;
  //     }
  //   }
  //   return tailKey && groups[tailKey];
  // };
  
}