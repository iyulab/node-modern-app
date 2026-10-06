import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/Timeline.js';
import type { TimelineItem } from '../../src/components/Timeline.js';

/**
 * `u-timeline` layout — what happy-dom cannot answer: the marker sits on the heading's first line, the
 * line runs from one marker down to the next, the last entry has none, and a coloured marker is drawn
 * with its fill, the colour on it, and a strong edge (a yellow fill alone barely shows on the page).
 */
const hosts: HTMLElement[] = [];
afterEach(() => { for (const h of hosts.splice(0)) h.remove(); });

async function mount(markup: string) {
  const host = document.createElement('div');
  host.style.cssText = 'width:480px;padding:16px;';
  host.innerHTML = markup;
  document.body.append(host);
  hosts.push(host);
  const items = [...host.querySelectorAll('u-timeline-item')] as TimelineItem[];
  await Promise.all(items.map((i) => i.updateComplete));
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return items;
}
const part = (i: TimelineItem, name: string) => i.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement;

describe('u-timeline layout', () => {
  it('the marker is centred on the heading\'s first line; the line reaches the next marker; the last entry has no line', async () => {
    const items = await mount(`
      <u-timeline>
        <u-timeline-item heading="Paid" datetime="2026-10-06T09:30" color="success">Bank transfer received. A longer note that wraps onto a second line inside a narrow column to make the entry taller than its heading.</u-timeline-item>
        <u-timeline-item heading="Ordered" datetime="2026-10-05"></u-timeline-item>
      </u-timeline>`);
    const marker = part(items[0], 'marker').getBoundingClientRect();
    const heading = part(items[0], 'heading').getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(part(items[0], 'heading')).lineHeight);
    const firstLineCentre = heading.top + lineHeight / 2;
    expect(Math.abs(marker.top + marker.height / 2 - firstLineCentre), 'marker centre vs first line centre').toBeLessThanOrEqual(1);

    const line = part(items[0], 'line').getBoundingClientRect();
    const nextMarker = part(items[1], 'marker').getBoundingClientRect();
    expect(line.height, 'the line has length').toBeGreaterThan(0);
    expect(Math.abs(line.bottom - nextMarker.top), 'the line ends where the next marker begins').toBeLessThanOrEqual(lineHeight);
    expect(Math.abs((line.left + line.right) / 2 - (marker.left + marker.right) / 2), 'line and marker share a centre').toBeLessThanOrEqual(1);

    expect(getComputedStyle(part(items[1], 'line')).display).toBe('none');
  });

  it('a coloured marker uses the role pair and a strong edge', async () => {
    const [item] = await mount('<u-timeline><u-timeline-item heading="Due soon" color="warning" icon="clock"></u-timeline-item></u-timeline>');
    const style = getComputedStyle(part(item, 'marker'));
    const sheet = getComputedStyle(document.documentElement);
    const resolve = (name: string) => {
      const probe = document.createElement('span');
      probe.style.color = `var(${name})`;
      document.body.append(probe);
      const c = getComputedStyle(probe).color;
      probe.remove();
      return c;
    };
    expect(sheet.getPropertyValue('--u-warning-color').trim(), 'token sheet loaded').not.toBe('');
    expect(style.backgroundColor).toBe(resolve('--u-warning-color'));
    expect(style.color).toBe(resolve('--u-warning-txt-color'));
    expect(style.borderTopColor).toBe(resolve('--u-warning-color-strong'));
    // With an icon the marker grows to the rail width.
    expect(part(item, 'marker').getBoundingClientRect().width).toBeGreaterThan(20);
  });
});
