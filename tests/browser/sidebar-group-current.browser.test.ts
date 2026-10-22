import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteBeginEvent, type RouteContext } from '@iyulab/router';

/**
 * 사이드바 묶음과 머리 줄.
 *
 * - 현재 화면을 품은 묶음은 펼쳐져 있다 — 결함: 묶음은 `selected` 만 켜고 접힌 채라, 메뉴가 많은 앱에서 지금 위치가 보이지 않았다.
 *   펼친 뒤 사용자가 접으면 다시 그려도 접힌 채다. 스스로 펼친 묶음은 현재 화면이 떠나면 다시 접힌다(사용자가 연 묶음은 남는다).
 *   머리 버튼은 펼침 상태를 `aria-expanded` 로 말한다.
 * - 묶음 안 링크는 아이콘을 주지 않으면 아이콘을 그리지 않는다 — 기본 아이콘(접힌 사이드바의 빈 줄 방지)은 최상위 항목의 것이다.
 * - 접기 버튼은 아이콘만 크다 — 결함: 버튼에 글자 크기를 걸어 em 치수 전체가 커졌고 머리 줄이 85px 였다.
 *
 * 경로 대신 hash 모드로 위치를 만든다 — 시험 iframe 의 경로를 바꾸면 러너가 문서를 잃는다.
 */
let host: HTMLDivElement;
const start = window.location.href;
const startState = window.history.state;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '600px';
  document.body.appendChild(host);
});
afterEach(() => {
  host.remove();
  window.history.replaceState(startState, '', start);
});

async function mount(): Promise<SidebarLayout> {
  window.history.replaceState({ mode: 'hash', basepath: '/' }, '', '#/work-orders');
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.state = 'default';
  el.config = {
    type: 'sidebar',
    title: 'App',
    main: [
      { type: 'link', label: 'Home', href: '/' },
      { type: 'group', label: 'Work', icon: 'folder', items: [{ type: 'link', label: 'Orders', href: '/work-orders' }] },
      { type: 'group', label: 'Admin', icon: 'gear', items: [{ type: 'link', label: 'Users', href: '/users' }] },
    ],
  } as SidebarLayout['config'];
  host.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 0));
  return el;
}

const groups = (el: SidebarLayout) => Array.from(el.shadowRoot!.querySelectorAll('u-sidebar-group')) as (HTMLElement & { collapsed: boolean; updateComplete: Promise<unknown> })[];
const header = (g: HTMLElement) => g.shadowRoot!.querySelector('button[part="header"]') as HTMLButtonElement;
const link = (el: SidebarLayout, label: string) =>
  Array.from(el.shadowRoot!.querySelectorAll('u-sidebar-link')).find((l) => (l as unknown as { label: string }).label === label) as HTMLElement;

describe('SidebarLayout — 묶음과 머리 줄', () => {
  it('현재 화면을 품은 묶음만 펼쳐져 있고 머리가 그것을 말한다', async () => {
    const el = await mount();
    const [work, admin] = groups(el);
    await work.updateComplete;
    expect(work.collapsed).toBe(false);
    expect(admin.collapsed).toBe(true);
    expect(header(work).getAttribute('aria-expanded')).toBe('true');
    expect(header(admin).getAttribute('aria-expanded')).toBe('false');
  });

  it('펼쳐진 현재 묶음을 사용자가 접으면 다시 그려도 접힌 채다', async () => {
    const el = await mount();
    const [work] = groups(el);
    header(work).click();
    await work.updateComplete;
    expect(work.collapsed).toBe(true);
    el.requestUpdate();
    await el.updateComplete;
    await work.updateComplete;
    expect(work.collapsed).toBe(true);
  });

  it('스스로 펼친 묶음은 현재 화면이 떠나면 다시 접히고, 사용자가 연 묶음은 남는다', async () => {
    const el = await mount();
    const [work, admin] = groups(el);
    header(admin).click(); // 사용자가 연다
    await admin.updateComplete;
    expect(admin.collapsed).toBe(false);

    window.dispatchEvent(new RouteBeginEvent({ path: '/', pathname: '/', basepath: '/', params: {}, metadata: {} } as unknown as RouteContext));
    await el.updateComplete;
    await work.updateComplete;
    await admin.updateComplete;
    expect(work.collapsed).toBe(true);
    expect(admin.collapsed).toBe(false);
  });

  it('아이콘 없는 묶음 안 링크는 아이콘을 그리지 않고, 최상위 링크는 기본 아이콘을 그린다', async () => {
    const el = await mount();
    const orders = link(el, 'Orders');
    const home = link(el, 'Home');
    await (orders as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    expect(orders.shadowRoot!.querySelector('u-icon')).toBeNull();
    expect(home.shadowRoot!.querySelector('u-icon')).not.toBeNull();
  });

  it('접기 버튼은 아이콘만 크고 머리 줄을 키우지 않는다', async () => {
    const el = await mount();
    const toggler = el.shadowRoot!.querySelector('.sidebar-header .toggler') as HTMLElement;
    const icon = toggler.querySelector('u-icon') as HTMLElement;
    expect(getComputedStyle(icon).fontSize).toBe('20px');
    // 버튼은 이웃 컨트롤의 글자 크기(본문)를 따른다 — 아이콘 크기가 버튼 치수로 번지면 머리 줄이 높아진다.
    expect(getComputedStyle(toggler).fontSize).not.toBe('20px');
  });
});
