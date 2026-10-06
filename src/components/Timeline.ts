import { html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

import '@iyulab/components/dist/components/icon/UIcon.js';
import { formatDate } from '@iyulab/components/dist/utilities/format.js';
import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import { styles, itemStyles } from './Timeline.styles.js';

type TimelineParts = 'host';
type TimelineItemParts = 'host' | 'rail' | 'marker' | 'line' | 'content' | 'header' | 'heading' | 'time' | 'body';

/** The role colours `u-tag`/`u-badge` use — the marker's colour. */
export type TimelineItemColor = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

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
    return html`<slot></slot>`;
  }
}

/**
 * One entry of a {@link Timeline}.
 *
 * - `heading` names the event ("Shipped"); the `heading` slot takes richer content.
 * - `datetime` is an ISO date or date-time. It is rendered as `<time datetime>` and formatted for the
 *   active locale (`Locale`) — a date alone as a date, a date-time with its time. The `time` slot
 *   replaces the text (a relative "2 hours ago", say); `datetime` still annotates it.
 * - `color` tints the marker. ⚠Colour is never the only carrier — say the status in `heading` too
 *   (WCAG 1.4.1). `icon` (and `lib`) draws inside the marker.
 */
@customElement('u-timeline-item')
export class TimelineItem extends StyledElement<TimelineItemParts> {
  static styles = [super.styles, itemStyles];

  /** What happened. */
  @property({ type: String }) heading = '';
  /** When — ISO `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]`. */
  @property({ type: String }) datetime = '';
  /** Marker colour. Default `neutral`. */
  @property({ type: String, reflect: true }) color: TimelineItemColor = 'neutral';
  /** Icon drawn inside the marker. */
  @property({ type: String }) icon?: string;
  /** Icon library for `icon`. */
  @property({ type: String }) lib?: string;

  /** Body slot assignment — CSS `:has()` cannot see slotted content (`internals/slotted.ts`). */
  @state() private hasBody = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem');
  }

  /** Locale text for `datetime` — the raw value when it is not a date the formatter can read. */
  private get timeText(): string {
    const value = this.datetime.trim();
    if (!value) return '';
    // A date alone is a calendar day (`formatDate` reads `YYYY-MM-DD` as local, never shifted by a
    // time zone). A date-time goes through `Date`, which reads an offset-less ISO time as local.
    if (!value.includes('T')) return formatDate(value, { dateStyle: 'medium' });
    const at = new Date(value);
    return Number.isNaN(at.getTime()) ? value : formatDate(at, { dateStyle: 'medium', timeStyle: 'short' });
  }

  render() {
    return html`
      <div class="rail" part="rail" aria-hidden="true">
        <span class="marker ${this.icon ? 'with-icon' : ''}" part="marker">
          ${this.icon ? html`<u-icon .lib=${this.lib} .name=${this.icon}></u-icon>` : nothing}
        </span>
        <span class="line" part="line"></span>
      </div>
      <div class="content" part="content">
        <div class="header" part="header">
          <span class="heading" part="heading"><slot name="heading">${this.heading}</slot></span>
          ${this.datetime
            ? html`<time class="time" part="time" datetime=${this.datetime}><slot name="time">${this.timeText}</slot></time>`
            : html`<span class="time" part="time"><slot name="time"></slot></span>`}
        </div>
        <div class="body ${this.hasBody ? '' : 'empty'}" part="body">
          <slot @slotchange=${(e: Event) => (this.hasBody = slotHasContent(e.target as HTMLSlotElement))}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-timeline': Timeline;
    'u-timeline-item': TimelineItem;
  }
}
