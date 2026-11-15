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
const mount = async (width: number, subtitle = '5 records') => {
  const frame = document.createElement('div');
  frame.style.width = `${width}px`;
  frame.innerHTML = `
    <u-page-header title="Items" subtitle="${subtitle}">
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

  /**
   * 🔴**부제가 길어도 액션은 «자기 폭 640px 이상» 이면 제목 줄 오른쪽에 선다.**
   * 제목의 flex-basis 가 `auto` 이면 부제의 한 줄 최대 폭(max-content)이 기준 폭이 되어 컨테이너를 넘고,
   * 줄이 «축소가 아니라 줄바꿈» 으로 먼저 풀려 액션이 부제 아래 왼쪽으로 떨어진다(소비자 보고 `#2664`).
   * 부제 길이만 다르고 폭은 같은 두 화면에서 단추 자리가 갈리던 것이 증상이다.
   */
  describe('긴 부제', () => {
    const LONG =
      'This list shows every record the account can see, including the ones archived last quarter, and it keeps '
      + 'going on for well over a hundred characters so that its one-line width is wider than the page body, '
      + 'and then it continues with a second clause about filters, saved views and the export that is shared with the team.';

    for (const width of [800, 1280]) {
      it(`${width}px — 부제가 한 줄 폭을 넘어도 액션은 제목 줄 오른쪽 위에 선다`, async () => {
        expect(LONG.length).toBeGreaterThan(160);
        const frame = await mount(width, LONG);
        const box = frame.getBoundingClientRect();
        const header = frame.querySelector('u-page-header')!;
        const heading = header.shadowRoot!.querySelector('[part="heading"]')!.getBoundingClientRect();
        const actions = header.shadowRoot!.querySelector('[part="actions"]')!.getBoundingClientRect();
        // 같은 줄: 액션의 위가 제목 상자 안에서 시작한다.
        expect(actions.top, `actions.top ${actions.top} < heading.bottom ${heading.bottom}`).toBeLessThan(heading.bottom);
        // 오른쪽: 액션이 제목 상자의 오른쪽에 있고 컨테이너 오른쪽 끝에 닿는다.
        expect(actions.left).toBeGreaterThanOrEqual(heading.right - 1);
        expect(box.right - actions.right).toBeLessThan(2);
      });
    }

    it('320px — 좁은 화면 규칙은 긴 부제에서도 그대로다 (액션은 아래 줄로)', async () => {
      const frame = await mount(320, LONG);
      const header = frame.querySelector('u-page-header')!;
      const heading = header.shadowRoot!.querySelector('[part="heading"]')!.getBoundingClientRect();
      const actions = header.shadowRoot!.querySelector('[part="actions"]')!.getBoundingClientRect();
      expect(actions.top).toBeGreaterThanOrEqual(heading.bottom - 1);
    });
  });
});
