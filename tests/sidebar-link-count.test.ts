// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/SidebarLink.js';
import '@iyulab/router';
import type { SidebarLink } from '../src/components/SidebarLink.js';
import { app } from '../src/App.js';

/**
 * A navigation item can show the work waiting behind it (`count`), and an app can change that
 * number while it runs (`app.setNavCount`) without rebuilding the layout.
 */
const els: HTMLElement[] = [];

async function mount(props: Record<string, unknown>): Promise<SidebarLink> {
  const el = document.createElement('u-sidebar-link') as SidebarLink;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  els.push(el);
  return el;
}
const countPart = (el: SidebarLink) => el.shadowRoot!.querySelector('[part="count"]');

afterEach(() => {
  while (els.length) els.pop()!.remove();
});

describe('SidebarLink — count', () => {
  it('renders the count after the label', async () => {
    const el = await mount({ href: '/reviews', label: 'Reviews', count: 12 });
    expect(countPart(el)?.textContent).toBe('12');
  });

  it('renders nothing without a count, and nothing for an empty string', async () => {
    expect(countPart(await mount({ href: '/a', label: 'A' }))).toBeNull();
    expect(countPart(await mount({ href: '/b', label: 'B', count: '' }))).toBeNull();
  });

  it('keeps 0 — whether a zero is shown is the application’s call', async () => {
    expect(countPart(await mount({ href: '/c', label: 'C', count: 0 }))?.textContent).toBe('0');
  });

  it('stays in the accessible name when the sidebar is compact', async () => {
    const el = await mount({ href: '/d', label: 'D', count: 3, compact: true });
    const part = countPart(el)!;
    expect(part.hasAttribute('compact')).toBe(true);
    expect(part.textContent).toBe('3');
  });
});

describe('app.setNavCount', () => {
  it('updates the layout’s live counts by href and clears with undefined', () => {
    const layout = document.createElement('div') as unknown as HTMLElement & { counts: Record<string, unknown> };
    layout.counts = {};
    els.push(layout);
    (app as unknown as { _layout: HTMLElement })._layout = layout;

    app.setNavCount('/reviews', 12);
    expect(layout.counts).toEqual({ '/reviews': 12 });

    const before = layout.counts;
    app.setNavCount('/reviews', undefined);
    expect(layout.counts).toEqual({});
    // A new object each time — Lit re-renders on reassignment, not on mutation.
    expect(layout.counts).not.toBe(before);

    (app as unknown as { _layout?: HTMLElement })._layout = undefined;
  });
});
