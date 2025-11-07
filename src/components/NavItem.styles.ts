import { css } from 'lit';

export const styles = css`
  :host {
    position: relative;
    display: block;
    
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    user-select: none;
    cursor: pointer;
  }
  :host(:hover) {
    background-color: var(--nav-item-hover-bg, rgba(0, 0, 0, 0.05));
  }
  :host([selected]) {
    background-color: var(--u-blue-600, #2563eb);
    color: var(--u-neutral-0, #ffffff);
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .icon {
    font-size: 24px;
    color: inherit;
  }

  .label {
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .arrow {
    font-size: 16px;
    color: inherit;
    transition: transform 0.2s ease;
  }
  .arrow[expanded] {
    transform: rotate(180deg);
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
