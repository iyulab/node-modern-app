import { css } from "lit";

export const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    font-family: var(--u-font-base);
    overflow: hidden;
  }
  :host([state="mobile"]),
  :host([state="mobile-open"]) {
    flex-direction: column;
  }

  .logo {
    color: var(--u-txt-color, #212121);
    font-size: 24px;
    cursor: pointer;
  }
  .logo:hover {
    color: var(--u-txt-color-hover, #1565C0);
  }
  img.logo {
    height: 24px;
    width: auto;
    object-fit: contain;
  }

  /*
   * ★단 배정은 «관측값 근사»가 아니라 «용도»로 한다(DL-157-4) — 이 자리는 앱의 제목이다.
   *   종전 18px 은 스케일에 없는 값이었고, 같은 판정을 이미 u-dialog·u-drawer 제목에
   *   내린 적이 있다(L2-3, 18px → subtitle).
   * ⚠줄 박스는 바뀌지 않는다: 16 x 1.5 = 24px = 종전 line-height. 헤더 높이 불변.
   */
  .title {
    flex: 1;
    color: var(--u-txt-color, #212121);
    font-size: var(--u-text-subtitle-size, 16px);
    line-height: var(--u-text-subtitle-leading, 1.5);
    font-weight: var(--u-text-subtitle-weight, 600);
    letter-spacing: var(--u-text-subtitle-tracking, 0);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * 토글러의 "테두리·배경 없음"은 마크업의 variant="ghost" 가 낸다.
   *
   * ★여기에 border/background 를 적는 것으로는 부족했다 — 이 규칙은 <u-button> **호스트**에만
   *   닿고, 테두리를 실제로 그리는 것은 그 섀도 루트 안의 <button> 이다(solid 기본값이
   *   --btn-border-color: var(--btn-color) 로 그린다). 호스트만 재면 0px 이라 보이지도 않았다.
   *   variant 를 명시해 컴포넌트가 스스로 투명하게 그리도록 한다.
   *
   * color: inherit 는 유지한다 — 헤더 색을 따라가게 하려는 의도이고 ghost 의 기본 전경
   * (--u-txt-color)보다 이 레이아웃의 뜻이 앞선다.
   */
  .toggler {
    color: inherit;
    font-size: 20px;
    padding: 0px;
  }
  .toggler:hover {
    color: var(--u-txt-color-hover, #1565C0);
  }

  /* Sidebar Container */
  .sidebar {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
    /* --u-panel-bg-color 가 아니라 --u-bg-color-raised — 사이드바는 카드·메뉴류의
       "떠 있는 패널"이 아니라 상시 크롬이고, 그 구분이 정확히 두 토큰이 갈리는 지점이다
       (light.css 293~298행 참조). 미설정 시 페이지(--u-bg-color)와 같은 흰색으로 앉아
       사이드바·페이지·카드 삼중 무구분을 만들던 종전 폴백을 대체한다. */
    background: var(--app-sidebar-bg, var(--u-bg-color-raised, #FAFAFA));
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
    border-right: 1px solid var(--u-border-color, #E0E0E0);
    transition: all 0.3s ease;
  }
  /* Sidebar states */
  .sidebar[state="default"] {
    width: var(--app-sidebar-width, 260px);
  }
  .sidebar[state="slim"] {
    width: var(--app-sidebar-width-slim, 64px);
  }
  .sidebar[state="slim"] .sidebar-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  .sidebar[state="modal"] {
    width: var(--app-sidebar-width, 260px);
    position: absolute;
    top: 0;
    left: 0;
  }
  .sidebar[state="mobile"] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
  }
  .sidebar[state="mobile-open"] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(0);
  }

  /* Mobile Header */
  .mobile-header {
    position: relative;
    z-index: 1001;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    background: var(--app-header-bg, var(--u-bg-color-raised, #FAFAFA));
    color: var(--app-header-fg, var(--u-txt-color, #212121));
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
    user-select: none;
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
    user-select: none;
  }

  /* Sidebar Main Menu */
  .sidebar-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border-top: 1px solid var(--u-border-color-weak, #EEEEEE);
  }
  .sidebar-footer:empty {
    display: none;
  }

  /* Main Content
   * ★기본 패딩을 준다 — 라우트 콘텐츠가 뷰포트/사이드바 경계에 그대로 맞닿아 모든
   *   소비자가 같은 배선을 재구현하던 문제였다. 값은 이 라이브러리의 spacing 스케일
   *   상단 근처(3xl)에서 골랐다 — LOB 화면의 표준 여백으로 쓰기에 과하지 않은 최대값.
   * ⚠«패딩 박스» 기준 절대배치는 이 padding 의 영향을 받지 않는다 — 바로 아래
   *   u-progress-bar 가 top/left/right:0 으로 여전히 테두리에 꽉 차게 붙는 이유다
   *   (CSS 2.1 §10.6.4: 절대배치 자손의 containing block 은 가장 가까운 positioned
   *   조상의 «패딩 박스»이고, 그 경계는 조상 자신의 padding 값에 밀리지 않는다).
   *   풀블리드를 원하는 소비자는 layout.styles.main = { padding: '0' } 로 되돌린다. */
  .main {
    position: relative;
    flex: 1;
    padding: var(--u-space-3xl, 32px);
    background: var(--u-bg-color, #FFFFFF);
    overflow: auto;
    outline: none;
  }

  .main u-progress-bar {
    --progress-bar-height: 4px;
    --progress-bar-track-color: transparent;
    
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  .main u-progress-bar[visible] {
    opacity: 1;
    transform: translateY(0);
  }

  /* Backdrop for modal mode */
  .backdrop {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--u-overlay-bg-color, rgba(0, 0, 0, 0.5));
  }
`;