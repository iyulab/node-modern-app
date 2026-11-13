import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * **`u-sidebar-layout` 은 소비자의 개발 콘솔에 Lit «갱신 뒤 갱신» 경고를 남기지 않는다.**
 *
 * `updated()` 가 모바일 헤더 높이(`mobileHeaderBlockSize`)를 재어 반응형 상태로 쓴다. 그 쓰기가 갱신을 한 번 더 예약하는지는 값이
 * 실제로 바뀌는지에 달려 있어 소스만으로는 모른다. 브라우저 시험의 `console.warn` 은 러너 출력에 오지 않는다 — 스파이로 직접
 * 단언한다. Lit 은 같은 글을 페이지당 한 번만 내므로 시험마다 `globalThis.litIssuedWarnings` 를 비운다.
 */
let host: HTMLDivElement;
beforeEach(() => {
  (globalThis as unknown as { litIssuedWarnings?: Set<string> }).litIssuedWarnings?.clear();
  host = document.createElement('div');
  host.style.height = '500px';
  document.body.appendChild(host);
});
afterEach(() => { host.remove(); vi.restoreAllMocks(); });

const litWarnings = (warn: { mock: { calls: unknown[][] } }) =>
  warn.mock.calls.map(([m]) => String(m)).filter((m) => m.includes('scheduled an update')).map((m) => m.slice(0, 60));
const settle = () => new Promise((r) => setTimeout(r, 120));

async function mount(state: SidebarLayout['state'] = 'default'): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }] } as SidebarLayoutConfig;
  host.appendChild(el);
  await el.updateComplete;
  el.state = state;
  await el.updateComplete;
  await settle();
  return el;
}

describe('u-sidebar-layout — Lit 개발 모드 경고', () => {
  it('🔴일반 마운트에 «갱신 뒤 갱신» 경고가 없다', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await mount();
    expect(litWarnings(warn)).toEqual([]);
  });

  it('🔴모바일 상태(헤더를 재는 자리)로 바꿔도 경고가 없다', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await mount('mobile' as SidebarLayout['state']);
    expect(litWarnings(warn)).toEqual([]);
  });
});
