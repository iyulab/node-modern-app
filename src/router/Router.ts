// 노드와 브라우저에서 URLPattern을 지원하지 않는 경우에만 로드
// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist 
if (!globalThis.URLPattern) { 
  await import("urlpattern-polyfill");
}

import type { LitElement } from 'lit';
import type { Route, RouteInfo, RouterConfig } from './Model';
import type { UOutlet } from './Outlet';
import { combinePath, parseURL } from './Utils';

export class Router {
  private readonly _rootElement: LitElement;
  private readonly _notfound: typeof LitElement | string;
  private readonly _basepath: string;
  private readonly _routes: Route[];
  private _routeInfo?: RouteInfo;
  private requestID?: string;

  public get basepath() {
    return this._basepath;
  }
  public get routeInfo() {
    return this._routeInfo;
  }

  constructor(config: RouterConfig) {
    this._rootElement = config.rootElement;
    this._notfound = config.notfound;
    this._basepath = combinePath(config.basepath || '/');
    this._routes = this.setRoutes(config.routes, this._basepath);
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
   * 라우트 URLPattern 생성
   */
  private setRoutes(routes: Route[], basepath: string) {
    for (const route of routes) {
      route.path = route.index ? '' : route.path;
      route.path = combinePath(basepath, route.path);
      route.pattern ||= new URLPattern({ pathname: `${route.path}{/}?` });
      if (route.children && route.children.length > 0) {
        route.children = this.setRoutes(route.children, route.path);
      }
    }
    return routes;
  }

  /**
   * 경로와 일치하는 라우트를 찾습니다.
   * URLPattern을 사용하여 경로를 비교하고 재귀적으로 자식 라우트도 검색합니다.
   */
  private getRoutes(pathname: string, routes: Route[] = this._routes): Route[] {
    for (const route of routes) {
      if (route.children) {
        const childRoutes = this.getRoutes(pathname, route.children);
        if (childRoutes.length > 0) {
          return [route, ...childRoutes];
        }
      }
      if (route.pattern?.test({ pathname: pathname })) {
        return [route];
      }
    }
    return [];
  }

  /**
   * 지정한 경로로 이동
   * - 클라이언트 사이드 라우팅을 수행합니다.
   * - 상대경로일 경우 basepath와 조합되어 이동합니다.
   * - 라우터에 포함되지 않은 경로로 이동할 경우 다른 방법으로 처리하세요.
   * @param href 이동할 경로
   */
  public async go(href: string) {
    // 요청 ID 생성
    const requestID = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
    this.requestID = requestID;

    // URL 분석
    const routeInfo = parseURL(href, this._basepath);
    if (routeInfo.href === this._routeInfo?.href) return;
    if(this.requestID !== requestID) return;
    this.dispatchProgress(0.1);

    // 일치하는 라우트 찾기
    const routes = this.getRoutes(routeInfo.pathname);
    const lastRoute = routes[routes.length - 1];
    if(this.requestID !== requestID) return;
    this.dispatchProgress(0.3);

    // 데이터 로딩 및 라우팅 정보 업데이트
    routeInfo.params = lastRoute?.pattern?.exec({ pathname: routeInfo.pathname })?.pathname.groups || {};
    if (typeof lastRoute?.loader === 'function') {
      routeInfo.data = await lastRoute.loader(routeInfo);
    }
    if(this.requestID !== requestID) return;
    this.dispatchProgress(0.5);
    this._routeInfo = routeInfo;
    
    // Outlet 렌더링(부모 route부터 u-outlet을 찾아서 렌더링합니다.)
    await this._rootElement.updateComplete;
    let outlet = this._rootElement.shadowRoot?.querySelector('u-outlet') as UOutlet;
    if (routes.length === 0) {
      if(this.requestID !== requestID) return;
      this.dispatchProgress(1);
      this._notfound ? outlet.renderElement(this._notfound) : outlet.clearDom();
    } else {
      for (const route of routes) {
        if(this.requestID !== requestID) return;
        this.dispatchProgress(0.5 + 0.5 * ((routes.indexOf(route) + 1) / routes.length));
        if(route.element) {
          const element = await outlet.renderElement(route.element) as UOutlet;
          outlet = element.shadowRoot?.querySelector('u-outlet') || outlet;
        } else if (route.component) {
          const component = await outlet.renderComponent(route.component);
          outlet = component.querySelector('u-outlet') || outlet;
        } else if (this._notfound) {
          await outlet.renderElement(this._notfound);
        } else {
          outlet.clearDom();
        }
      }
    }
    
    // 브라우저 히스토리 및 이벤트 발생
    if(this.requestID !== requestID) return;
    if (routeInfo.href !== window.location.href) {
      window.history.pushState({ basepath: routeInfo.basepath }, '', routeInfo.href);
    } else {
      window.history.replaceState({ basepath: routeInfo.basepath }, '', routeInfo.href);
    }
    document.title = lastRoute?.title || document.title;
    document.dispatchEvent(new CustomEvent('route-change', { detail: routeInfo }));
  }

  /**
   * 라우터 기본 경로로 이동
   */
  public async goBase() {
    await this.go(this._routeInfo?.basepath || this._basepath);
  }

  /**
   * 라우팅 진행률 Dispatch
   */
  private dispatchProgress(value: number) {
    document.dispatchEvent(new CustomEvent('route-progress', { detail: value })); 
  }

  /**
   * 브라우저 히스토리 이벤트가 발생했을 때 라우팅 처리
   */
  private onPopstate = async () => {
    const href = window.location.href;
    await this.go(href);
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
  //     this.go(anchor.pathname);
  //   }
  // };
  
}