import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * `slot="overlay"` — a route-independent panel above `.main`'s route content. Filling it
 * shows the panel and makes the route content `inert`; emptying it reverses both
 * (docket iyulab/node-packages#333).
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const settle = () => new Promise((r) => setTimeout(r, 0));

const mainContent = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector<HTMLElement>('.main-content')!;

describe('SidebarLayout — overlay slot', () => {
  it('empty overlay: no :state(overlay), route content is not inert', async () => {
    const el = await mount({ type: 'sidebar' });
    expect(el.matches(':state(overlay)')).toBe(false);
    expect(mainContent(el).hasAttribute('inert')).toBe(false);
  });

  it('filling slot="overlay" sets :state(overlay) and makes route content inert', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.textContent = 'Order #123';
    el.appendChild(panel);
    await settle();

    expect(el.matches(':state(overlay)')).toBe(true);
    expect(mainContent(el).hasAttribute('inert')).toBe(true);
  });

  it('removing the overlay slot content clears :state(overlay) and inert', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    el.appendChild(panel);
    await settle();
    expect(el.matches(':state(overlay)')).toBe(true);

    panel.remove();
    await settle();
    expect(el.matches(':state(overlay)')).toBe(false);
    expect(mainContent(el).hasAttribute('inert')).toBe(false);
  });

  it('a scrollable box inside the overlay keeps its own keyboard scroll (validates the #332 fix composes with this slot)', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.tabIndex = 0;
    panel.style.height = '100px';
    panel.style.overflowY = 'auto';
    const filler = document.createElement('div');
    filler.style.height = '1000px';
    panel.appendChild(filler);
    el.appendChild(panel);
    await settle();

    const main = el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    panel.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(main.scrollTop).toBe(0);
  });
});
