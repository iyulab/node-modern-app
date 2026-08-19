// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';
import { registerLocale, setDefaultLocale } from '../src/internals/locale.js';

/**
 * 모바일 헤더·사이드바 헤더의 토글 버튼 둘 다 아이콘 전용인데 `aria-label`이 없었다 —
 * 스크린리더에는 이름 없는 "button"으로만 노출됐다(docket `195796d1`). `MasterDetailLayout`의
 * `detailClose`와 같은 로케일 레지스트리 패턴으로 배선한다.
 */

let els: SidebarLayout[] = [];

async function mount(config: SidebarLayoutConfig, locale?: string): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  if (locale) el.locale = locale;
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
}

const mobileToggler = (el: SidebarLayout) => el.shadowRoot!.querySelector('.mobile-header .toggler')!;
const sidebarToggler = (el: SidebarLayout) => el.shadowRoot!.querySelector('.sidebar-header .toggler')!;

beforeEach(() => setDefaultLocale(undefined));

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('SidebarLayout — 토글 버튼 aria-label', () => {
  it('🔴모바일 헤더 토글 버튼에 영어 기본 aria-label이 있다', async () => {
    const el = await mount({ type: 'sidebar' });
    expect(mobileToggler(el).getAttribute('aria-label')).toBe('Toggle menu');
  });

  it('🔴사이드바 헤더 토글 버튼에 영어 기본 aria-label이 있다', async () => {
    const el = await mount({ type: 'sidebar' });
    expect(sidebarToggler(el).getAttribute('aria-label')).toBe('Toggle sidebar');
  });

  it('등록된 로케일이 두 토글 버튼 모두에 반영된다', async () => {
    registerLocale('ko', { toggleMobileMenu: '메뉴 열기/닫기', toggleSidebar: '사이드바 접기/펼치기' });
    const el = await mount({ type: 'sidebar' }, 'ko');
    expect(mobileToggler(el).getAttribute('aria-label')).toBe('메뉴 열기/닫기');
    expect(sidebarToggler(el).getAttribute('aria-label')).toBe('사이드바 접기/펼치기');
  });
});
