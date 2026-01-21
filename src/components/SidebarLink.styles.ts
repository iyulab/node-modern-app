import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    color: var(--u-neutral-800);
    background-color: transparent;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  :host(:hover) {
    color: var(--u-txt-color-hover);
    background-color: var(--u-bg-color-hover);
  }
  :host([selected]) {
    color: var(--u-txt-color-inverse);
    background-color: var(--u-blue-600);
    box-shadow: 0 1px 3px var(--u-shadow-color-weak);
  }
  :host([selected]:hover) {
    color: var(--u-txt-color-inverse);
    background-color: var(--u-blue-700);
    box-shadow: 0 2px 6px var(--u-shadow-color-normal);
  }
  
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 8px 12px;
  }
  .container[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }

  u-icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  span {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;