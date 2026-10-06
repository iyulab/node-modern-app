import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteBeginEvent, type RouteContext } from '@iyulab/router';

/**
 * 셸이 **붙을 때** 지금 위치로 현재 메뉴를 안다.
 *
 * 결함: 현재 경로를 `route-begin` 으로만 알아, 셸이 라우트 결과물로 그려지면(React 중첩 라우트의 부모) 첫 `route-begin` 은
 * 셸이 붙기 전에 지나갔다 — 주소창 진입·새로 고침 직후 `selected`·`aria-current` 가 하나도 없었다. «누르고 나서» 재는
 * 시험은 통과했다.
 *
 * 경로 대신 hash 모드로 위치를 만든다 — 시험 iframe 의 경로를 바꾸면 러너가 문서를 잃는다.
 */
let host: HTMLDivElement;
const start = window.location.href;
const startState = window.history.state;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
  document.body.appendChild(host);
});
afterEach(() => {
  host.remove();
  window.history.replaceState(startState, '', start);
});

async function mount(): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = {
    type: 'sidebar',
    main: [
      { type: 'link', label: 'Home', href: '/' },
      { type: 'link', label: 'Assets', href: '/assets' },
      { type: 'group', label: 'Work', items: [{ type: 'link', label: 'Orders', href: '/work-orders' }] },
    ],
  } as SidebarLayout['config'];
  host.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  return el;
}

const links = (el: SidebarLayout) => Array.from(el.shadowRoot!.querySelectorAll('u-sidebar-link')) as HTMLElement[];
const selectedLabels = (el: SidebarLayout) =>
  links(el).filter((l) => l.hasAttribute('selected')).map((l) => l.getAttribute('label') ?? (l as unknown as { label: string }).label);
const groupSelected = (el: SidebarLayout) => el.shadowRoot!.querySelector('u-sidebar-group')!.hasAttribute('selected');

describe('SidebarLayout — 현재 메뉴를 붙을 때 안다', () => {
  it('주소가 /assets 인 채 붙으면 Assets 가 현재 항목이다', async () => {
    window.history.replaceState({ mode: 'hash', basepath: '/' }, '', '#/assets');
    const el = await mount();
    expect(selectedLabels(el)).toEqual(['Assets']);
  });

  it('그룹 안 항목이면 그룹 머리도 «현재 포함» 이다', async () => {
    window.history.replaceState({ mode: 'hash', basepath: '/' }, '', '#/work-orders');
    const el = await mount();
    expect(groupSelected(el)).toBe(true);
  });

  it('붙은 뒤의 route-begin 은 여전히 따라간다', async () => {
    window.history.replaceState({ mode: 'hash', basepath: '/' }, '', '#/assets');
    const el = await mount();
    window.dispatchEvent(new RouteBeginEvent({ path: '/work-orders', pathname: '/work-orders', basepath: '/', params: {}, metadata: {} } as unknown as RouteContext));
    await el.updateComplete;
    expect(selectedLabels(el)).toEqual(['Orders']);
  });
});
