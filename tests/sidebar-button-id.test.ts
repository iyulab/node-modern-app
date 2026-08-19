// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';

/**
 * `SidebarButtonConfig`에 `id`가 없어 `u-popover[for="#id"]` 같은 외부 앵커링이 불가능했다
 * (docket `5f17f4e0`). 렌더된 `<u-sidebar-button>` 호스트로 그대로 전달한다 — 공개 API만으로
 * 앵커링이 되어, 내부 전용 `<u-sidebar-button>` 태그명을 소스에서 알아낼 필요가 없어진다.
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

const buttonEl = (el: SidebarLayout) => el.shadowRoot!.querySelector('u-sidebar-button')!;

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('SidebarLayout — button 항목 id 전달', () => {
  it('🔴config.id가 렌더된 <u-sidebar-button> 호스트의 id 속성으로 전달된다', async () => {
    const el = await mount({ type: 'sidebar', main: [{ type: 'button', id: 'settings-trigger', label: '설정' }] });
    expect(buttonEl(el).getAttribute('id')).toBe('settings-trigger');
  });

  it('NEGATIVE: id 미지정 시 id 속성 자체가 없다(빈 문자열 id="" 아님)', async () => {
    const el = await mount({ type: 'sidebar', main: [{ type: 'button', label: '설정' }] });
    expect(buttonEl(el).hasAttribute('id')).toBe(false);
  });
});
