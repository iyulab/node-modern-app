import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteDoneEvent, type RouteContext } from '@iyulab/router';
import '@iyulab/components/dist/components/input/UInput.js';
import '@iyulab/components/dist/components/select/USelect.js';

/**
 * Where focus lands when a route finishes (docket iyulab/node-modern-app#517).
 *
 * The shell moves focus to `part="main"` on `route-done` so the keyboard can scroll the new
 * screen without a click. A route screen that declares its own first focus — `[autofocus]`, or a
 * `focus()` it already made — must win over that default, the same rule the overlay panel follows.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
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

function deepActive(): Element | null {
  let a: Element | null = document.activeElement;
  while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
  return a;
}

function fakeRouteContext(): RouteContext {
  return { pathname: '/', href: '/', params: {}, query: {}, hash: '', basepath: '/', metadata: {} } as unknown as RouteContext;
}

async function routeDone(el: SidebarLayout) {
  window.dispatchEvent(new RouteDoneEvent(fakeRouteContext()));
  await settle(el);
}

/** A route screen whose input lives in its own shadow root — the common Lit page shape. */
class ScanScreen extends LitElement {
  static properties = { withAutofocus: { type: Boolean } };
  withAutofocus = true;
  render() {
    return this.withAutofocus
      ? html`<label>Code <input id="code" autofocus></label>`
      : html`<label>Code <input id="code"></label>`;
  }
}
customElements.define('test-scan-screen', ScanScreen);

describe('SidebarLayout route-done focus', () => {
  it('moves focus to part="main" when the screen declares nothing', async () => {
    const el = await mount();
    const screen = document.createElement('test-scan-screen') as ScanScreen;
    screen.withAutofocus = false;
    el.appendChild(screen);
    await screen.updateComplete;
    await routeDone(el);
    expect(deepActive()).toBe(el.mainElement);
  });

  it('honours [autofocus] inside the route screen\'s shadow root', async () => {
    const el = await mount();
    const screen = document.createElement('test-scan-screen') as ScanScreen;
    el.appendChild(screen);
    await screen.updateComplete;
    await routeDone(el);
    expect(deepActive()).toBe(screen.shadowRoot!.querySelector('#code'));
  });

  it('honours [autofocus] in light-DOM route content', async () => {
    const el = await mount();
    const wrap = document.createElement('div');
    wrap.innerHTML = '<input id="a"><input id="b" autofocus>';
    el.appendChild(wrap);
    await routeDone(el);
    expect(deepActive()).toBe(wrap.querySelector('#b'));
  });

  it('honours [autofocus] on a u-input — its focus() forwards to the inner field', async () => {
    const el = await mount();
    const wrap = document.createElement('div');
    wrap.innerHTML = '<u-input id="scan" autofocus></u-input>';
    el.appendChild(wrap);
    const input = wrap.querySelector('u-input') as HTMLElement & { updateComplete: Promise<unknown> };
    await input.updateComplete;
    await routeDone(el);
    const active = deepActive();
    expect(active?.tagName).toBe('INPUT');
    expect(input.shadowRoot!.contains(active)).toBe(true);
  });

  it('waits for a route screen that has not rendered yet', async () => {
    const el = await mount();
    const screen = document.createElement('test-scan-screen') as ScanScreen;
    el.appendChild(screen);
    // No await on updateComplete — route-done can arrive before the screen's first render.
    window.dispatchEvent(new RouteDoneEvent(fakeRouteContext()));
    await screen.updateComplete;
    await settle(el);
    expect(deepActive()).toBe(screen.shadowRoot!.querySelector('#code'));
  });

  it('leaves focus alone when the screen already moved it into the content', async () => {
    const el = await mount();
    const screen = document.createElement('test-scan-screen') as ScanScreen;
    screen.withAutofocus = false;
    el.appendChild(screen);
    await screen.updateComplete;
    const input = screen.shadowRoot!.querySelector<HTMLInputElement>('#code')!;
    input.focus();
    await routeDone(el);
    expect(deepActive()).toBe(input);
  });

  it('falls back to part="main" when the [autofocus] element cannot take focus', async () => {
    const el = await mount();
    const wrap = document.createElement('div');
    wrap.innerHTML = '<div autofocus>not focusable</div>';
    el.appendChild(wrap);
    await routeDone(el);
    expect(deepActive()).toBe(el.mainElement);
  });

  it('does not keep focus that sits in the sidebar (the link that navigated)', async () => {
    const el = await mount();
    const screen = document.createElement('test-scan-screen') as ScanScreen;
    screen.withAutofocus = false;
    el.appendChild(screen);
    await screen.updateComplete;
    const toggler = el.shadowRoot!.querySelector<HTMLElement>('button, [tabindex="0"], a');
    toggler?.focus();
    await routeDone(el);
    expect(deepActive()).toBe(el.mainElement);
  });

  it('skips the closed popover a u-select keeps in its shadow root (it carries an autofocus attribute)', async () => {
    const el = await mount();
    const wrap = document.createElement('div');
    wrap.innerHTML = '<u-select></u-select><input id="scan" autofocus>';
    el.appendChild(wrap);
    await (wrap.querySelector('u-select') as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
    await routeDone(el);
    expect(deepActive()).toBe(wrap.querySelector('#scan'));
  });
});
