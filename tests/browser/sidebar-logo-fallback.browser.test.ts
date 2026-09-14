import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * 규약: **이름을 준 로고는 해석에 실패해도 사라지지 않는다.**
 *
 * 로고는 누르면 홈으로 가는 타깃이고, 접힌(slim) 사이드바에서는 로고와 토글만 남는다. 문자열형 로고가
 * 404 · 없는 이름으로 해석에 실패하면 `u-icon` 이 아무것도 그리지 않아 **0×0** 이 됐다 — 타깃 크기 게이트
 * 이식 중 실측(cycle-601). 내비 항목 셋은 이미 같은 자리에 폴백을 갖고 있었고 로고만 빠져 있었다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '420px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(config: SidebarLayoutConfig): Promise<HTMLElement> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  host.appendChild(el);
  await el.updateComplete;
  return el.shadowRoot!.querySelector<HTMLElement>('.sidebar-header .logo')!;
}

const area = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.width * r.height;
};

describe('SidebarLayout — 로고 폴백', () => {
  it('★해석되지 않는 이름이어도 누를 로고가 그려진다', async () => {
    // ⚠이 경로는 **비동기**다 — 기본 URL 요청이 실패한 뒤에야 폴백이 그려진다.
    const logo = await mount({ type: 'sidebar', title: 'App', logo: 'no-such-logo-name' });
    await expect.poll(() => area(logo), { timeout: 3000 }).toBeGreaterThan(0);
  });

  it('NEGATIVE — 로고를 주지 않으면 종전대로 아무것도 그리지 않는다 (없던 아이콘이 나타나지 않는다)', async () => {
    const logo = await mount({ type: 'sidebar', title: 'App' });
    await new Promise((r) => setTimeout(r, 500));
    expect(area(logo)).toBe(0);
  });
});
