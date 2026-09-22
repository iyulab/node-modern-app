// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';
import { IconRegistry } from '@iyulab/components';

/**
 * 셸이 **자기 chrome 으로** 그리는 아이콘이 네트워크에 묶여 있었다(docket `#386`).
 * 토글러 둘이 `lib="bootstrap"` 하드코딩이었고 그 lib 은 components 에서 jsdelivr CDN 조회다 —
 * 소비앱이 자기 아이콘을 빌드 시점에 전부 구워 등록해도 **셸이 쓰는 것만은 그 등록을 타지 않아**,
 * 폐쇄망 배포에서 사이드바 토글이 빈 채로 남았다.
 *
 * ⚠**이 파일의 첫 describe 가 가장 중요하다.** 「셸이 internal 을 요청한다」만 재면,
 * 그 이름이 번들에 «없어도» 아이콘이 조용히 비고 아무도 실패하지 않는다 —
 * 이 리포가 반복 기록한 «존재 ≠ 도달» 의 아이콘 축이다.
 */

let els: SidebarLayout[] = [];

async function mount(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
}

/**
 * 셸이 **자기 chrome 으로** 그리는 아이콘만 센다.
 *
 * ⚠**로고는 제외한다** — 로고 폴백은 `lib`·`name` 없이 렌더되는 별도 관심사이고
 * (`sidebar-logo-fallback.browser.test.ts` 가 덮는다), 함께 세면 이 파일의 단언이
 * 「chrome 의 출처」가 아니라 「로고가 있는가」를 재게 된다.
 */
function icons(el: SidebarLayout): { lib: string | null; name: string | null }[] {
  return [...(el.shadowRoot?.querySelectorAll('u-icon:not(.logo)') ?? [])].map((i) => ({
    lib: i.getAttribute('lib'),
    name: i.getAttribute('name'),
  }));
}

const BASE: SidebarLayoutConfig = { type: 'sidebar', title: 'App', main: [] };

afterEach(() => {
  for (const el of els) el.remove();
  els = [];
});

describe('기본 아이콘 이름이 internal 번들에 «실재하는가» — 오타 하나면 아이콘이 조용히 빈다', () => {
  it.each(['menu-2', 'x', 'layout-sidebar'])(
    'internal 번들이 %s 를 해석한다',
    async (name) => {
      const svg = await IconRegistry.resolve('internal', name);
      expect(svg, `internal 번들에 '${name}' 가 없다 — 셸 chrome 이 빈 채로 렌더된다`).toBeTruthy();
      expect(svg).toContain('<svg');
    },
  );

  it('네거티브 — 없는 이름은 undefined 다(위 단언이 무엇이든 통과시키는 것이 아님을 고정)', async () => {
    expect(await IconRegistry.resolve('internal', 'this-glyph-does-not-exist')).toBeUndefined();
  });
});

describe('셸 chrome 의 기본 출처 — 네트워크를 타지 않는다', () => {
  it('렌더된 chrome 아이콘이 «전부» internal 이다 — CDN lib 이 하나도 없다', async () => {
    const el = await mount(BASE);
    const rendered = icons(el);
    expect(rendered.length).toBeGreaterThan(0);
    for (const i of rendered) expect(i.lib).toBe('internal');
  });

  it('한 셸이 서로 다른 X 를 둘 그리지 않는다 — 모바일 닫기와 오버레이 닫기가 같은 글리프다', async () => {
    const el = await mount(BASE);
    el.state = 'mobile-open';
    await el.updateComplete;
    const xs = icons(el).filter((i) => i.name === 'x');
    // 종전: 모바일 닫기는 bootstrap 'x-lg', 오버레이 닫기는 internal 'x' — 한 셸에 두 모양.
    expect(xs.length).toBeGreaterThanOrEqual(2);
    for (const i of xs) expect(i.lib).toBe('internal');
  });
});

describe('icons 설정 — 키 단위 부분 오버라이드', () => {
  it('lib 만 바꾸면 이름은 기본값을 쓴다', async () => {
    const el = await mount({ ...BASE, icons: { lib: 'app' } });
    for (const i of icons(el)) expect(i.lib).toBe('app');
    expect(icons(el).some((i) => i.name === 'layout-sidebar')).toBe(true);
  });

  it('lib 과 이름을 함께 주면 둘 다 반영된다 — 자기 아이콘 세트로 갈아끼우는 경로', async () => {
    const el = await mount({
      ...BASE,
      icons: { lib: 'app', menu: 'list', close: 'x-lg', sidebarToggle: 'sidebar-toggle' },
    });
    el.state = 'mobile-open';
    await el.updateComplete;
    const rendered = icons(el);
    for (const i of rendered) expect(i.lib).toBe('app');
    expect(rendered.some((i) => i.name === 'x-lg')).toBe(true);
    expect(rendered.some((i) => i.name === 'sidebar-toggle')).toBe(true);
  });

  it('지정하지 않은 키는 기본값 그대로다 — 부분 오버라이드가 나머지를 지우지 않는다', async () => {
    const el = await mount({ ...BASE, icons: { sidebarToggle: 'chevron-left' } });
    const rendered = icons(el);
    expect(rendered.some((i) => i.name === 'chevron-left')).toBe(true);
    for (const i of rendered) expect(i.lib).toBe('internal');
  });

  it('icons 를 생략하면 이 설정이 생기기 전과 같다', async () => {
    const el = await mount(BASE);
    expect(icons(el).every((i) => i.lib === 'internal')).toBe(true);
  });
});
