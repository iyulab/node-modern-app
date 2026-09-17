import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * `.main`의 키보드 스크롤 단축키(WCAG 2.1.1 지원)가 본문 **안**에 있는 다른 스크롤
 * 상자(상세 패널·분할창 등)의 스크롤 키까지 가로채면 안 된다 — 그 상자에 포커스가
 * 있을 때는 브라우저 기본 스크롤에 맡겨야 한다(docket iyulab/node-packages#332).
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  // `.main`은 `:host { height: 100% }`를 따르므로, scrollTop 이동을 실제로 관측하려면
  // 조상 체인에 절대 높이가 있어야 한다(퍼센트 높이가 0으로 붕괴하지 않도록).
  host.style.height = '300px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mountWithNestedScroller(config: SidebarLayoutConfig): Promise<{
  el: SidebarLayout;
  nested: HTMLDivElement;
}> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;

  const nested = document.createElement('div');
  nested.tabIndex = 0;
  nested.style.height = '100px';
  nested.style.overflowY = 'auto';
  const filler = document.createElement('div');
  filler.style.height = '1000px';
  nested.appendChild(filler);
  el.appendChild(nested);

  host.appendChild(el);
  await el.updateComplete;
  return { el, nested };
}

async function mountWithOverflowingMain(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;

  const filler = document.createElement('div');
  filler.style.height = '2000px';
  el.appendChild(filler);

  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const mainPart = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;

describe('SidebarLayout .main keydown — 중첩 스크롤 상자', () => {
  it('중첩 스크롤 상자에서 난 스크롤 키는 .main 을 가로채지 않는다', async () => {
    const { el, nested } = await mountWithNestedScroller({ type: 'sidebar' });
    const main = mainPart(el);

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    nested.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(main.scrollTop).toBe(0);
  });

  it('NEGATIVE: 포커스가 .main 자신일 때는 여전히 .main 을 굴린다(기존 WCAG 동작 유지)', async () => {
    const el = await mountWithOverflowingMain({ type: 'sidebar' });
    const main = mainPart(el);

    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    main.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(main.scrollTop).toBe(80);
  });
});
