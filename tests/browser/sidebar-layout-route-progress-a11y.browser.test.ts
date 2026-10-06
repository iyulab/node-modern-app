import { describe, it, expect, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteBeginEvent, RouteDoneEvent, type RouteContext } from '@iyulab/router';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

/**
 * The shell's route-loading bar is a named progress bar while a route loads, and absent from assistive technology
 * while idle.
 *
 * Defect: it was hidden with `opacity: 0` only, so every screen carried an unnamed `progressbar` in the accessibility
 * tree (axe `aria-progressbar-name`, serious) — a stray widget a screen-reader user meets on every page, standing at
 * 0 or 100 with no meaning.
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function context(pathname = '/next'): RouteContext {
  return {
    href: `https://example.com${pathname}`, origin: 'https://example.com', basepath: '/',
    path: pathname, pathname, params: {}, query: new URLSearchParams(),
    progress: () => {}, metadata: {},
  };
}

async function mount(): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  document.body.appendChild(el);
  await el.updateComplete;
  await sleep(50);
  return el;
}

const bar = (el: SidebarLayout) => el.shadowRoot!.querySelector('u-progress-bar')!;

afterEach(() => { document.body.replaceChildren(); Locale.set('en'); });

describe('shell route-loading bar', () => {
  it('idle — hidden from assistive technology', async () => {
    const el = await mount();
    expect(bar(el).getAttribute('aria-hidden')).toBe('true');
    expect(page.getByRole('progressbar').elements().length).toBe(0);
  });

  it('loading — a named, visible progressbar; hidden again once the route is done', async () => {
    const el = await mount();
    window.dispatchEvent(new RouteBeginEvent(context()));
    await el.updateComplete;
    expect(bar(el).classList.contains('loading')).toBe(true);
    expect(page.getByRole('progressbar', { name: 'Loading page', exact: true }).elements().length).toBe(1);

    window.dispatchEvent(new RouteDoneEvent(context()));
    await sleep(400);
    await el.updateComplete;
    expect(bar(el).classList.contains('loading')).toBe(false);
    expect(bar(el).getAttribute('aria-hidden')).toBe('true');
  });

  it('the name follows the locale', async () => {
    Locale.set('ko');
    const el = await mount();
    window.dispatchEvent(new RouteBeginEvent(context()));
    await el.updateComplete;
    expect(bar(el).getAttribute('aria-label')).toBe('페이지 불러오는 중');
  });
});
