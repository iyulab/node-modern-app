import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }
  :host([compact]) button {
    justify-content: center;
    padding: 8px;
  }
  :host([compact]) .label {
    display: none;
  }
  :host([compact]) .toggler {
    display: none;
  }
  :host([compact]) .items {
    display: none;
  }
  :host(:not([compact])[collapsed]) .toggler {
    transform: rotate(-90deg);
  }
  :host(:not([compact])[collapsed]) .items {
    height: 0;
    margin-top: 0;
    opacity: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  button {
    all: unset;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px 12px;
    color: var(--u-text-color);
    font-family: inherit;
    background: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  button:hover {
    background-color: var(--u-bg-color-hover);
    color: var(--u-text-color-hover);
  }

  .icon {
    font-size: 20px;
    color: inherit;
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    color: inherit;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .toggler {
    font-size: 16px !important;
    transition: transform 0.2s ease;
  }

  .items {
    display: flex;
    flex-direction: column;
    margin-left: 32px;
    margin-top: 4px;
    gap: 4px;
    overflow: hidden;
    transition: all 0.3s ease;
    border-left: 2px solid var(--u-border-color-weak);
    padding-left: 8px;
  }
`;