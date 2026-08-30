// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../src/layouts/SidebarLayout.types';

/**
 * docket #145 — `SidebarLayout.renderItem`의 `group` 브랜치가
 * `?collapsed="${e.collapsed ?? false}"`처럼 인터폴레이션을 따옴표로 감싸고 있었다.
 * 형제 바인딩(`?compact=`, `?selected=`)은 따옴표가 없는데 이 자리만 있었고, 그 결과
 * lit-html 이 불리언-속성 지시자로 인식하지 못해 `collapsed: false`를 줘도 항상
 * 접힌 채로 렌더됐다.
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

const groupEl = (el: SidebarLayout) => el.shadowRoot!.querySelector('u-sidebar-group') as HTMLElement & { collapsed: boolean };

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('SidebarLayout — group.collapsed 설정값 반영', () => {
  it('🔴collapsed: false 를 주면 그룹이 펼쳐진 채로 렌더된다', async () => {
    const el = await mount({
      type: 'sidebar',
      main: [
        {
          type: 'group', icon: 'tool', label: 'g1', collapsed: false,
          items: [{ type: 'link', label: 'a', href: '/a', pattern: '/a' }],
        },
      ],
    });

    const group = groupEl(el);
    expect(group.hasAttribute('collapsed')).toBe(false);
    expect(group.collapsed).toBe(false);
  });

  it('collapsed: true 를 주면 종전대로 접힌 채로 렌더된다', async () => {
    const el = await mount({
      type: 'sidebar',
      main: [
        {
          type: 'group', icon: 'tool', label: 'g2', collapsed: true,
          items: [{ type: 'link', label: 'a', href: '/a', pattern: '/a' }],
        },
      ],
    });

    const group = groupEl(el);
    expect(group.collapsed).toBe(true);
  });

  it('NEGATIVE: 미지정 시 기본값(접힘, `SidebarGroup`의 `collapsed: boolean = true`)이 유지된다', async () => {
    const el = await mount({
      type: 'sidebar',
      main: [
        {
          type: 'group', icon: 'tool', label: 'g3',
          items: [{ type: 'link', label: 'a', href: '/a', pattern: '/a' }],
        },
      ],
    });

    const group = groupEl(el);
    expect(group.collapsed).toBe(true);
  });
});
