import type { LitElement } from "lit";
import type { Route } from "./model";

export class Routes {
  private readonly rootElement: LitElement;
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
    this.rootElement = config.rootElement;    
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
    await this.rootElement.updateComplete;
    const outlet = this.rootElement.shadowRoot?.querySelector('u-outlet') as UOutlet;
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

  
}