import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: var(--u-blue-400, #3b82f6);
    transform: scaleX(0);
    transform-origin: left;
    transition: scale 0.3s ease;
  }
  :host([indeterminate]) {
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