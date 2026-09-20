import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';
import { RouteDoneEvent, type RouteContext } from '@iyulab/router';

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

function fakeRouteContext(pathname = '/detail'): RouteContext {
  return {
    href: `https://example.com${pathname}`,
    origin: 'https://example.com',
    basepath: '/',
    path: pathname,
    pathname,
    params: {},
    query: new URLSearchParams(),
    progress: () => {},
    metadata: {},
  };
}

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

describe('SidebarLayout — overlay close button', () => {
  it('renders a close button with the shared "Close" label while the overlay is open', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    el.appendChild(panel);
    await settle();

    const closeBtn = el.shadowRoot!.querySelector('.overlay-close') as HTMLElement;
    expect(closeBtn).not.toBeNull();
    expect(closeBtn.getAttribute('aria-label')).toBe('Close');
  });

  it('clicking the close button fires a non-cancelable overlay-close event', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    el.appendChild(panel);
    await settle();

    const events: Event[] = [];
    el.addEventListener('overlay-close', (e) => events.push(e));
    const closeBtn = el.shadowRoot!.querySelector<HTMLElement>('.overlay-close')!;
    closeBtn.click();

    expect(events).toHaveLength(1);
    expect(events[0].cancelable).toBe(false);
    expect(events[0].bubbles).toBe(true);
  });
});

describe('SidebarLayout — overlay across a route transition', () => {
  it('a route-done event while the overlay is open leaves the overlay open and route content inert', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    el.appendChild(panel);
    await settle();
    expect(el.matches(':state(overlay)')).toBe(true);

    window.dispatchEvent(new RouteDoneEvent(fakeRouteContext()));
    await settle();

    expect(el.matches(':state(overlay)')).toBe(true);
    expect(mainContent(el).hasAttribute('inert')).toBe(true);
  });
});

/**
 * Paint order and focus containment while the overlay is open (docket
 * iyulab/node-packages#364).
 *
 * The overlay frame is `position: absolute; z-index: 1`. Route content routinely holds
 * positioned descendants with a higher z-index — a data grid's sticky header row and
 * pinned cells sit at 2–4. Unless the region holding route content is its own stacking
 * context while the overlay is open, those compete with the overlay frame in the *same*
 * context and win, so the list paints through the panel meant to cover it.
 *
 * ⚠**Measured in pixels, not by hit-testing.** The first draft of this suite asked
 * `document.elementFromPoint` which element was on top, and on the *unfixed* build it
 * reported the overlay panel — green across the board. It is the wrong instrument: route
 * content is `inert` while the overlay is open, and inert content is already excluded
 * from hit-testing, so that oracle answers a question about *interactivity* order while
 * the defect is about *paint* order. Sampling the rendered pixel is what tells them apart.
 */
describe('SidebarLayout — overlay paint order and focus containment', () => {
  const ROUTE = '255,0,0';
  const OVERLAY = '0,255,0';

  /** What is actually painted at a viewport point, as a label rather than raw channels. */
  async function paintedAt(x: number, y: number): Promise<string> {
    const shot = (await page.screenshot({ save: false, base64: true } as never)) as unknown as
      | { base64: string }
      | string;
    const base64 = typeof shot === 'string' ? shot : shot.base64;
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = `data:image/png;base64,${base64}`;
    });
    // The screenshot is in device pixels; the caller measured in CSS pixels.
    const scale = img.width / window.innerWidth;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const [r, g, b] = ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data;
    const near = (cr: number, cg: number, cb: number) =>
      Math.abs(r - cr) < 60 && Math.abs(g - cg) < 60 && Math.abs(b - cb) < 60;
    if (near(255, 0, 0)) return 'route content';
    if (near(0, 255, 0)) return 'overlay';
    return `rgb(${r},${g},${b})`;
  }

  /** A route-content child that outranks the overlay frame's own z-index. */
  function addRouteContent(el: SidebarLayout, zIndex: number): HTMLElement {
    const box = document.createElement('div');
    box.style.cssText = `position: absolute; inset: 0; z-index: ${zIndex}; background: rgb(${ROUTE});`;
    el.appendChild(box);
    return box;
  }

  function addOverlayPanel(el: SidebarLayout): HTMLElement {
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.style.cssText = `position: absolute; inset: 0; background: rgb(${OVERLAY});`;
    el.appendChild(panel);
    return panel;
  }

  function overlayCentre(el: SidebarLayout): [number, number] {
    const r = el.shadowRoot!.querySelector('[part="overlay"]')!.getBoundingClientRect();
    return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)];
  }

  it.each([2, 3, 4])(
    'route content at z-index %i does not paint through the open overlay',
    async (zIndex) => {
      const el = await mount({ type: 'sidebar' });
      addRouteContent(el, zIndex);
      addOverlayPanel(el);
      await settle();

      const [x, y] = overlayCentre(el);
      expect(await paintedAt(x, y)).toBe('overlay');
    },
  );

  it('the boundary is scoped to the open overlay — closing it leaves route content on top again', async () => {
    const el = await mount({ type: 'sidebar' });
    addRouteContent(el, 3);
    const panel = addOverlayPanel(el);
    await settle();

    const [x, y] = overlayCentre(el);
    expect(await paintedAt(x, y)).toBe('overlay');

    panel.remove();
    await settle();
    expect(el.matches(':state(overlay)')).toBe(false);
    expect(await paintedAt(x, y)).toBe('route content');
  });

  it('inert on the route-content wrapper reaches slotted light DOM — a button there cannot take focus', async () => {
    const el = await mount({ type: 'sidebar' });
    const button = document.createElement('button');
    button.textContent = 'Row action';
    el.appendChild(button);
    addOverlayPanel(el);
    await settle();

    button.focus();
    expect(document.activeElement).not.toBe(button);
  });

  it('a control inside the overlay still takes focus while route content is inert', async () => {
    const el = await mount({ type: 'sidebar' });
    const panel = addOverlayPanel(el);
    const button = document.createElement('button');
    button.textContent = 'Save';
    panel.appendChild(button);
    await settle();

    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('the route-content wrapper is exposed as a part, so a consumer can see the shell applying inert', async () => {
    const el = await mount({ type: 'sidebar' });
    addOverlayPanel(el);
    await settle();

    const wrapper = el.shadowRoot!.querySelector('[part="main-content"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.hasAttribute('inert')).toBe(true);
  });
});
