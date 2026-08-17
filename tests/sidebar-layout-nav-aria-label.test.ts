// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';

/**
 * `<nav class="sidebar-main">`에 `aria-label`도 `aria-labelledby`도 없었다 — 소비자가
 * 밖에서 고칠 수 없는 라이브러리 쪽 결정이었다(섀도 DOM 내부라 `part`로는 속성 주입이
 * 안 된다). `SidebarLayoutConfig.mainAriaLabel`을 지정하면 반영되고, 미지정 시 종전과
 * 동일하게 랜드마크 이름이 없다(breaking 아님).
 */

let els: SidebarLayout[] = [];

async function mount(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
}

const navEl = (el: SidebarLayout) => el.shadowRoot!.querySelector('nav.sidebar-main')!;

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('SidebarLayout — 메인 nav aria-label', () => {
  it('🔴mainAriaLabel 지정 시 nav에 aria-label로 반영된다', async () => {
    const el = await mount({ type: 'sidebar', mainAriaLabel: '주 메뉴' });
    expect(navEl(el).getAttribute('aria-label')).toBe('주 메뉴');
  });

  it('NEGATIVE: 미지정 시 종전과 동일하게 aria-label이 없다(breaking 아님)', async () => {
    const el = await mount({ type: 'sidebar' });
    expect(navEl(el).hasAttribute('aria-label')).toBe(false);
  });

  it('title(브랜드 텍스트)과는 별개다 — title만 있어도 nav에는 반영되지 않는다', async () => {
    const el = await mount({ type: 'sidebar', title: 'My App' });
    expect(navEl(el).hasAttribute('aria-label')).toBe(false);
  });
});
