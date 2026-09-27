import { describe, it, expect, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { createElement } from 'react';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/components/dist/components/input/UInput.js';
import '@iyulab/components/dist/components/select/USelect.js';
import { app } from '../../src/index.js';

/**
 * Route focus through the tree a real app has — `app.load()` → shell → `<u-outlet>` → screen —
 * with navigation going through the router (docket iyulab/node-modern-app#517).
 *
 * `sidebar-layout-route-focus` slots content into the shell directly and fires `route-done` by
 * hand. That skips the two boundaries the real path crosses: the outlet sits between the shell
 * and the screen, and `route-done` is fired by the router once the outlet says it has rendered.
 * A React screen passed the direct-slot tests while failing here — the outlet reported done
 * before React had committed (fixed in `@iyulab/router` 0.16.1).
 */

class ScanScreen extends LitElement {
  render() {
    return html`<u-select></u-select><u-input label="Code" autofocus></u-input>`;
  }
}
customElements.define('test-real-tree-scan', ScanScreen);

const settle = (ms = 50) => new Promise((r) => setTimeout(r, ms));

function deepActive(): Element | null {
  let a: Element | null = document.activeElement;
  while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
  return a;
}

async function boot() {
  await app.load({
    layout: { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }] },
    routes: [
      { path: '/lit-scan', render: () => html`<test-real-tree-scan></test-real-tree-scan>` },
      { path: '/react-form', render: () => createElement('input', { id: 'react-field', autoFocus: true }) },
      { path: '/react-component', render: () => createElement('u-input', { id: 'react-uinput', autofocus: true }) },
      { path: '/plain', render: () => html`<p>Nothing to type into</p>` },
    ],
  } as any);
  await settle();
}

/** Navigate and wait for the router's own `route-done` — a React route's first mount imports `react-dom`. */
async function go(path: string) {
  const done = new Promise((r) => window.addEventListener('route-done', r, { once: true }));
  app.navigate(path);
  await done;
  await settle(50);
}

afterEach(() => {
  document.body.replaceChildren();
  history.replaceState(null, '', '/');
});

describe('route focus — real tree (shell → u-outlet → screen)', () => {
  it('the outlet is between the shell and the screen (fixture premise)', async () => {
    await boot();
    await go('/plain');
    const outlet = document.querySelector('u-outlet');
    expect(outlet?.closest('u-sidebar-layout')).not.toBeNull();
    expect(outlet?.querySelector('p')).not.toBeNull();
  });

  it('a Lit screen: [autofocus] on a u-input inside its shadow root, after a u-select', async () => {
    await boot();
    await go('/lit-scan');
    const screen = document.querySelector('test-real-tree-scan')!;
    const input = screen.shadowRoot!.querySelector('u-input')!;
    const active = deepActive();
    expect(active?.tagName).toBe('INPUT');
    expect(input.shadowRoot!.contains(active)).toBe(true);
  });

  // Not a discriminating input on its own: React focuses an `autoFocus` native input itself at
  // commit, so even a route-done that fires too early is corrected afterwards. Kept to pin that
  // the shell does not undo it.
  it('a React screen: a native autoFocus input keeps focus', async () => {
    await boot();
    await go('/react-form');
    expect(deepActive()).toBe(document.querySelector('#react-field'));
  });

  // 🔴 The discriminating case: React has no autoFocus behaviour for custom elements, so only the
  // shell can honour `autofocus` on a component — and only if route-done comes after the commit.
  // Reverting the router's commit-before-done makes this land on the content area.
  it('a React screen: autofocus on a component (u-input) is honoured', async () => {
    await boot();
    await go('/react-component');
    const host = document.querySelector('#react-uinput')!;
    const active = deepActive();
    expect(active?.tagName).toBe('INPUT');
    expect(host.shadowRoot!.contains(active)).toBe(true);
  });

  it('a screen that declares nothing: the content area', async () => {
    await boot();
    await go('/plain');
    expect(deepActive()).toBe(document.querySelector('u-sidebar-layout')!.mainElement);
  });
});
