import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    color: var(--u-txt-color);
    color: var(--u-neutral-800);
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  :host(:hover) {
    color: var(--u-txt-color-hover);
    background-color: var(--u-bg-color-hover);
  }
  :host(:active) {
    background-color: var(--u-bg-color-active);
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
    outline: 2px solid #6666ff;
    outline-offset: 2px;
  }
  
  u-icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  span {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;