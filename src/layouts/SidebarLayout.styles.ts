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
    color: var(--u-txt-color);
    font-size: 24px;
    cursor: pointer;
  }
  .logo:hover {
    color: var(--u-txt-color-hover);
  }

  .title {
    flex: 1;
    color: var(--u-txt-color);
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toggler {
    color: inherit;
    font-size: 20px;
    padding: 0px;
    border: none;
    background: transparent;
  }
  .toggler:hover {
    color: var(--u-txt-color-hover);
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
    background: var(--u-panel-bg-color);
    border-right: 1px solid var(--u-border-color);
    transition: all 0.3s ease;
  }
  /* Sidebar states */
  .sidebar[state="default"] {
    width: 260px;
  }
  .sidebar[state="slim"] {
    width: 64px;
  }
  .sidebar[state="slim"] .sidebar-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  .sidebar[state="modal"] {
    width: 260px;
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
    background: var(--u-panel-bg-color);
    border-bottom: 1px solid var(--u-border-color-weak);
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
    border-bottom: 1px solid var(--u-border-color-weak);
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
    border-top: 1px solid var(--u-border-color-weak);
  }
  .sidebar-footer:empty {
    display: none;
  }

  /* Main Content */
  .main {
    position: relative;
    flex: 1;
    background: var(--u-bg-color);
    overflow: auto;
    outline: none;
  }

  .main u-progress-bar {
    --progress-bar-height: 4px;
    --progres-bar-track-color: transparent;
    
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
  .main u-progress-bar[error] {
    --progress-bar-color: var(--u-red-500);
  }

  /* Backdrop for modal mode */
  .backdrop {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--u-overlay-bg-color);
  }
`;