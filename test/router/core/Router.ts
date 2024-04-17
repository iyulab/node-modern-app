import { Route } from '../models/Route';

export class Router {
  private root?: HTMLElement;
  private routes: Route[] = [];
  private _currentRoute?: Route;
  private _currentPathname?: string;
  private _currentParams?: URLSearchParams;
  private fallback?: Route;

  public setRoutes(routes: Route[], root: HTMLElement) {
    this.root = root;
    this.routes = [...this.routes, ...routes];
    window.removeEventListener('popstate', this.onPopState);
    window.addEventListener('popstate', this.onPopState);
    this.onPopState();
  }

  public get currentPathname() {
    return this._currentPathname;
  }

  public get currentParams() {
    return this._currentParams;
  }

  public get currentRoute() {
    return this._currentRoute;
  }

  /**
   * 라우팅 처리
   */
  public go(pathname: string) {
    if (pathname === this.currentPathname) return;
    if (!this.root) {
      throw new Error('Router root element is not set');
    }
    // 절대 경로
    if (pathname.startsWith('/')) {
      pathname = pathname.slice(1);
    } else {
      // 상대 경로
      pathname = this.currentPathname + '/' + pathname;
    }

  }

  /**
   * 브라우저 히스토리 이벤트가 발생했을 때 라우팅 처리
   */
  private onPopState = () => {
    const path = window.location.pathname;
    this.go(path);
  };

  /**
   * a 태그에서 클릭 이벤트가 발생했을 때 라우팅 처리
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
  
}