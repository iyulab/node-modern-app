import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/MasterDetailLayout.js';
import type { MasterDetailLayout } from '../../src/components/MasterDetailLayout.js';

/**
 * The detail pane stays where it can be seen.
 *
 * A long list usually lets its page scroll: the layout sits in a container with no height of its
 * own, so `:host` grows to the list's height. The detail pane used to stretch to that height with its
 * content at the top — pick a row far down and the detail was above the scrolled-away edge. In overlay
 * mode the covering pane was `inset: 0` over that whole height, with the same result.
 *
 * Measured against the scroll container the pane sticks to; a source read cannot tell where it ends up.
 */

let scroller: HTMLDivElement;

beforeEach(() => {
  scroller = document.createElement('div');
  scroller.style.cssText = 'height: 500px; overflow: auto;';
  document.body.appendChild(scroller);
});
afterEach(() => scroller.remove());

const frames = async (n = 3) => {
  for (let i = 0; i < n; i++) await new Promise(r => requestAnimationFrame(() => r(null)));
  await new Promise(r => setTimeout(r, 60));
};

const detailOf = (el: Element) => el.shadowRoot!.querySelector<HTMLElement>('[part="detail"]')!;

function mount({ width, height, detailHeight = 200 }: { width: number; height?: number; detailHeight?: number }) {
  scroller.style.width = `${width}px`;
  scroller.innerHTML = `
    <div style="${height ? `height: ${height}px` : ''}">
      <u-master-detail-layout detail-size="300px">
        <div style="height: 1500px">list</div>
        <div slot="detail" style="height: ${detailHeight}px">record</div>
      </u-master-detail-layout>
    </div>`;
  return scroller.querySelector('u-master-detail-layout') as MasterDetailLayout;
}

describe('u-master-detail-layout — container without a height (the page scrolls)', () => {
  it('keeps the side-by-side detail at the top of the visible area after scrolling the list', async () => {
    const el = mount({ width: 1000 });
    await frames();
    expect(el.hasAttribute('overlay')).toBe(false);
    scroller.scrollTop = 450;
    await frames();
    const top = detailOf(el).getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    expect(Math.round(top)).toBe(0);
  });

  it('caps a tall detail at the visible height so its end can be scrolled to', async () => {
    const el = mount({ width: 1000, detailHeight: 2000 });
    await frames();
    const pane = detailOf(el);
    expect(Math.round(pane.getBoundingClientRect().height)).toBe(scroller.clientHeight);
    expect(pane.scrollHeight).toBeGreaterThan(pane.clientHeight);
  });

  it('honours a top offset set through ::part(detail) — the cap leaves room for it', async () => {
    const style = document.createElement('style');
    style.textContent = 'u-master-detail-layout::part(detail) { top: 40px; }';
    document.head.appendChild(style);
    try {
      const el = mount({ width: 1000, detailHeight: 2000 });
      await frames();
      scroller.scrollTop = 450;
      await frames();
      const rect = detailOf(el).getBoundingClientRect();
      const box = scroller.getBoundingClientRect();
      expect(Math.round(rect.top - box.top)).toBe(40);
      expect(Math.round(rect.bottom)).toBeLessThanOrEqual(Math.round(box.top + scroller.clientHeight));
    } finally {
      style.remove();
    }
  });

  it('puts the overlay pane over the visible part of the list, not at the top of the whole list', async () => {
    const el = mount({ width: 500 });
    await frames();
    expect(el.hasAttribute('overlay')).toBe(true);
    scroller.scrollTop = 450;
    await frames();
    const rect = detailOf(el).getBoundingClientRect();
    const box = scroller.getBoundingClientRect();
    const host = el.getBoundingClientRect();
    expect(Math.round(rect.top - box.top)).toBe(0);
    expect(Math.round(rect.height)).toBe(scroller.clientHeight);
    expect(Math.round(rect.left)).toBe(Math.round(host.left));
    expect(Math.round(rect.width)).toBe(Math.round(host.width));
  });
});

describe('u-master-detail-layout — right-to-left', () => {
  it('covers the list in overlay mode in a right-to-left document too', async () => {
    scroller.dir = 'rtl';
    const el = mount({ width: 500, height: 400 });
    await frames();
    expect(el.hasAttribute('overlay')).toBe(true);
    const rect = detailOf(el).getBoundingClientRect();
    const host = el.getBoundingClientRect();
    expect([rect.left, rect.width].map(Math.round)).toEqual([host.left, host.width].map(Math.round));
  });
});

describe('u-master-detail-layout — container with a height (unchanged shape)', () => {
  it('fills the full height beside the list even when the record is short', async () => {
    const el = mount({ width: 1000, height: 400 });
    await frames();
    expect(Math.round(detailOf(el).getBoundingClientRect().height)).toBe(400);
  });

  it('keeps a tall record inside the layout, scrolling within the pane', async () => {
    const el = mount({ width: 1000, height: 400, detailHeight: 2000 });
    await frames();
    const pane = detailOf(el);
    expect(Math.round(pane.getBoundingClientRect().height)).toBe(400);
    expect(pane.scrollHeight).toBeGreaterThan(pane.clientHeight);
  });

  it('covers the whole layout in overlay mode', async () => {
    const el = mount({ width: 500, height: 400 });
    await frames();
    expect(el.hasAttribute('overlay')).toBe(true);
    const rect = detailOf(el).getBoundingClientRect();
    const host = el.getBoundingClientRect();
    expect([rect.top, rect.left, rect.width, rect.height].map(Math.round))
      .toEqual([host.top, host.left, host.width, host.height].map(Math.round));
  });
});

/** What is painted at a viewport point (CSS pixels) — paint order, not hit-testing. */
async function paintedAt(x: number, y: number): Promise<[number, number, number]> {
  const shot = (await page.screenshot({ save: false, base64: true } as never)) as unknown as { base64: string } | string;
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = `data:image/png;base64,${typeof shot === 'string' ? shot : shot.base64}`;
  });
  const scale = img.width / window.innerWidth;
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const [r, g, b] = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data;
  return [r, g, b];
}

describe('u-master-detail-layout — overlay paint order', () => {
  it('paints the covering detail over a positioned list header with its own z-index', async () => {
    scroller.style.width = '500px';
    scroller.innerHTML = `
      <div style="height: 400px">
        <u-master-detail-layout>
          <div style="height: 1500px">
            <div style="position: sticky; top: 0; z-index: 3; height: 60px; background: rgb(255, 0, 0)"></div>
          </div>
          <div slot="detail" style="height: 200px; background: rgb(0, 255, 0)"></div>
        </u-master-detail-layout>
      </div>`;
    const el = scroller.querySelector('u-master-detail-layout') as MasterDetailLayout;
    await frames();
    expect(el.hasAttribute('overlay')).toBe(true);
    const box = el.getBoundingClientRect();
    const [r, g, b] = await paintedAt(box.left + box.width / 2, box.top + 30);
    expect({ r: r > 200, g: g > 200, b: b < 60 }).toEqual({ r: false, g: true, b: true });
  });
});
