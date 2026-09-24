import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/components/dist/components/alert/UAlert.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * `slot="notice"` — app-level notices (connection lost, a new build is ready) belong to the
 * shell, not to one screen (docket iyulab/node-packages#390). They stack at the top of the
 * main region, in flow: they scroll away with the content rather than permanently taking a
 * strip of a small screen, and they never cover the route content.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
  host.style.width = '900px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const settle = async (el: SidebarLayout) => {
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
};

const part = (el: SidebarLayout, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`)!;

function notice(text: string): HTMLElement {
  const n = document.createElement('div');
  n.slot = 'notice';
  n.setAttribute('role', 'status');
  n.textContent = text;
  return n;
}

function content(height = 1200): HTMLElement {
  const c = document.createElement('div');
  c.style.height = `${height}px`;
  c.textContent = 'Route content';
  return c;
}

describe('SidebarLayout — notice slot', () => {
  it('takes no space while empty', async () => {
    const el = await mount();
    expect(part(el, 'notices').getBoundingClientRect().height).toBe(0);
  });

  it('stacks notices above the route content, without covering it', async () => {
    const el = await mount();
    const body = content();
    el.append(body, notice('Server unreachable'), notice('A new version is ready'));
    await settle(el);

    const [a, b] = [...el.querySelectorAll<HTMLElement>('[slot="notice"]')].map((n) => n.getBoundingClientRect());
    const c = body.getBoundingClientRect();
    expect(a.bottom).toBeLessThanOrEqual(b.top);
    expect(b.bottom).toBeLessThanOrEqual(c.top);
  });

  // ⚠A plain element stretches in the column stack by itself — the stack's own width rule is what
  // overrides a notice's `fit-content` host width, and only the real-u-alert case below proves that.
  it('gives every notice the full width of the content box, whatever its text length', async () => {
    const el = await mount();
    el.append(notice('Short'), notice('A considerably longer notice about a new version being ready'));
    await settle(el);

    const widths = [...el.querySelectorAll<HTMLElement>('[slot="notice"]')].map((n) => n.getBoundingClientRect().width);
    expect(widths[0]).toBeGreaterThan(0);
    expect(widths[0]).toBe(widths[1]);
    expect(widths[0]).toBe(part(el, 'main-content').clientWidth);
  });

  it('is in flow — it scrolls away with the content instead of holding a strip of the screen', async () => {
    const el = await mount();
    const n = notice('Server unreachable');
    el.append(content(), n);
    await settle(el);

    const before = n.getBoundingClientRect().top;
    part(el, 'main').scrollTop = 100;
    await settle(el);
    expect(n.getBoundingClientRect().top).toBeCloseTo(before - 100, 0);
  });

  it('goes inert with the route content while the overlay is open', async () => {
    const el = await mount();
    const n = notice('');
    const action = document.createElement('button');
    action.textContent = 'Reload';
    n.append(action);
    el.append(n);
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.textContent = 'Detail';
    el.append(panel);
    await settle(el);

    action.focus();
    expect(document.activeElement).not.toBe(action);
  });

  it('the documented markup — real u-alert banners — fill the width and are visible', async () => {
    const el = await mount();
    el.insertAdjacentHTML('beforeend',
      '<u-alert slot="notice" status="warning" open>Server unreachable — retrying.</u-alert>' +
      '<u-alert slot="notice" status="info" open closable>A new version is ready.</u-alert>');
    const alerts = [...el.querySelectorAll<HTMLElement & { updateComplete: Promise<unknown> }>('u-alert')];
    await Promise.all(alerts.map((a) => a.updateComplete));
    await settle(el);

    const contentWidth = part(el, 'main-content').clientWidth;
    for (const a of alerts) {
      const r = a.getBoundingClientRect();
      expect(r.height).toBeGreaterThan(0);
      expect(r.width).toBe(contentWidth);
    }
  });
});
