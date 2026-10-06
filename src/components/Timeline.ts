import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
// A list is nothing without its entries — importing the list registers the entry element too.
import './TimelineItem.js';
import { styles } from './Timeline.styles.js';

type TimelineParts = 'host' | 'list';

/**
 * A status or activity history — "what happened, and when" on a detail screen (order, ticket,
 * approval). An ordered list of {@link TimelineItem}s, each a marker on a rail, a heading, a time
 * and an optional body.
 *
 * ```html
 * <u-timeline>
 *   <u-timeline-item heading="Paid" datetime="2026-10-06T09:30" color="success" icon="check">
 *     Bank transfer received.
 *   </u-timeline-item>
 *   <u-timeline-item heading="Ordered" datetime="2026-10-05T14:02"></u-timeline-item>
 * </u-timeline>
 * ```
 *
 * The items are shown in DOM order — put the newest first or last as your screen reads. The host is
 * a list and each item a list item, so assistive technology announces how many entries there are.
 */
@customElement('u-timeline')
export class Timeline extends StyledElement<TimelineParts> {
  static styles = [super.styles, styles];

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'list');
  }

  render() {
    return html`<div class="list" part="list"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-timeline': Timeline;
  }
}
