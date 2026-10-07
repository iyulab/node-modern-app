/// <reference types="@vitest/browser-playwright" />
import { describe, it, expect, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * 사이드바 버튼의 켬/끔(`pressed`) — 셸 바닥의 기기·세션 설정 토글(현장 모드 · 다크 모드 · 콤팩트 …).
 *
 * 종전에는 상태 축이 없어 이름을 «켜기/끄기» 로 바꿔 그리는 수밖에 없었다 — 보조기기는 매번 다른 이름을 듣고, 켜진 상태는
 * 글자로만 바뀌어 슬림 모드(아이콘만)에서는 아예 보이지 않았다.
 */
afterEach(() => document.body.replaceChildren());

async function mount(footer: unknown[]): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }], footer } as unknown as SidebarLayoutConfig;
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 50));
  return el;
}

const inner = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector('u-sidebar-button')!.shadowRoot!.querySelector('button')!;

describe('사이드바 버튼 pressed', () => {
  it('🔴값 — 토글 버튼으로 드러나고 클릭으로 바뀐 설정 값을 셸이 다시 그린다', async () => {
    const toggle = { type: 'button', icon: 'gear', label: 'Field mode', pressed: false, onClick: () => { toggle.pressed = !toggle.pressed; } };
    const el = await mount([toggle]);
    expect(page.getByRole('button', { name: 'Field mode', pressed: false }).elements().length).toBe(1);
    inner(el).click();
    await el.updateComplete;
    const button = el.shadowRoot!.querySelector('u-sidebar-button') as HTMLElement & { updateComplete: Promise<unknown> };
    await button.updateComplete;
    expect(inner(el).getAttribute('aria-pressed')).toBe('true');
    expect(page.getByRole('button', { name: 'Field mode', pressed: true }).elements().length).toBe(1);
    expect(button.hasAttribute('pressed')).toBe(true);
  });

  it('🔴함수 — 렌더마다 결과를 읽는다', async () => {
    let on = true;
    const el = await mount([{ type: 'button', label: 'Dark', pressed: () => on, onClick: () => { on = !on; } }]);
    expect(inner(el).getAttribute('aria-pressed')).toBe('true');
    inner(el).click();
    await el.updateComplete;
    await (el.shadowRoot!.querySelector('u-sidebar-button') as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
    expect(inner(el).getAttribute('aria-pressed')).toBe('false');
  });

  it('🔴켜진 토글은 아이콘 색이 바뀐다 — 라벨이 숨는 슬림 모드에서도 상태가 보인다', async () => {
    const el = await mount([
      { type: 'button', icon: 'gear', label: 'Off', pressed: false },
      { type: 'button', icon: 'gear', label: 'On', pressed: true },
    ]);
    const [off, on] = [...el.shadowRoot!.querySelectorAll('u-sidebar-button')].map(
      (b) => getComputedStyle(b.shadowRoot!.querySelector('u-icon')!).color,
    );
    expect(on).not.toBe(off);
  });

  it('NEGATIVE pressed 가 없으면 일반 버튼이다(aria-pressed 없음)', async () => {
    const el = await mount([{ type: 'button', label: 'Settings', onClick: () => {} }]);
    expect(inner(el).hasAttribute('aria-pressed')).toBe(false);
  });
});
