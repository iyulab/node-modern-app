// 노드와 브라우저에서 URLPattern을 지원하지 않는 경우에만 로드
// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist 
if (!globalThis.URLPattern) { 
  await import("urlpattern-polyfill");
}

import type { RouterConfig } from '../models/Router';
import type { Route, RouteInfo } from '../models/Route';
import type { ULayout } from '../../layouts/Layout';
import type { UOutlet } from '../elements/Outlet';
import { URLTool } from '../utils/URLTools';

export class Router {
  private readonly root: ULayout;
  private fallback?: any;
  private basepath: string;
  private routes: Route[] = [];
  
  private _currentRoute?: Route;
  private _routeInfo?: RouteInfo;

  public get currentRoute() {
    return this._currentRoute;
  }

  public get routeInfo() {
    return this._routeInfo;
  }

  constructor(config: RouterConfig) {
    this.root = config.root;    
    this.fallback = config.fallback;
    this.basepath = this.setBasepath(config.basepath || '/');
    this.routes = this.setRoutes(config.routes, this.basepath);
    console.log(this.routes);
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
   * - 절대경로일 경우 basepath를 무시하고 pathname으로 이동합니다.
   * - 상대경로일 경우 basepath와 조합하여 절대경로로 변환합니다.
   * @param pathname 이동할 경로
   */
  public async go(pathname: string) {
    // 동일한 경로로 이동하는 경우 동작하지 않음
    if (pathname === this._routeInfo?.pathname) return;

    // 경로 처리(상대경로일 경우 (basepath + pathname) 절대경로로 변환)
    const fullpath = pathname.startsWith('/') ? pathname 
    : URLTool.combinePath(this.basepath, pathname);

    // 일치하는 라우트 찾기
    const route = this.getRoute(fullpath);
    if(!route && fullpath !== this.basepath) {
      throw new Error(`No route found for ${pathname}`);
    }

    // 데이터 로딩 및 라우팅 정보 업데이트
    const params = route?.pattern?.exec(fullpath)?.pathname.groups || {};
    const query = new URLSearchParams(window.location.search);
    const routeUrl = { pathname: fullpath, params: params, query: query };
    let fetchData;
    if (typeof route?.loader === 'function') {
      fetchData = await route.loader(routeUrl);
    }
    this._currentRoute = route;
    this._routeInfo = { ...routeUrl, data: fetchData };
    window.history.pushState({}, route?.title || '', fullpath);

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
        pathname: basepath + route.path,
      });
    });
    return [...this.routes, ...routes];
  }

  /**
   * 경로와 일치하는 라우트를 찾습니다.
   * URLPattern을 사용하여 경로를 비교합니다.
   */
  private getRoute(pathname: string) {
    const route = this.routes.find((route) => route.pattern?.test({ pathname: pathname }));
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
    const pathname = window.location.pathname;
    this.go(pathname);
  };

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