import { css } from "lit";

export const styles = css`
  :host {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    --sidebar-width: 260px;
    --sidebar-collapsed-width: 64px;
    --header-height: 56px;
  }

  /* Small 화면에서는 상단 헤더 표시 */
  .mobile-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    background: var(--sl-color-neutral-0, #fff);
    border-bottom: 1px solid var(--sl-color-neutral-200, #e5e7eb);
    z-index: 1000;
    align-items: center;
    padding: 0 16px;
    gap: 12px;
  }

  .mobile-header.show {
    display: flex;
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 6px;
    padding: 0;
    transition: background-color 0.2s;
  }

  .menu-toggle:hover {
    background: var(--sl-color-neutral-100, #f3f4f6);
  }

  .menu-toggle svg {
    width: 24px;
    height: 24px;
  }

  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--sl-color-neutral-0, #fff);
    border-right: 1px solid var(--sl-color-neutral-200, #e5e7eb);
    transition: all 0.3s ease;
    position: relative;
    z-index: 100;
  }

  .sidebar.collapsed {
    width: var(--sidebar-collapsed-width);
  }

  .sidebar.hidden {
    transform: translateX(-100%);
  }

  /* Small 화면: overlay 사이드바 */
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: var(--header-height);
      left: 0;
      height: calc(100vh - var(--header-height));
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    }
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--sl-color-neutral-200, #e5e7eb);
    min-height: 64px;
  }

  .sidebar-title {
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sidebar.collapsed .sidebar-title {
    display: none;
  }

  .collapse-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    padding: 0;
    transition: background-color 0.2s;
  }

  .collapse-toggle:hover {
    background: var(--sl-color-neutral-100, #f3f4f6);
  }

  .collapse-toggle svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s;
  }

  .sidebar.collapsed .collapse-toggle svg {
    transform: rotate(180deg);
  }

  /* Small 화면에서는 collapse 버튼 숨김 */
  @media (max-width: 768px) {
    .collapse-toggle {
      display: none;
    }
  }

  /* Sidebar Nav */
  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px;
  }

  .nav-section-label {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--sl-color-neutral-500, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sidebar.collapsed .nav-section-label {
    display: none;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    border-top: 1px solid var(--sl-color-neutral-200, #e5e7eb);
    padding: 8px;
  }

  .footer-button {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 6px;
    text-align: left;
    transition: background-color 0.2s;
    font-size: 14px;
  }

  .footer-button:hover {
    background: var(--sl-color-neutral-100, #f3f4f6);
  }

  .footer-button__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .footer-button__label {
    flex: 1;
  }

  .sidebar.collapsed .footer-button__label {
    display: none;
  }

  .sidebar.collapsed .footer-button {
    justify-content: center;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .main-content {
      margin-top: var(--header-height);
    }
  }

  /* Progress Bar */
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }

  @media (max-width: 768px) {
    .progress-container {
      top: var(--header-height);
    }
  }

  /* Outlet */
  u-outlet {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  /* Dark theme */
  :host(.sl-theme-dark) .mobile-header,
  :host(.sl-theme-dark) .sidebar {
    background: var(--sl-color-neutral-900, #111827);
    border-color: var(--sl-color-neutral-800, #1f2937);
  }

  :host(.sl-theme-dark) .menu-toggle:hover,
  :host(.sl-theme-dark) .collapse-toggle:hover,
  :host(.sl-theme-dark) .footer-button:hover {
    background: var(--sl-color-neutral-800, #1f2937);
  }
`;