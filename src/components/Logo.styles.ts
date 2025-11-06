import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .logo-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--logo-text-color, #1f2937);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([collapsed]) .logo-text {
    display: none;
  }
`;
