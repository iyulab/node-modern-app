import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarState } from '../../src/layouts/SidebarLayout.types';

/**
 * `u-sidebar-layout` 은 `dir="rtl"` 에서 사이드바가 **시작 쪽**(오른쪽)에 선다 — 사이드바 · 본문 · 건너뛰기 링크가 거울이다.
 * 오라클은 «시작 가장자리와의 거리» 라 방향 없이 같은 값을 단언한다(LTR 은 왼쪽 · RTL 은 오른쪽 기준).
 *
 * 레이아웃의 방향은 flex 가 이미 따라가지만, 모달 서랍의 `left: 0` · 사이드바 테두리의 `border-right` · 건너뛰기 링크의 `left: 8px`
 * 같은 물리 선언은 RTL 에서 반대편에 남는다. (계획: RTL 논리 속성 전환 — 셸)
 */

afterEach(() => { document.documentElement.dir = 'ltr'; document.body.innerHTML = ''; });

async function mount(dir: 'ltr' | 'rtl', state: SidebarState = 'default'): Promise<SidebarLayout> {
  document.documentElement.dir = dir;
  document.body.innerHTML = '<div id="frame" style="position:relative;width:900px;height:500px"></div>';
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', main: [{ type: 'link', label: 'Home', href: '/' }] };
  document.getElementById('frame')!.appendChild(el);
  await el.updateComplete;
  el.state = state;
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 150));
  return el;
}

const part = (el: SidebarLayout, name: string) => el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`)!;
const edge = (dir: 'ltr' | 'rtl', host: DOMRect, r: DOMRect) => (dir === 'ltr' ? r.left - host.left : host.right - r.right);

describe('RTL — u-sidebar-layout', () => {
  it.each(['ltr', 'rtl'] as const)('%s · default: 사이드바는 시작 가장자리에 서고 본문이 나머지를 채운다', async (dir) => {
    const el = await mount(dir);
    const frame = document.getElementById('frame')!.getBoundingClientRect();
    const S = part(el, 'sidebar').getBoundingClientRect();
    const M = part(el, 'main').getBoundingClientRect();
    expect(Math.abs(edge(dir, frame, S)), `${dir}: 사이드바의 시작 간격`).toBeLessThanOrEqual(1);
    // 본문은 사이드바의 «끝 쪽» 에서 시작한다.
    if (dir === 'ltr') expect(M.left, 'ltr: 본문은 사이드바 오른쪽').toBeGreaterThanOrEqual(S.right - 1);
    else expect(M.right, 'rtl: 본문은 사이드바 왼쪽').toBeLessThanOrEqual(S.left + 1);
  });

  it.each(['ltr', 'rtl'] as const)('%s · default: 사이드바 테두리는 본문과 맞닿은 쪽(끝 쪽)에 있다', async (dir) => {
    const el = await mount(dir);
    const cs = getComputedStyle(part(el, 'sidebar'));
    const facing = dir === 'ltr' ? cs.borderRightWidth : cs.borderLeftWidth;
    const away = dir === 'ltr' ? cs.borderLeftWidth : cs.borderRightWidth;
    expect(parseFloat(facing), `${dir}: 본문 쪽 테두리`).toBeGreaterThan(0);
    expect(parseFloat(away), `${dir}: 반대쪽 테두리`).toBe(0);
  });

  it.each(['ltr', 'rtl'] as const)('%s · modal: 서랍이 시작 가장자리에 붙는다', async (dir) => {
    const el = await mount(dir, 'modal');
    const frame = document.getElementById('frame')!.getBoundingClientRect();
    const S = part(el, 'sidebar').getBoundingClientRect();
    expect(S.width, `${dir}: 모달 서랍이 그려진다`).toBeGreaterThan(100);
    expect(Math.abs(edge(dir, frame, S)), `${dir}: 모달 서랍의 시작 간격`).toBeLessThanOrEqual(1);
  });

  it.each(['ltr', 'rtl'] as const)('%s · 본문 바로가기 링크는 포커스되면 시작 가장자리에서 8px 에 나타난다', async (dir) => {
    const el = await mount(dir);
    const frame = document.getElementById('frame')!.getBoundingClientRect();
    const skip = part(el, 'skip-link');
    skip.focus();
    await new Promise((r) => setTimeout(r, 60));
    expect(Math.abs(edge(dir, frame, skip.getBoundingClientRect()) - 8), `${dir}: 바로가기 링크의 시작 간격`).toBeLessThanOrEqual(1);
  });
});

describe('RTL — 사이드바 서브메뉴는 «끝 쪽» 으로 열린다', () => {
  it.each([['ltr', 'right-start'], ['rtl', 'left-start']] as const)(
    '%s: 팝오버 배치는 %s 다(사이드바가 선 쪽의 반대편 — floating-ui 의 side 는 물리 방향이다)',
    async (dir, expected) => {
      document.documentElement.dir = dir;
      document.body.innerHTML = '<div id="frame" style="position:relative;width:900px;height:500px"></div>';
      const el = document.createElement('u-sidebar-layout') as SidebarLayout;
      el.config = { type: 'sidebar', main: [{ type: 'menu', icon: 'three-dots', label: 'More', items: [{ label: 'A', onClick: () => {} }] }] };
      document.getElementById('frame')!.appendChild(el);
      await el.updateComplete;
      el.state = 'default';
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 100));
      const popover = el.shadowRoot!.querySelector('u-popover')!;
      expect(popover.getAttribute('placement')).toBe(expected);
    });
});
