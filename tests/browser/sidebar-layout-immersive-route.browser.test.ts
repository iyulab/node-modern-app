import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteDoneEvent, type RouteContext } from '@iyulab/router';

/**
 * A screen can take the whole viewport — a wall display, a kiosk — by asking for it in its route
 * (`metadata: { shell: 'hidden' }`). The shell drops the sidebar, the mobile header and the page padding while that
 * screen is current, and puts them back for the next screen that does not ask (NEGATIVE: an ordinary route keeps
 * the chrome).
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function context(metadata: Record<string, unknown> = {}): RouteContext {
  return {
    href: 'https://example.com/board', origin: 'https://example.com', basepath: '/',
    path: '/board', pathname: '/board', params: {}, query: new URLSearchParams(),
    progress: () => {}, metadata,
    navigation: { type: 'push', entryKey: 'test' },
  } as RouteContext;
}

async function mount(): Promise<SidebarLayout> {
  const host = document.createElement('div');
  host.style.cssText = 'width: 1200px; height: 600px;';
  document.body.appendChild(host);
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }] };
  el.innerHTML = '<div class="screen" style="height: 100%">screen</div>';
  host.appendChild(el);
  await el.updateComplete;
  await sleep(50);
  return el;
}

const shown = (el: SidebarLayout, selector: string) => {
  const node = el.shadowRoot!.querySelector<HTMLElement>(selector)!;
  return getComputedStyle(node).display !== 'none';
};

afterEach(() => document.body.replaceChildren());

describe('immersive route', () => {
  it('an ordinary route keeps the sidebar and the page padding', async () => {
    const el = await mount();
    window.dispatchEvent(new RouteDoneEvent(context()));
    await el.updateComplete;
    expect(el.immersive).toBe(false);
    expect(shown(el, '.sidebar')).toBe(true);
    expect(getComputedStyle(el.shadowRoot!.querySelector('.main')!).paddingTop).not.toBe('0px');
  });

  it('metadata.shell "hidden" gives the screen the whole viewport, and the next route takes it back', async () => {
    const el = await mount();
    window.dispatchEvent(new RouteDoneEvent(context({ shell: 'hidden' })));
    await el.updateComplete;
    expect(el.hasAttribute('immersive')).toBe(true);
    expect(shown(el, '.sidebar')).toBe(false);
    expect(shown(el, '.skip-link')).toBe(false);
    const screen = el.querySelector<HTMLElement>('.screen')!.getBoundingClientRect();
    expect(Math.round(screen.width)).toBe(1200);
    expect(Math.round(screen.left)).toBe(0);

    window.dispatchEvent(new RouteDoneEvent(context()));
    await el.updateComplete;
    expect(el.hasAttribute('immersive')).toBe(false);
    expect(shown(el, '.sidebar')).toBe(true);
  });
});
