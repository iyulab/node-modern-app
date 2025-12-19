import { css } from "lit";

export const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* Sidebar Container */
  .sidebar {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    width: 260px;
    height: 100vh;
    background: var(--u-panel-bg-color);
    border-right: 1px solid var(--u-border-color);
    box-shadow: 0 2px 8px var(--u-shadow-color-weak);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  /* Sidebar states */
  .sidebar[state="slim"] {
    width: 64px;
  }
  .sidebar[state="slim"] .sidebar-header {
    flex-direction: column;
  }
  .sidebar[state="closed"] {
    position: fixed;
    top: 0;
    left: -260px;
    bottom: 0;
    width: 260px;
  }
  .sidebar[state="closed"] .sidebar-toggler {
    position: absolute;
    z-index: 1000;
    top: 16px;
    left: calc(100% - 16px);
    background-color: var(--u-panel-bg-color);
    border: 1px solid var(--u-border-color-strong);
    border-radius: 4px 8px 8px 4px;
  }
  .sidebar[state="closed"] .sidebar-toggler:hover {
    transform: translateX(24px);
  }
  .sidebar[state="modal"] {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
  }

  /* Sidebar Toggler Button */
  .sidebar-toggler {
    font-size: 20px;
    border: none;
    background: transparent;
    cursor: col-resize;
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 16px 12px;
    border-bottom: 1px solid var(--u-border-color-weak);
  }

  /* Sidebar Menu */
  .sidebar-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: thin;
    scrollbar-color: var(--u-scrollbar-color) var(--u-scrollbar-track-color);
  }

  /* Sidebar Footer */
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border-top: 1px solid var(--u-border-color-weak);
  }

  /* Main Content */
  .main {
    position: relative;
    flex: 1;
    display: block;
    overflow: hidden;
    background: var(--u-bg-color);
  }

  .main u-progress-bar {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    height: 4px;
    border-radius: 0;
    background-color: transparent;
  }

  /* Backdrop for modal mode */
  .backdrop {
    content: '';
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--u-overlay-bg-color);
  }
`;