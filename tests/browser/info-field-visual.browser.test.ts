import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

/**
 * `visual` 슬롯 — 지표 타일의 값 옆 작은 그림(추세 미니 차트 · 진행 고리).
 *
 * 계기: 업무 앱 시안의 지표 카드가 큰 숫자 옆에 추세 선을 그렸는데 `u-info-field` 에는 그 자리가 없었다. 차트를 이 요소가
 * 그리지 않는다 — 그림은 앱(또는 u-widgets)의 것이고, 이 요소는 «값 옆의 자리» 만 준다.
 */
const mount = async (html: string): Promise<InfoField[]> => {
  document.body.innerHTML = html;
  const els = [...document.querySelectorAll('u-info-field')] as InfoField[];
  await Promise.all(els.map((e) => e.updateComplete));
  await new Promise((r) => requestAnimationFrame(r));
  return els;
};
const part = (el: InfoField, name: string) => el.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement;

afterEach(() => { document.body.innerHTML = ''; });

describe('u-info-field — visual slot', () => {
  it('그림은 값과 같은 줄의 끝에 놓이고, 값은 그대로 값이다', async () => {
    const [el] = await mount(`
      <u-info-field appearance="tile" size="xl" label="입고" value="48" style="width: 260px">
        <svg slot="visual" aria-hidden="true" width="96" height="32"><rect width="96" height="32"/></svg>
      </u-info-field>`);
    const value = part(el, 'value').getBoundingClientRect();
    const visual = part(el, 'visual').getBoundingClientRect();
    expect(part(el, 'value').textContent?.trim()).toBe('48');
    expect(visual.width).toBeGreaterThanOrEqual(96);
    expect(visual.left).toBeGreaterThanOrEqual(value.right - 1);
    // 같은 줄 — 그림의 아래 끝이 값 줄 안에 있다.
    expect(visual.bottom).toBeLessThanOrEqual(value.bottom + 1);
    expect(visual.bottom).toBeGreaterThan(value.top);
  });

  it('NEGATIVE: 그림이 없으면 그 상자를 그리지 않는다 — 값 옆에 간격이 남지 않는다', async () => {
    const [el] = await mount(`<u-info-field appearance="tile" label="입고" value="48"></u-info-field>`);
    expect(part(el, 'visual').getClientRects().length).toBe(0);
  });

  it('NEGATIVE: visual 슬롯의 자식은 값으로 세지 않는다 — value 가 그대로 그려진다', async () => {
    const [el] = await mount(`
      <u-info-field label="입고" value="48"><span slot="visual" aria-hidden="true">~</span></u-info-field>`);
    expect(part(el, 'value').textContent?.trim()).toBe('48');
  });
});
