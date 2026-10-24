import { describe, it, expect, afterEach } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import '../../src/components/SidePanel';
import type { SidePanel } from '../../src/components/SidePanel';

/**
 * `u-side-panel` — `u-drawer` with the side panel's defaults: in from the right, a close button at the top right of
 * the header, the whole screen below 640px. NEGATIVE: a markup `placement` still wins over the default.
 */
let el: SidePanel | undefined;
afterEach(async () => {
  el?.remove();
  el = undefined;
  await page.viewport(1280, 800);
});

async function mount(attrs = ''): Promise<SidePanel> {
  const host = document.createElement('div');
  host.innerHTML = `<u-side-panel ${attrs}><span slot="header">Edit order</span><p>Body</p></u-side-panel>`;
  el = host.firstElementChild as SidePanel;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const settle = () => new Promise(r => setTimeout(r, 450));
const panel = (p: SidePanel) => p.shadowRoot!.querySelector('.panel') as HTMLElement;
const closeBtn = (p: SidePanel) => p.shadowRoot!.querySelector('.close-btn') as HTMLElement;

describe('u-side-panel', () => {
  it('opens at the right edge with a visible close button at the end of its header', async () => {
    await page.viewport(1280, 800);
    const p = await mount();
    expect(p.placement).toBe('right');
    expect(p.closable).toBe(true);
    p.open = true;
    await settle();
    const r = panel(p).getBoundingClientRect();
    expect(Math.round(r.right)).toBe(window.innerWidth);
    expect(r.width).toBeLessThan(window.innerWidth);
    const btn = closeBtn(p).getBoundingClientRect();
    expect(closeBtn(p).hidden).toBe(false);
    expect(btn.right).toBeGreaterThan(r.right - 64);
    expect(btn.top).toBeLessThan(r.top + 64);
  });

  it('covers the whole screen on a phone', async () => {
    await page.viewport(390, 844);
    const p = await mount();
    p.open = true;
    await settle();
    const r = panel(p).getBoundingClientRect();
    expect(Math.round(r.left)).toBe(0);
    expect(Math.round(r.width)).toBe(window.innerWidth);
    expect(Math.round(r.height)).toBe(window.innerHeight);
  });

  it('the close button closes it', async () => {
    const p = await mount();
    p.open = true;
    await settle();
    await userEvent.click(closeBtn(p));
    await settle();
    expect(p.open).toBe(false);
  });

  it('NEGATIVE a placement in markup still wins over the default', async () => {
    const p = await mount('placement="left"');
    expect(p.placement).toBe('left');
  });
});
