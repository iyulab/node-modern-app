import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    margin: 8px 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 12px 4px;
  }

  .title {
    font-size: 12px;
    font-weight: 700;
    color: var(--u-soft-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
  
  .subtitle {
    font-size: 11px;
    color: var(--u-text-color-disabled);
    margin: 0;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;