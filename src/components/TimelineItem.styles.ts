import { css } from 'lit';

export const styles = css`
  :host {
    display: grid;
    grid-template-columns: var(--app-timeline-rail-width, 24px) minmax(0, 1fr);
    column-gap: var(--u-space-md, 12px);
  }

  /* The rail: a marker, then a line down to the next entry's marker. */
  .rail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .marker {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--app-timeline-marker-size, 12px);
    height: var(--app-timeline-marker-size, 12px);
    /* Centred on the heading's first line (label size × leading). */
    margin-top: calc((var(--u-text-label-size, 13px) * var(--u-text-label-leading, 1.5) - var(--app-timeline-marker-size, 12px)) / 2);
    border-radius: 50%;
    /* Fill and the colour on it come as a pair (the components contract — warning carries dark text,
       not white). The edge is the strong step: a yellow fill alone is about 1.4:1 against the page. */
    background-color: var(--_marker, var(--u-border-color-strong, #BDBDBD));
    color: var(--_on-marker, var(--u-txt-color, #212121));
    border: 1px solid var(--_edge, var(--u-border-color-strong, #BDBDBD));
  }
  .marker.with-icon {
    width: var(--app-timeline-rail-width, 24px);
    height: var(--app-timeline-rail-width, 24px);
    margin-top: calc((var(--u-text-label-size, 13px) * var(--u-text-label-leading, 1.5) - var(--app-timeline-rail-width, 24px)) / 2);
    font-size: var(--u-text-caption-size, 12px);
  }

  :host([color="primary"]) {
    --_marker: var(--u-primary-color, #1976D2);
    --_on-marker: var(--u-primary-txt-color, #FFFFFF);
    --_edge: var(--u-primary-color-strong, #1565C0);
  }
  :host([color="info"]) {
    --_marker: var(--u-info-color, #1976D2);
    --_on-marker: var(--u-info-txt-color, #FFFFFF);
    --_edge: var(--u-info-color-strong, #1565C0);
  }
  :host([color="success"]) {
    --_marker: var(--u-success-color, #2E7D32);
    --_on-marker: var(--u-success-txt-color, #FFFFFF);
    --_edge: var(--u-success-color-strong, #1B5E20);
  }
  :host([color="warning"]) {
    --_marker: var(--u-warning-color, #FDD835);
    --_on-marker: var(--u-warning-txt-color, #000000);
    --_edge: var(--u-warning-color-strong, #8A4A00);
  }
  :host([color="danger"]) {
    --_marker: var(--u-danger-color, #D32F2F);
    --_on-marker: var(--u-danger-txt-color, #FFFFFF);
    --_edge: var(--u-danger-color-strong, #C62828);
  }

  .line {
    flex: 1 1 auto;
    min-height: var(--u-space-md, 12px);
    margin-top: var(--u-space-2xs, 4px);
    /* The rail is what reads as a timeline — the weak border step (about 1.25:1 on a card) vanished. */
    border-left: 1px solid var(--u-border-color-strong, #BDBDBD);
  }
  /* The last entry has no next marker to reach. */
  :host(:last-child) .line {
    display: none;
  }

  .content {
    min-width: 0;
    padding-bottom: var(--u-space-lg, 16px);
  }
  :host(:last-child) .content {
    padding-bottom: 0;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: var(--u-space-sm, 8px);
  }

  .heading {
    font-size: var(--u-text-label-size, 13px);
    line-height: var(--u-text-label-leading, 1.5);
    font-weight: var(--u-text-label-weight, 600);
    color: var(--u-txt-color, #212121);
    overflow-wrap: anywhere;
  }

  .time {
    font-size: var(--u-text-caption-size, 12px);
    color: var(--u-txt-color-weak, #616161);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .body {
    margin-top: var(--u-space-2xs, 4px);
    font-size: var(--u-text-body-size, 14px);
    line-height: var(--u-text-body-leading, 1.6);
    color: var(--u-txt-color-weak, #616161);
    overflow-wrap: anywhere;
  }
  /* No body content — no gap under the header. */
  .body.empty {
    display: none;
  }
`;
