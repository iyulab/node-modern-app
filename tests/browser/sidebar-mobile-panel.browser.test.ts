import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * 열린 모바일 패널은 모바일 머리 줄 «아래» 에서 시작한다.
 *
 * 결함: 패널이 맨 위(0)에서 시작하고, 패널 안의 자기 머리 줄이 모바일 머리 줄 밑에 깔려 높이를 채웠다 — 두 머리 줄의 높이가
 * 같다는 우연에 기댄 배치였다. 한쪽 여백만 바뀌자 첫 항목이 머리 줄 밑으로 들어갔고, 깔린 머리 줄의 토글은 보이지 않는데
 * Tab 으로 포커스가 갔다(WCAG 2.4.11). 패널 상자가 덮인 자리까지 가져, 패널 안 팝오버의 위치 계산이 머리 줄 밑을 빈 자리로
 * 보고 위로 뒤집어 덮이기도 했다(`sidebar-popover-submenu` 의 «right-start» 케이스).
 */
let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement('div');
  host.style.cssText = 'width:100vw;height:100vh;position:relative;';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function openMobile(): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = {
    type: 'sidebar',
    title: 'App',
    main: [{ type: 'link', label: 'Home', href: '/' }, { type: 'link', label: 'Orders', href: '/orders' }],
  } as SidebarLayout['config'];
  host.appendChild(el);
  await el.updateComplete;
  el.state = 'mobile-open';
  await el.updateComplete;
  // 머리 줄 높이를 잰 뒤 패널 위치가 전환(320ms)을 마칠 때까지.
  await new Promise((r) => setTimeout(r, 450));
  return el;
}

describe('SidebarLayout — 모바일 패널', () => {
  it('패널은 모바일 머리 줄의 아래 끝에서 시작하고 첫 항목이 머리 줄에 가리지 않는다', async () => {
    const el = await openMobile();
    const header = el.shadowRoot!.querySelector('.mobile-header')!.getBoundingClientRect();
    const panel = el.shadowRoot!.querySelector('.sidebar')!.getBoundingClientRect();
    const first = el.shadowRoot!.querySelector('u-sidebar-link')!.getBoundingClientRect();
    expect(Math.abs(panel.top - header.bottom)).toBeLessThanOrEqual(1);
    expect(first.top).toBeGreaterThanOrEqual(header.bottom);
  });

  it('패널 안의 머리 줄은 그리지 않는다 — 머리 줄 밑에 깔린 토글이 포커스를 받지 않는다', async () => {
    const el = await openMobile();
    const inner = el.shadowRoot!.querySelector('.sidebar-header') as HTMLElement;
    expect(getComputedStyle(inner).display).toBe('none');
    const togglers = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('u-button.toggler'))
      .filter((t) => t.getClientRects().length > 0);
    expect(togglers.length).toBe(1);
    expect(togglers[0].closest('.mobile-header')).not.toBeNull();
  });

  it('NEGATIVE: 데스크톱 상태에서는 패널 안 머리 줄이 그대로 있다', async () => {
    const el = document.createElement('u-sidebar-layout') as SidebarLayout;
    el.config = { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }] } as SidebarLayout['config'];
    host.appendChild(el);
    await el.updateComplete;
    el.state = 'default';
    await el.updateComplete;
    const inner = el.shadowRoot!.querySelector('.sidebar-header') as HTMLElement;
    expect(getComputedStyle(inner).display).not.toBe('none');
  });
});
