import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * `.main`(라우트 콘텐츠 영역)의 기본 패딩. 이 파일이 확인하는 것은 둘:
 * ⑴ 기본값이 실제로 렌더된 박스에 반영되는가 ⑵ `styles.main` 오버라이드로 여전히
 * 풀블리드(0)로 되돌릴 수 있는가 — 값을 인라인 스타일로 미는 `applyToParts()` 경로가
 * 새 기본값 위에서도 그대로 이기는지는 소스 읽기만으로는 확인할 수 없다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const mainPart = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;

describe('SidebarLayout .main — 기본 패딩', () => {
  it('기본값은 0이 아니다(부재 → 32px 정착)', async () => {
    const el = await mount({ type: 'sidebar' });
    const padding = getComputedStyle(mainPart(el)).paddingTop;
    expect(parseFloat(padding)).toBeGreaterThan(0);
  });

  it('풀블리드가 필요한 소비자는 styles.main 으로 0을 되돌릴 수 있다', async () => {
    const el = await mount({ type: 'sidebar', styles: { main: { padding: '0' } } });
    const padding = getComputedStyle(mainPart(el)).paddingTop;
    expect(parseFloat(padding)).toBe(0);
  });
});
