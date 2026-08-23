import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * 사이드바/모바일 헤더 배경의 기본 폴백 토큰. jsdom 은 커스텀 프로퍼티 캐스케이드를
 * 계산하지 않으므로(`shell-tokens.browser.test.ts` 머리말 참조) 실제 렌더로만 검증된다.
 *
 * 이 계약이 존재하는 이유(docket #63): `--u-panel-bg-color`(라이트 = 페이지와 같은
 * neutral-0)로 폴백하면 상시 크롬인 사이드바가 페이지와 같은 흰색으로 앉아 페이지·
 * 사이드바·카드(`u-group-box`, 이미 `--u-bg-color-raised`로 수정됨) 삼중 무구분이
 * 재현됐다. `--u-bg-color-raised`(neutral-50)로 바꾸면 사이드바가 페이지와 구분되고,
 * 카드와 같은 "크롬 톤"을 공유하게 된다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
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

const part = (el: SidebarLayout, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`)!;

describe('SidebarLayout — 사이드바/헤더 배경의 기본 크롬 톤', () => {
  it('사이드바 배경이 --u-bg-color-raised(neutral-50)로 계산된다', async () => {
    const el = await mount({ type: 'sidebar' });
    const sidebarBg = getComputedStyle(part(el, 'sidebar')).backgroundColor;
    // --u-panel-bg-color(light) = neutral-0 = #FFFFFF 였다면 여기서 rgb(255, 255, 255) 이 나온다 —
    // 페이지(--u-bg-color, 역시 neutral-0)와 구분되지 않던 종전 증상 그대로다.
    expect(sidebarBg).toBe('rgb(250, 250, 250)'); // --u-bg-color-raised(light) = neutral-50 = #FAFAFA
  });

  it('모바일 헤더 배경도 같은 크롬 톤을 쓴다', async () => {
    const el = await mount({ type: 'sidebar' });
    el.state = 'mobile';
    await el.updateComplete;
    const headerBg = getComputedStyle(part(el, 'mobile-header')).backgroundColor;
    expect(headerBg).toBe('rgb(250, 250, 250)');
  });

  it('`--app-sidebar-bg`로 여전히 덮을 수 있다(하위호환)', async () => {
    const style = document.createElement('style');
    style.textContent = ':root { --app-sidebar-bg: #0F766E; }';
    document.head.appendChild(style);
    try {
      const el = await mount({ type: 'sidebar' });
      expect(getComputedStyle(part(el, 'sidebar')).backgroundColor).toBe('rgb(15, 118, 110)');
    } finally {
      style.remove();
    }
  });
});
