import { Routes } from './Routes';

export class Router extends Routes {

  override hostConnected() {
    super.hostConnected();
    window.addEventListener('click', this.onClick);
    window.addEventListener('popstate', this.onPopState);
    // Kick off routed rendering by going to the current URL
    this.goto(window.location.pathname);
  }

  override hostDisconnected() {
    super.hostDisconnected();
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('popstate', this.onPopState);
  }

  /**
   * 브라우저 히스토리 이벤트가 발생했을 때 라우팅 처리
   */
  private onPopState = () => {
    this.goto(window.location.pathname);
  };

  /**
   * a 태그에 클릭 이벤트가 발생했을 때 라우팅 처리
   * - 현재 사용하지 않습니다!
   */
  private onClick = (e: MouseEvent) => {
    // 네비게이션 이벤트가 아닌 경우 리턴
    const isNonNavigationClick = e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey;
    if (e.defaultPrevented || isNonNavigationClick) return;

    // 클릭한 타겟이 a 태그가 아닌 경우 리턴
    const anchor = e.composedPath()
      .find((n) => (n as HTMLElement).tagName === 'A') as
      | HTMLAnchorElement | undefined;
    if ( anchor === undefined || anchor.target !== '' ||
      anchor.hasAttribute('download') || anchor.getAttribute('rel') === 'external'
    ) {
      return;
    }

    // a 태그의 href 속성이 비어있거나 mailto: 로 시작하는 경우 리턴
    const href = anchor.href;
    if (href === '' || href.startsWith('mailto:')) return;

    // a 태그의 origin 속성이 현재 origin과 다른 경우 리턴
    const origin = location.origin || location.protocol + '//' + location.host;
    if (anchor.origin !== origin) return;

    // a 태그의 href 속성이 현재 location.href와 다른 경우 라우팅
    e.preventDefault();
    if (href !== window.location.href) {
      window.history.pushState({}, '', href);
      this.goto(anchor.pathname);
    }
  };
  
}