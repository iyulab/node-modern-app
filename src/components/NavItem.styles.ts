import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .nav-item-container {
    width: 100%;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    user-select: none;
    position: relative;
  }

  .nav-item:hover {
    background-color: var(--nav-item-hover-bg, rgba(0, 0, 0, 0.05));
  }

  .nav-item.active {
    background-color: var(--nav-item-active-bg, #2563eb);
    color: var(--nav-item-active-color, white);
  }

  .nav-item__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .nav-item__label {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-item__arrow {
    font-size: 10px;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .nav-item__arrow.expanded {
    transform: rotate(90deg);
  }

  .nav-item__children {
    overflow: hidden;
    animation: slideDown 0.2s ease;
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

  .nav-divider {
    height: 1px;
    background-color: var(--nav-divider-color, rgba(0, 0, 0, 0.1));
    margin: 8px 16px;
  }

  :host([collapsed]) .nav-item {
    justify-content: center;
    padding: 10px;
  }
`;
