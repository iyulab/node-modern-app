import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarState } from '../../src/layouts/SidebarLayout.types';

/**
 * **가용 폭보다 넓은 본문은 셸을 밀어내지 않고 `.main` 안에서 스크롤된다.**
 *
 * `.main-region` 은 flex item 이고, flex item 의 자동 최소 크기는 콘텐츠의 min-content 다.
 * 주축이 가로인 데스크톱(`default`/`slim`)에서 `min-width: 0` 이 없으면 넓은 표 하나가
 * `.main-region` 을 가용 폭보다 크게 만들어 셸이 뷰포트 밖으로 밀리고, 오른쪽 열이 잘리며
 * 가로 스크롤도 생기지 않는다(docket #341 — 0.22.0 회귀).
 *
 * ## 왜 이 파일이 생겼는가
 *
 * 같은 원인의 세로축 버전(`min-height: 0`, 모바일 column)은 이미 고쳐 있었는데 가로축을
 * 함께 재지 않았다. 이 파일은 **두 주축을 모두** 잰다 — 한 축만 재면 다른 축이 다시 빠진다.
 *
 * ## 왜 브라우저인가
 *
 * flex 자동 최소 크기는 계산된 레이아웃으로만 갈린다. jsdom 은 박스를 계산하지 않는다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.width = '900px';
  host.style.height = '600px';
  document.body.appendChild(host);
});
afterEach(() => {
  host.remove();
  document.body.replaceChildren();
});

const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 80));
};

async function mountWith(state: SidebarState, wide: string, tall: string): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  el.state = state;
  const content = document.createElement('div');
  content.style.width = wide;
  content.style.height = tall;
  el.appendChild(content);
  host.appendChild(el);
  await el.updateComplete;
  await settle();
  return el;
}

const mainOf = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;

describe('SidebarLayout — 넓은 본문(가로 주축)', () => {
  for (const state of ['default', 'slim'] as const) {
    it(`${state}: .main 은 셸 오른쪽 경계를 넘지 않는다`, async () => {
      const el = await mountWith(state, '3000px', '100px');
      const hostRight = host.getBoundingClientRect().right;
      expect(mainOf(el).getBoundingClientRect().right).toBeLessThanOrEqual(hostRight + 0.5);
    });

    it(`${state}: 넘치는 폭은 .main 안에서 가로 스크롤된다`, async () => {
      const el = await mountWith(state, '3000px', '100px');
      const main = mainOf(el);
      expect(main.scrollWidth).toBeGreaterThan(main.clientWidth);
      main.scrollLeft = 200;
      expect(main.scrollLeft).toBeGreaterThan(0);
    });
  }
});

describe('SidebarLayout — 긴 본문(세로 주축, 모바일 column)', () => {
  it('mobile: .main 은 셸 아래 경계를 넘지 않고 안에서 세로 스크롤된다', async () => {
    const el = await mountWith('mobile', '100px', '3000px');
    const main = mainOf(el);
    expect(main.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      host.getBoundingClientRect().bottom + 0.5,
    );
    expect(main.scrollHeight).toBeGreaterThan(main.clientHeight);
  });
});
