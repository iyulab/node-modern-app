import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  :host(:hover) {
    color: var(--u-txt-color-hover, #1565C0);
    background-color: var(--u-bg-color-hover, #F5F5F5);
  }
  :host(:active) {
    background-color: var(--u-bg-color-active, #EEEEEE);
  }

  button {
    all: unset;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 8px 12px;
  }
  button[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }
  button:focus-visible {
    outline: 2px solid var(--u-primary-color-weak, #2196F3);
    outline-offset: 2px;
  }
  
  u-icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  /* ★SidebarLink 와 같은 자리·같은 단(label). 두 곳이 어긋나면 목록이 계단이 된다. */
  span {
    flex: 1;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
    line-height: var(--u-text-label-leading, 1.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;