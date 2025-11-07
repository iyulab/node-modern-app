import { css } from "lit";

export const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    width: 260px;
    height: 100vh;
    background: var(--u-neutral-50, #fafafa);
    border-right: 1px solid var(--u-neutral-200, #e5e7eb);
    transition: all 0.3s ease;
    overflow: hidden;
  }
  .sidebar[collapsed] {
    width: 64px;
  }
  .sidebar[hidden] {
    display: flex;
    transform: translateX(-100%);
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px;
  }

  /* Sidebar Nav */
  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }
  .sidebar-footer u-button {
    width: 100%;
    font-size: 24px;
    padding: 8px;
    border: none;
  }

  /* Main Content */
  .main {
    position: relative;
    flex: 1;
    display: block;
    overflow: auto;
  }

  .main u-icon-button {
    position: absolute;
    z-index: 200;
    top: 0px;
    left: 0px;
    border: none;
    background: transparent;
    font-size: 24px;
  }
`;