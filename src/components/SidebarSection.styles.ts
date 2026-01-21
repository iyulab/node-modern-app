import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 8px 12px 4px;
  }

  .title {
    color: var(--u-neutral-700);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .subtitle {
    color: var(--u-neutral-600);
    font-size: 11px;
    font-weight: 300;
  }

  .items {
    display: flex;
    flex-direction: column;
  }
`;