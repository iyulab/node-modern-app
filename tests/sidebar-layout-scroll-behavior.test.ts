// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { RouteDoneEvent, type RouteContext } from '@iyulab/router';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';

/**
 * `SidebarLayout`은 라우트 전환 시 스크롤 위치를 리셋·복원하지 않았고, 소비자가 실제
 * 스크롤 컨테이너(섀도 DOM `[part="main"]`)에 접근할 공식 수단도 없었다 — `part`는
 * 스타일링용 CSS 훅일 뿐 JS 접근 계약이 아니다. `layout.scrollBehavior` 훅과
 * `mainElement` 접근자를 신설해 소비자가 직접 리셋/저장/복원 로직을 구현할 수 있게 한다.
 * 미지정 시 기본값은 "아무것도 안 함"(Vue Router의 unset `scrollBehavior`와 동일).
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

function fakeContext(pathname = '/detail'): RouteContext {
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

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('SidebarLayout — 스크롤 컨테이너 접근/훅', () => {
  it('mainElement가 실제 .main 컨테이너를 반환한다', async () => {
    const el = await mount({ type: 'sidebar' });
    expect(el.mainElement).toBe(el.shadowRoot!.querySelector('.main'));
  });

  it('🔴route-done 시 scrollBehavior가 (context, mainElement)로 호출된다', async () => {
    const scrollBehavior = vi.fn();
    const el = await mount({ type: 'sidebar', scrollBehavior });
    const context = fakeContext('/orders/1');

    window.dispatchEvent(new RouteDoneEvent(context));

    expect(scrollBehavior).toHaveBeenCalledTimes(1);
    expect(scrollBehavior).toHaveBeenCalledWith(context, el.mainElement);
  });

  it('scrollBehavior 안에서 scrollTop을 직접 제어할 수 있다', async () => {
    const el = await mount({
      type: 'sidebar',
      scrollBehavior: (_context, main) => {
        main.scrollTop = 42;
      },
    });

    window.dispatchEvent(new RouteDoneEvent(fakeContext()));

    expect(el.mainElement!.scrollTop).toBe(42);
  });

  it('NEGATIVE: scrollBehavior 미지정 시 route-done을 던져도 에러 없이 통과한다(breaking 아님)', async () => {
    await mount({ type: 'sidebar' });
    expect(() => window.dispatchEvent(new RouteDoneEvent(fakeContext()))).not.toThrow();
  });
});
