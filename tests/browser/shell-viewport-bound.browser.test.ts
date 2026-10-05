import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * **셸은 뷰포트보다 커지지 않는다 — 크롬은 본문 스크롤과 독립이다.**
 *
 * `:host { height: 100% }` 는 부모가 높이를 줄 때만 걸린다. 부모에 높이가 없으면(커스텀 root ·
 * React 래퍼로 조립한 셸) 종전에는 셸이 «본문 길이» 로 커졌다 — 그러면 `.main` 의 `overflow: auto`
 * 가 한 번도 발동하지 않고 문서가 대신 스크롤해, 사이드바(내비게이션 · 아래쪽 계정 영역)가 본문과
 * 함께 화면 위로 밀려 나간다. 개발 경고(200px 미만일 때)도 이 경우에는 침묵했다 — 긴 본문이 셸을
 * 키워 임계값을 넘기기 때문이다.
 *
 * ⇒ 셸이 자기 높이를 뷰포트로 묶는다(`max-height: 100dvh`). 본문은 언제나 `.main` 안에서 스크롤한다.
 *
 * ## 왜 브라우저인가
 *
 * «어느 상자가 스크롤하는가» 와 «사이드바가 화면 안에 있는가» 는 계산된 레이아웃으로만 갈린다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  window.scrollTo(0, 0);
  host = document.createElement('div');
  // 폭을 고정하지 않는다 — 뷰포트보다 넓으면 가로 스크롤바가 생기고, vh 단위는 스크롤바를 빼지 않아
  // 문서가 그 두께만큼 스크롤한다(셸과 무관한 픽스처 잡음).
  host.style.width = '100%';
  document.body.appendChild(host);
});
afterEach(() => {
  host.remove();
  document.body.replaceChildren();
  window.scrollTo(0, 0);
});

const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 120));
};

const CONFIG = {
  type: 'sidebar',
  title: 'App',
  main: [{ type: 'link', label: 'Home', href: '/' }],
  footer: [{ type: 'link', label: 'Account', href: '/account' }],
} as unknown as SidebarLayoutConfig;

/** 높이 없는 부모에 셸을 놓고, 뷰포트보다 긴 본문을 넣는다 — 소비앱이 겪은 형태 그대로다. */
async function mountUnsized(contentHeight: number, state?: string): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = CONFIG;
  const tall = document.createElement('div');
  tall.style.height = `${contentHeight}px`;
  el.appendChild(tall);
  host.appendChild(el);
  await el.updateComplete;
  if (state) {
    (el as unknown as { state: string }).state = state;
    await el.updateComplete;
  }
  await settle();
  return el;
}

const part = (el: SidebarLayout, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`)!;

const inViewport = (r: DOMRect) => r.top >= -1 && r.bottom <= window.innerHeight + 1 && r.height > 0;

describe('modern-app 셸 — 뷰포트에 묶인다', () => {
  it('🔴높이 없는 부모 + 긴 본문: 셸이 뷰포트를 넘지 않고 본문이 .main 안에서 스크롤한다', async () => {
    const el = await mountUnsized(4000);
    const shell = el.getBoundingClientRect();
    expect(Math.round(shell.height), '셸이 본문 길이로 커지면 문서가 대신 스크롤한다').toBeLessThanOrEqual(window.innerHeight);

    const main = part(el, 'main');
    expect(main.scrollHeight, '본문이 .main 안에 있다').toBeGreaterThan(main.clientHeight);
    expect(document.documentElement.scrollHeight, '문서는 스크롤할 것이 없다').toBeLessThanOrEqual(window.innerHeight + 1);
  });

  it('🔴본문을 끝까지 내려도 사이드바의 내비게이션과 아래쪽 계정 영역이 화면 안에 있다', async () => {
    const el = await mountUnsized(4000);
    const main = part(el, 'main');
    main.scrollTop = main.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
    await settle();

    expect(inViewport(part(el, 'sidebar-main').getBoundingClientRect()), '내비게이션').toBe(true);
    expect(inViewport(part(el, 'sidebar-footer').getBoundingClientRect()), '계정 영역').toBe(true);
  });

  it('🔴좁은 폭(모바일 헤더)에서도 본문 스크롤이 헤더를 밀어내지 않는다', async () => {
    const el = await mountUnsized(4000, 'mobile');
    const main = part(el, 'main');
    main.scrollTop = main.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
    await settle();
    expect(inViewport(part(el, 'mobile-header').getBoundingClientRect())).toBe(true);
  });

  it('🔴드로어(modal) 상태에서도 사이드바가 화면 안에 있다', async () => {
    const el = await mountUnsized(4000, 'modal');
    window.scrollTo(0, document.documentElement.scrollHeight);
    await settle();
    expect(inViewport(part(el, 'sidebar-footer').getBoundingClientRect())).toBe(true);
  });

  /*
   * 메뉴가 뷰포트보다 길 때 — 셸이 상한(max-height)으로 묶여도 사이드바가 `height: 100%` 면 그
   * 백분율이 풀리지 않아 사이드바가 «메뉴 길이» 로 커지고, 셸의 overflow: hidden 이 아래쪽 계정
   * 영역을 잘라 닿을 수 없게 된다. 메뉴는 사이드바 안(sidebar-main)에서 스크롤해야 한다.
   */
  const LONG_MENU = {
    ...CONFIG,
    main: Array.from({ length: 60 }, (_, i) => ({ type: 'link', label: `Item ${i}`, href: `/i${i}` })),
  } as unknown as SidebarLayoutConfig;

  async function mountLongMenu(state?: string): Promise<SidebarLayout> {
    const el = document.createElement('u-sidebar-layout') as SidebarLayout;
    el.config = LONG_MENU;
    host.appendChild(el);
    await el.updateComplete;
    if (state) {
      (el as unknown as { state: string }).state = state;
      await el.updateComplete;
    }
    await settle();
    return el;
  }

  for (const state of [undefined, 'slim', 'modal', 'mobile-open'] as const) {
    it(`🔴높이 없는 부모 + 긴 메뉴(${state ?? 'default'}): 아래쪽 계정 영역이 화면 안에 있고 메뉴가 사이드바 안에서 스크롤한다`, async () => {
      const el = await mountLongMenu(state);
      const sidebar = part(el, 'sidebar').getBoundingClientRect();
      expect(Math.round(sidebar.bottom), '사이드바가 메뉴 길이로 커지면 셸이 아래를 자른다').toBeLessThanOrEqual(window.innerHeight);
      expect(inViewport(part(el, 'sidebar-footer').getBoundingClientRect()), '계정 영역').toBe(true);
      const menu = part(el, 'sidebar-main');
      expect(menu.scrollHeight, '메뉴는 sidebar-main 안에서 스크롤한다').toBeGreaterThan(menu.clientHeight);
    });
  }

  it('NEGATIVE 부모가 뷰포트보다 낮은 높이를 주면 그 높이를 그대로 채운다', async () => {
    host.style.height = '400px';
    const el = await mountUnsized(4000);
    expect(Math.round(el.getBoundingClientRect().height)).toBe(400);
    expect(Math.round(part(el, 'main').getBoundingClientRect().height)).toBe(400);
  });

  it('NEGATIVE 짧은 본문은 셸을 키우지도 늘리지도 않는다 — .main 은 스크롤하지 않는다', async () => {
    host.style.height = '600px';
    const el = await mountUnsized(100);
    const main = part(el, 'main');
    expect(main.scrollHeight).toBeLessThanOrEqual(main.clientHeight);
    expect(Math.round(el.getBoundingClientRect().height)).toBe(600);
  });
});
