// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/SidebarLink.js';
import '@iyulab/router';
import type { SidebarLink } from '../src/components/SidebarLink.js';

/**
 * `selected` 상태가 시각적으로는 강조되지만(호스트 속성 기반 CSS) 스크린리더에는
 * "현재 페이지"라는 정보가 전달되지 않았다 — `<u-link>`에 `aria-current`를 세팅하는
 * 코드가 없었다. WAI-ARIA의 내비게이션 현재 위치 관례(`aria-current="page"`)를 이
 * 컴포넌트가 이미 광고하는 "선택된 메뉴 항목 표시" 책임의 일부로 다룬다.
 */

const links: SidebarLink[] = [];

async function mount(props: Record<string, unknown>): Promise<SidebarLink> {
  const el = document.createElement('u-sidebar-link') as SidebarLink;
  for (const [k, v] of Object.entries(props)) (el as unknown as Record<string, unknown>)[k] = v;
  document.body.appendChild(el);
  await el.updateComplete;
  links.push(el);
  return el;
}

const innerLink = (el: SidebarLink) => el.shadowRoot!.querySelector('u-link')!;

afterEach(() => {
  while (links.length) links.pop()!.remove();
});

describe('SidebarLink — aria-current', () => {
  it('🔴selected=true면 내부 u-link에 aria-current="page"가 세팅된다', async () => {
    const el = await mount({ href: '/home', selected: true });
    expect(innerLink(el).getAttribute('aria-current')).toBe('page');
  });

  it('🔴selected=false(기본)면 aria-current 속성 자체가 없다 — "false" 문자열이 아니다', async () => {
    const el = await mount({ href: '/home' });
    expect(innerLink(el).hasAttribute('aria-current')).toBe(false);
  });

  it('selected가 동적으로 꺼지면 aria-current도 함께 제거된다', async () => {
    const el = await mount({ href: '/home', selected: true });
    expect(innerLink(el).hasAttribute('aria-current')).toBe(true);

    el.selected = false;
    await el.updateComplete;
    expect(innerLink(el).hasAttribute('aria-current')).toBe(false);
  });

  it('NEGATIVE: selected 무관하게 href/navigate/target 흘려보내기는 종전대로 동작한다', async () => {
    const el = await mount({ href: '/help/', navigate: 'document', selected: true }) as SidebarLink & { updateComplete: Promise<boolean> };
    const u = innerLink(el) as HTMLElement & { navigate?: string };
    expect(u.navigate).toBe('document');
  });
});
