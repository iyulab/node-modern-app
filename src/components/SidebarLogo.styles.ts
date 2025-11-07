import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 2px;
    font-size: 32px;
    color: var(--u-neutral-700, #333);
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
  }
  :host(:hover) {
    background-color: var(--u-neutral-200, #f5f5f5);
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    gap: 8px;
  }

  u-icon {
    font-size: 1em;
    color: inherit;
  }

  span {
    font-weight: 600;
    font-size: 0.75em;
    line-height: inherit;
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;