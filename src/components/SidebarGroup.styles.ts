import { css } from 'lit';

export const styles = css`
  :host {
    /* SidebarLink 과 같은 원천 — 그룹 강조는 활성 링크와 같은 색 계열이어야 한다 */
    --group-accent: var(--app-sidebar-active-bg, var(--u-primary-color, #1E88E5));

    display: flex;
    flex-direction: column;
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
  }

  button {
    all: unset;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 12px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  button[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }
  button[selected] {
    /* 패널 위 텍스트라 강조색을 그대로 쓰면 대비가 부족하다(blue-600 = 3.68:1).
       활성 배경과 같은 파생식으로 한 단 어둡게 해 AA 를 넘긴다(4.85:1). */
    color: color-mix(in srgb, var(--group-accent) 85%, black);
  }
  button:hover {
    color: var(--u-txt-color-hover, #1E88E5);
    background-color: var(--u-bg-color-hover, #F5F5F5);
  }
  button:active {
    background-color: var(--u-bg-color-active, #EEEEEE);
  }
  button:focus-visible {
    outline: 2px solid var(--u-primary-color-weak, #2196F3);
    outline-offset: 2px;
  }

  .icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  .label {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .caret {
    color: inherit;
    font-size: 16px !important;
    transition: transform 0.2s ease;
  }
  .caret[collapsed] {
    transform: rotate(-90deg);
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
    margin-left: 32px;
    border-left: 2px solid var(--u-border-color-weak, #EEEEEE);
    padding-left: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .items[collapsed] {
    margin-top: 0;
    height: 0;
    opacity: 0;
  }
`;