import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import '../../src/components/PageHeader.js';
import '../../src/components/GroupBox.js';

/**
 * **목록 화면이 320 / 768 / 1280 에서 무너지지 않는가.**
 *
 * 초안(`lob-layout-primitives` R4)이 요구한 것은 *"좁은 화면에서 **접히는 규칙**을
 * 라이브러리가 정한다"* 였다. 그 요구는 **검증할 화면이 없어서** 막혀 있었고, 이제 있다
 * (`samples/modern-app` 의 목록 화면 — 여기서는 같은 조립을 최소로 재현한다).
 *
 * ## 재는 것
 *
 * ⑴**가로 스크롤이 생기지 않는다** — 초안의 검증 문구 그대로다. LOB 화면에서 가로 스크롤은
 *   *"레이아웃이 폭을 감당하지 못한다"* 의 가장 흔한 증상이다.
 * ⑵**액션이 잘리지 않는다** — 화면 밖으로 나간 버튼은 «없는 버튼»이다.
 *
 * ⚠**실브라우저가 필요하다** — 폭에 따른 flex 줄바꿈과 실제 클라이언트 폭 계산이다.
 * jsdom 은 둘 다 0 을 준다.
 */

const WIDTHS = [320, 768, 1280];

/** 화면 조립 — 샘플의 목록 화면과 같은 형태(제목+상태+액션 / 카드 제목+툴바+본문). */
const mount = async (width: number) => {
  const frame = document.createElement('div');
  frame.style.width = `${width}px`;
  frame.innerHTML = `
    <u-page-header title="Items" subtitle="5 records">
      <span slot="status"><span>Sample</span></span>
      <span slot="actions">
        <button>Export</button><button>New item</button>
      </span>
    </u-page-header>
    <u-group-box title="All items" divider>
      <span slot="actions"><input placeholder="Search" /></span>
      <div style="height:120px">본문</div>
    </u-group-box>
  `;
  document.body.appendChild(frame);
  for (const el of frame.querySelectorAll('u-page-header, u-group-box'))
    await (el as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;
  await new Promise(r => setTimeout(r, 60));
  return frame;
};

beforeEach(() => {
  window.scrollTo(0, 0);
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('목록 화면 — 폭별 레이아웃', () => {
  for (const width of WIDTHS) {
    it(`${width}px — 가로 스크롤이 생기지 않는다`, async () => {
      const frame = await mount(width);
      const overflowing = [...frame.querySelectorAll('u-page-header, u-group-box')]
        .filter(el => el.scrollWidth > el.clientWidth + 1)
        .map(el => `${el.tagName.toLowerCase()} ${el.scrollWidth}>${el.clientWidth}`);
      expect(overflowing).toEqual([]);
    });

    it(`${width}px — 액션이 컨테이너 밖으로 나가지 않는다`, async () => {
      const frame = await mount(width);
      const box = frame.getBoundingClientRect();
      const clipped = [...frame.querySelectorAll('button, input')]
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.right > box.right + 1 || r.left < box.left - 1;
        })
        .map(el => `${el.tagName.toLowerCase()}[${(el as HTMLElement).textContent?.trim() || (el as HTMLInputElement).placeholder}]`);
      expect(clipped).toEqual([]);
    });
  }

  it('🔴320px 에서 페이지 헤더의 액션은 제목 아래로 «내려간다»', async () => {
    const frame = await mount(320);
    const header = frame.querySelector('u-page-header')!;
    const heading = header.shadowRoot!.querySelector('[part="heading"]')!.getBoundingClientRect();
    const actions = header.shadowRoot!.querySelector('[part="actions"]')!.getBoundingClientRect();
    expect(actions.top).toBeGreaterThanOrEqual(heading.bottom - 1);
  });

  it('1280px 에서는 같은 줄에 있다 (좁은 화면 규칙이 넓은 화면을 망치지 않는다)', async () => {
    const frame = await mount(1280);
    const header = frame.querySelector('u-page-header')!;
    const heading = header.shadowRoot!.querySelector('[part="heading"]')!.getBoundingClientRect();
    const actions = header.shadowRoot!.querySelector('[part="actions"]')!.getBoundingClientRect();
    expect(actions.top).toBeLessThan(heading.bottom);
  });
});
