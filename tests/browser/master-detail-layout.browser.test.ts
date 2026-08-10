import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/MasterDetailLayout.js';
import type { MasterDetailLayout } from '../../src/components/MasterDetailLayout.js';

/**
 * Real-render checks for the two things a source read cannot confirm:
 * ⑴ the ResizeObserver-driven `overlay` attribute actually flips at the configured
 *   breakpoint (jsdom/happy-dom never compute layout, so this only exists here), and
 * ⑵ the detail slot's presence/absence actually toggles visibility via the `.empty`
 *   class — not the `hidden` attribute (see the Reflection note in cycle-268: bare
 *   `?hidden` next to an unconditional `display:` declaration for the same element
 *   loses the cascade, because author-origin rules always outrank the user-agent
 *   `[hidden]` rule regardless of specificity).
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
});
afterEach(() => host.remove());

const settle = async () => {
  await new Promise(r => requestAnimationFrame(() => r(null)));
  await new Promise(r => setTimeout(r, 60)); // ResizeObserver callbacks land on a later microtask/frame
};

const partOf = (el: Element, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`);

describe('u-master-detail-layout — detail presence', () => {
  it('has no detail panel visible when the detail slot is empty', async () => {
    host.innerHTML = `<u-master-detail-layout>master content</u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    expect(getComputedStyle(partOf(el, 'detail')!).display).toBe('none');
    expect(getComputedStyle(partOf(el, 'divider')!).display).toBe('none');
  });

  it('shows the detail panel once the detail slot has content', async () => {
    host.style.width = '900px'; // stay above the default overlay-breakpoint (760) — this
    // test is about slot presence, not the overlay transition (covered separately below)
    host.innerHTML = `
      <u-master-detail-layout>
        master content
        <div slot="detail">record #1</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    expect(getComputedStyle(partOf(el, 'detail')!).display).not.toBe('none');
    expect(getComputedStyle(partOf(el, 'divider')!).display).not.toBe('none');
  });

  it('hides the detail panel again once the detail slot is emptied', async () => {
    host.style.width = '900px';
    host.innerHTML = `
      <u-master-detail-layout>
        master content
        <div slot="detail">record #1</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    el.querySelector('[slot="detail"]')!.remove();
    await settle();
    expect(getComputedStyle(partOf(el, 'detail')!).display).toBe('none');
  });
});

describe('u-master-detail-layout — overlay breakpoint (ResizeObserver, self width)', () => {
  it('stays side-by-side above the breakpoint', async () => {
    host.style.width = '900px';
    host.innerHTML = `
      <u-master-detail-layout overlay-breakpoint="760">
        master
        <div slot="detail">detail</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    expect(el.hasAttribute('overlay')).toBe(false);
    expect(getComputedStyle(partOf(el, 'detail-close')!).display).toBe('none');
  });

  it('switches to overlay mode below the breakpoint', async () => {
    host.style.width = '500px';
    host.innerHTML = `
      <u-master-detail-layout overlay-breakpoint="760">
        master
        <div slot="detail">detail</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    expect(el.hasAttribute('overlay')).toBe(true);
    expect(getComputedStyle(partOf(el, 'detail-close')!).display).not.toBe('none');
    // the divider has nothing to divide once detail is an overlay, not a side panel
    expect(getComputedStyle(partOf(el, 'divider')!).display).toBe('none');
  });

  it('re-measures on resize (not just at mount)', async () => {
    host.style.width = '900px';
    host.innerHTML = `
      <u-master-detail-layout overlay-breakpoint="760">
        master
        <div slot="detail">detail</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    expect(el.hasAttribute('overlay')).toBe(false);
    host.style.width = '500px';
    await settle();
    expect(el.hasAttribute('overlay')).toBe(true);
  });
});

describe('u-master-detail-layout — detail-close', () => {
  it('fires a cancelable "detail-close" event when the overlay close button is clicked', async () => {
    host.style.width = '500px';
    host.innerHTML = `
      <u-master-detail-layout overlay-breakpoint="760">
        master
        <div slot="detail">detail</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    let fired = 0;
    el.addEventListener('detail-close', () => { fired++; });
    partOf(el, 'detail-close')!.click();
    expect(fired).toBe(1);
  });
});

describe('u-master-detail-layout — masterSize', () => {
  it('applies a custom masterSize to the master panel width', async () => {
    host.style.width = '1200px';
    host.innerHTML = `
      <u-master-detail-layout master-size="30rem">
        master
        <div slot="detail">detail</div>
      </u-master-detail-layout>`;
    const el = host.firstElementChild as MasterDetailLayout;
    await settle();
    const width = partOf(el, 'master')!.getBoundingClientRect().width;
    // 30rem == 480px at the default 16px root font-size
    expect(width).toBeCloseTo(480, 0);
  });
});
