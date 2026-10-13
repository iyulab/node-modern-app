import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/ActionBar.js';

/**
 * `u-action-bar` — 상세·편집 화면의 푸터 액션 바.
 *
 * 초안(`lob-layout-primitives` R4)의 요구는 두 줄이었다:
 * *"주 액션 우측 고정, **위험 액션은 시각적으로 분리**"*.
 *
 * ## 재는 것
 *
 * ⑴**두 무리가 실제로 떨어져 있는가** — 같은 무리에 두면 «저장»을 누르려다 «삭제»를 누른다.
 *   거리가 안전장치이므로 «분리»는 취향이 아니라 **기능**이다.
 * ⑵**좁아지면 주 액션이 위로 온다** — 아래에 두면 위험 액션이 엄지 위치에 온다.
 * ⑶**위험 액션이 없으면 그 자리가 접힌다** — 빈 래퍼가 남으면 주 액션이 가운데로 밀린다.
 *
 * ⚠**실브라우저가 필요하다** — 전부 실제 좌표와 컨테이너 질의다.
 */

type Bar = HTMLElement & { updateComplete: Promise<unknown> };

const mount = async (width: number, inner: string, attrs = '') => {
  const frame = document.createElement('div');
  frame.style.width = `${width}px`;
  frame.innerHTML = `<u-action-bar ${attrs}>${inner}</u-action-bar>`;
  document.body.appendChild(frame);
  const bar = frame.querySelector('u-action-bar') as Bar;
  await bar.updateComplete;
  await new Promise(r => setTimeout(r, 60));
  return bar;
};

const rect = (bar: Bar, part: string) =>
  bar.shadowRoot!.querySelector(`[part="${part}"]`)!.getBoundingClientRect();

afterEach(() => {
  document.body.innerHTML = '';
});

describe('u-action-bar', () => {
  const FULL = `
    <button slot="danger">삭제</button>
    <button>취소</button><button>저장</button>
  `;

  it('🔴넓을 때 — 위험 액션은 왼쪽 끝, 주 액션은 오른쪽 끝 (거리가 안전장치다)', async () => {
    const bar = await mount(800, FULL);
    const danger = rect(bar, 'danger');
    const main = rect(bar, 'main');
    const host = bar.getBoundingClientRect();

    expect(danger.left).toBeCloseTo(host.left, 0);
    expect(main.right).toBeCloseTo(host.right, 0);
    expect(main.left).toBeGreaterThan(danger.right); // 실제로 떨어져 있다
  });

  it('🔴좁을 때 — 주 액션이 «위»로 온다 (엄지 위치에 위험 액션을 두지 않는다)', async () => {
    const bar = await mount(360, FULL);
    expect(rect(bar, 'main').top).toBeLessThan(rect(bar, 'danger').top);
  });

  it('위험 액션이 없으면 그 자리가 접힌다 — 주 액션은 여전히 오른쪽 끝', async () => {
    const bar = await mount(800, `<button>취소</button><button>저장</button>`);
    expect(rect(bar, 'danger').width).toBe(0);
    expect(rect(bar, 'main').right).toBeCloseTo(bar.getBoundingClientRect().right, 0);
  });

  it('`sticky` 는 스크롤 컨테이너 안에서 position: sticky 가 된다', async () => {
    const bar = await mount(800, FULL, 'sticky');
    expect(getComputedStyle(bar).position).toBe('sticky');
  });

  it('기본은 sticky 가 아니다 (스크롤 컨테이너가 없는 자리에서 예상 밖 고정을 만들지 않는다)', async () => {
    const bar = await mount(800, FULL);
    expect(getComputedStyle(bar).position).not.toBe('sticky');
  });
});

describe('u-action-bar summary', () => {
  it('sits at the leading edge and fills the space before the main actions', async () => {
    const bar = await mount(800, `<span slot="summary">1 change · Order number</span><button>Cancel</button><button>Save</button>`);
    const host = bar.getBoundingClientRect();
    const summary = rect(bar, 'summary');
    const main = rect(bar, 'main');
    expect(summary.left).toBeCloseTo(host.left, 0);
    expect(summary.right).toBeLessThanOrEqual(main.left);
    expect(main.right).toBeCloseTo(host.right, 0);
    // it takes the free width (grow), not just its text
    expect(summary.width).toBeGreaterThan(400);
  });

  it('follows the danger action, and the main actions still end the bar', async () => {
    const bar = await mount(800, `<button slot="danger">Delete</button><span slot="summary">Unsaved</span><button>Save</button>`);
    const danger = rect(bar, 'danger');
    const summary = rect(bar, 'summary');
    const main = rect(bar, 'main');
    expect(summary.left).toBeGreaterThanOrEqual(danger.right);
    expect(main.left).toBeGreaterThanOrEqual(summary.right);
  });

  it('narrow — each group on its own line, main actions on top', async () => {
    const bar = await mount(360, `<button slot="danger">Delete</button><span slot="summary">1 change</span><button>Cancel</button><button>Save</button>`);
    const summary = rect(bar, 'summary');
    expect(rect(bar, 'main').top).toBeLessThan(summary.top);
    expect(summary.top).toBeLessThan(rect(bar, 'danger').top);
  });

  it('NEGATIVE: an empty summary takes no room', async () => {
    const bar = await mount(800, `<button>Save</button>`);
    expect(rect(bar, 'summary').width).toBe(0);
  });

  it('--action-bar-padding-inline insets the groups from a sheet edge', async () => {
    const bar = await mount(800, `<span slot="summary">x</span><button>Save</button>`, 'style="--action-bar-padding-inline: 20px"');
    const host = bar.getBoundingClientRect();
    expect(rect(bar, 'summary').left).toBeCloseTo(host.left + 20, 0);
    expect(rect(bar, 'main').right).toBeCloseTo(host.right - 20, 0);
  });
});
