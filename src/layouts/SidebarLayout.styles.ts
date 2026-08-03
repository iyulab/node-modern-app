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

  .title {
    flex: 1;
    color: var(--u-txt-color, #212121);
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
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
    background: var(--app-sidebar-bg, var(--u-panel-bg-color, #FFFFFF));
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
    background: var(--app-header-bg, var(--u-panel-bg-color, #FFFFFF));
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

  /* Main Content */
  .main {
    position: relative;
    flex: 1;
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