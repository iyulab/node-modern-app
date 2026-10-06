// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';
import '../src/components/Timeline.js';
import type { TimelineItem } from '../src/components/Timeline.js';

const mounted: HTMLElement[] = [];
afterEach(() => {
  for (const el of mounted.splice(0)) el.remove();
  Locale.set('en');
});

async function mount(html: string) {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  mounted.push(host);
  const items = [...host.querySelectorAll('u-timeline-item')] as TimelineItem[];
  await Promise.all(items.map((i) => i.updateComplete));
  return { list: host.querySelector('u-timeline')!, items };
}

describe('u-timeline', () => {
  it('is a list of list items — assistive technology announces the count', async () => {
    const { list, items } = await mount('<u-timeline><u-timeline-item heading="A"></u-timeline-item><u-timeline-item heading="B"></u-timeline-item></u-timeline>');
    expect(list.getAttribute('role')).toBe('list');
    expect(items.map((i) => i.getAttribute('role'))).toEqual(['listitem', 'listitem']);
  });

  it('a role the author set is kept', async () => {
    const { list } = await mount('<u-timeline role="feed"></u-timeline>');
    expect(list.getAttribute('role')).toBe('feed');
  });

  it('datetime renders as <time datetime> in the active locale — a date alone is that calendar day', async () => {
    Locale.set('en');
    const { items } = await mount('<u-timeline><u-timeline-item heading="Ordered" datetime="2026-10-05"></u-timeline-item></u-timeline>');
    const time = items[0].shadowRoot!.querySelector('time')!;
    expect(time.getAttribute('datetime')).toBe('2026-10-05');
    expect(time.textContent!.trim()).toBe(new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(2026, 9, 5)));
  });

  it('a date-time shows its time; an unreadable value is shown as written', async () => {
    Locale.set('en');
    const { items } = await mount(
      '<u-timeline><u-timeline-item datetime="2026-10-06T09:30"></u-timeline-item><u-timeline-item datetime="yesterday"></u-timeline-item></u-timeline>',
    );
    const text = (i: TimelineItem) => i.shadowRoot!.querySelector('time')!.textContent!.trim();
    expect(text(items[0])).toBe(new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(2026, 9, 6, 9, 30)));
    expect(text(items[1])).toBe('yesterday');
  });

  it('without datetime there is no <time> element', async () => {
    const { items } = await mount('<u-timeline><u-timeline-item heading="Note"></u-timeline-item></u-timeline>');
    expect(items[0].shadowRoot!.querySelector('time')).toBeNull();
  });

  it('color reflects (the stylesheet keys on it) and the marker is hidden from assistive technology', async () => {
    const { items } = await mount('<u-timeline><u-timeline-item heading="Paid" color="success"></u-timeline-item></u-timeline>');
    expect(items[0].getAttribute('color')).toBe('success');
    expect(items[0].shadowRoot!.querySelector('[part="rail"]')!.getAttribute('aria-hidden')).toBe('true');
  });
});
