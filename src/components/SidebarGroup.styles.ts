import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    color: var(--u-neutral-800, #424242);
  }

  button {
    all: unset;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 12px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  button[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }
  button[selected] {
    color: var(--u-blue-700, #1976D2);
  }
  button:hover {
    color: var(--u-txt-color-hover, #1E88E5);
    background-color: var(--u-bg-color-hover, #F5F5F5);
  }
  button:active {
    background-color: var(--u-bg-color-active, #EEEEEE);
  }
  button:focus-visible {
    outline: 2px solid #6666ff;
    outline-offset: 2px;
  }

  .icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  .label {
    flex: 1;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .caret {
    color: inherit;
    font-size: 16px !important;
    transition: transform 0.2s ease;
  }
  .caret[collapsed] {
    transform: rotate(-90deg);
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
    margin-left: 32px;
    border-left: 2px solid var(--u-border-color-weak, #EEEEEE);
    padding-left: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  .items[collapsed] {
    margin-top: 0;
    height: 0;
    opacity: 0;
  }
`;