import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    border-radius: 8px;
    color: var(--u-txt-color);
    text-decoration: none;
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
  
  u-link {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
  }
  u-link[compact] {
    justify-content: center;
    padding: 8px;
  }

  u-icon {
    color: inherit;
    font-size: 20px;
    flex-shrink: 0;
  }

  span {
    flex: 1;
    color: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;