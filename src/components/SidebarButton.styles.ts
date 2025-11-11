import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    color: var(--u-text-color);
    background: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  :host([comact]) {
    padding: 8px;
  }
  :host([compact]) button {
    width: 100%;
    justify-content: center;
    gap: 0;
  }
  :host(:hover) {
    color: var(--u-text-color-hover);
    background-color: var(--u-bg-color-hover);
  }
  :host(:active) {
    background-color: var(--u-bg-color-active);
  }

  button {
    width: 100%;
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }
  button:focus-visible {
    outline: 2px solid var(--u-input-border-focus);
    outline-offset: 2px;
  }
  
  u-icon {
    font-size: 20px;
    color: inherit;
    flex-shrink: 0;
  }

  span {
    flex: 1;
    font-weight: 500;
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;