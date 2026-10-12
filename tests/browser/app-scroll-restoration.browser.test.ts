import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../../src/App.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * `app.load()` 의 셸은 문서가 아니라 본문 상자(`main`)를 굴린다 — 브라우저의 문서 복원이 닿지 않는다. 앱은 라우터의
 * `scrollRestoration` 을 그 상자로 배선해, 뒤로 가기로 돌아온 화면이 보던 자리에 선다(새 이동은 맨 위).
 * hash 모드 — 경로 라우팅은 시험 iframe 의 문서를 잃는다.
 */
const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 40));
};
const until = async (fn: () => boolean, what: string) => {
  for (let i = 0; i < 80; i++) {
    if (fn()) return;
    await settle();
  }
  throw new Error(`기다렸지만 일어나지 않았다: ${what}`);
};
const tall = (name: string) => () => {
  const s = document.createElement('section');
  s.setAttribute('data-screen', name);
  s.style.height = '3000px';
  return s;
};
const startPath = window.location.pathname + window.location.search;

let root: HTMLElement | undefined;
afterEach(() => {
  app.unload();
  root?.remove();
  history.replaceState(null, '', startPath);
});

async function load(extra: Record<string, unknown> = {}) {
  history.replaceState(null, '', startPath);
  root = document.createElement('div');
  root.style.height = '400px';
  document.body.appendChild(root);
  await app.load({
    root,
    routerMode: 'hash',
    initialLoad: false,
    layout: { type: 'sidebar' },
    routes: [{ path: '/a', render: tall('a') }, { path: '/b', render: tall('b') }],
    ...extra,
  } as Parameters<typeof app.load>[0]);
  const layout = root.querySelector('u-sidebar-layout') as SidebarLayout;
  await layout.updateComplete;
  return layout;
}
const screen = () => root?.querySelector('[data-screen]')?.getAttribute('data-screen');

describe('app.load — 본문 상자의 스크롤 복원', () => {
  it('뒤로 가기로 돌아온 화면은 본문에서 보던 자리 · 새 이동은 맨 위', async () => {
    const layout = await load();
    await app.router!.go('/a');
    const main = layout.mainElement!;
    await until(() => main.scrollHeight > 2000, 'a 높이');
    main.scrollTop = 900;
    await app.router!.go('/b');
    expect(main.scrollTop).toBe(0);
    history.back();
    await until(() => screen() === 'a', 'a');
    await until(() => main.scrollTop === 900, 'scrollTop 900');
  });

  it('레이아웃의 scrollBehavior 를 준 앱은 그 훅이 맡는다 — 라우터 복원은 꺼진다', async () => {
    await load({ layout: { type: 'sidebar', scrollBehavior: () => {} } });
    expect(history.scrollRestoration).toBe('auto');
  });

  it('scrollRestoration: false 면 끈다', async () => {
    await load({ scrollRestoration: false });
    expect(history.scrollRestoration).toBe('auto');
  });
});
