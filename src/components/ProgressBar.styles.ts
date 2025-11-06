import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    background-color: var(--progress-bar-bg, #e5e7eb);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar__fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  .progress-bar__fill.indeterminate {
    animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;