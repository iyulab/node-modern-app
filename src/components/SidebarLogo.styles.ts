import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    min-width: 0;
    font-size: 32px;
    color: var(--u-text-color);
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  :host(:hover) {
    color: var(--u-text-color-hover);
  }
  :host(:active) {
    color: var(--u-text-color-active);
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    gap: 8px;
  }

  img {
    width: 100%;
    height: 1em;
    object-fit: contain;
    flex-shrink: 0;
  }

  u-icon {
    font-size: 1em;
    color: inherit;
    flex-shrink: 0;
  }

  span {
    font-size: 0.75em;
    font-weight: 600;
    line-height: inherit;
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;