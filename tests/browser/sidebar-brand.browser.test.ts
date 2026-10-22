import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import { IconRegistry } from '@iyulab/components/dist/utilities/icons.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * 사이드바 브랜드 — 제목 아래 부제, 등록 라이브러리의 아이콘 로고.
 *
 * 계기: 업무 앱 시안이 «건철관리 / 여신 서류 보관 시스템» 두 줄 브랜드를 그리려 했는데 부제 자리가 없었고, 문자열 로고는
 * 아이콘 라이브러리를 고르지 못해(`u-icon` 기본 경로만) 렌더 함수로 직접 그려야 했다 — 그 렌더 결과는 셸의 섀도 안이라
 * 앱 시트도 닿지 않는다.
 */
let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '500px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(config: Partial<SidebarLayoutConfig>, state: SidebarLayout['state'] = 'default') {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', main: [{ type: 'link', label: 'Home', href: '/' }], ...config } as SidebarLayoutConfig;
  host.appendChild(el);
  await el.updateComplete;
  el.state = state;
  await el.updateComplete;
  return el;
}

describe('SidebarLayout — 브랜드', () => {
  it('부제가 제목 아래 한 줄로 그려진다', async () => {
    const el = await mount({ title: '건철관리', subtitle: '여신 서류 보관 시스템' });
    const title = el.shadowRoot!.querySelector('.sidebar-header .title') as HTMLElement;
    const sub = title.querySelector('.subtitle') as HTMLElement;
    expect(sub.textContent).toBe('여신 서류 보관 시스템');
    const t = title.getBoundingClientRect();
    const s = sub.getBoundingClientRect();
    expect(s.top).toBeGreaterThan(t.top + 1);
    expect(parseFloat(getComputedStyle(sub).fontSize)).toBeLessThan(parseFloat(getComputedStyle(title).fontSize));
  });

  it('접힌 사이드바에서는 제목과 함께 숨고, 모바일 머리 줄에는 없다', async () => {
    const slim = await mount({ title: 'App', subtitle: 'Sub' }, 'slim');
    expect((slim.shadowRoot!.querySelector('.sidebar-header .subtitle') as HTMLElement).getClientRects().length).toBe(0);
    slim.remove();
    const mobile = await mount({ title: 'App', subtitle: 'Sub' }, 'mobile-open');
    expect(mobile.shadowRoot!.querySelector('.mobile-header .subtitle')).toBeNull();
  });

  it('NEGATIVE: 부제를 주지 않으면 요소를 두지 않는다', async () => {
    const el = await mount({ title: 'App' });
    expect(el.shadowRoot!.querySelector('.subtitle')).toBeNull();
  });

  it('로고 { icon, lib } 는 그 라이브러리에서 아이콘을 찾는다', async () => {
    let asked = '';
    IconRegistry.register('probe-brand', async (name: string) => {
      asked = name;
      return '<svg viewBox="0 0 16 16"><rect width="16" height="16"/></svg>';
    });
    const el = await mount({ title: 'App', logo: { icon: 'files', lib: 'probe-brand' } });
    const icon = el.shadowRoot!.querySelector('.sidebar-header u-icon.logo') as HTMLElement & { lib?: string; name?: string };
    expect(icon.lib).toBe('probe-brand');
    expect(icon.name).toBe('files');
    await new Promise((r) => setTimeout(r, 50));
    expect(asked).toBe('files');
    IconRegistry.unregister('probe-brand');
  });
});
