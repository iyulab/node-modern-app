// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/InfoField.js';
import type { InfoField } from '../src/components/InfoField.js';

/**
 * `tone`은 trend 유무와 무관하게 값 텍스트(`.value`)에도 적용돼야 한다 — 종전엔
 * `.trend.tone-*` CSS 규칙만 있어 `trend`를 쓰지 않는 정적 스냅샷(잔액·재고 같은
 * "정상/주의" 이분 색상)에는 `tone`을 줘도 값 텍스트 색이 전혀 바뀌지 않았다.
 */
let els: InfoField[] = [];
const mount = async (setup: (el: InfoField) => void): Promise<InfoField> => {
  const el = document.createElement('u-info-field') as InfoField;
  setup(el);
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
};
const valueEl = (el: InfoField) => el.shadowRoot!.querySelector('[part="value"]')!;

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('InfoField — tone은 trend 없이도 값 텍스트에 적용된다', () => {
  it('🔴수용 기준: trend 없이 tone="negative"만 줘도 값 텍스트가 negative 톤을 받는다', async () => {
    const el = await mount(node => {
      node.label = '미수 잔액'; node.value = '₩2,000,000'; node.tone = 'negative';
    });
    expect(valueEl(el).className).toContain('tone-negative');
  });

  it('trend 없이 tone="positive"만 줘도 값 텍스트가 positive 톤을 받는다', async () => {
    const el = await mount(node => {
      node.label = '수금 합계'; node.value = '₩1,000,000'; node.tone = 'positive';
    });
    expect(valueEl(el).className).toContain('tone-positive');
  });

  it('tone·trend 둘 다 없으면 값 텍스트는 neutral 톤(시각 효과 없음)이다', async () => {
    const el = await mount(node => { node.label = '건수'; node.value = 10; });
    expect(valueEl(el).className).toContain('tone-neutral');
  });

  it('trend가 있을 때의 기존 동작은 그대로다 — 값 텍스트도 유추된 톤을 따라간다', async () => {
    const el = await mount(node => { node.label = 'revenue'; node.value = 100; node.trend = 'up'; });
    expect(valueEl(el).className).toContain('tone-positive');
  });

  it('명시적 tone이 trend 유추보다 값 텍스트에서도 우선한다', async () => {
    const el = await mount(node => {
      node.label = 'open tickets'; node.value = 5; node.trend = 'down'; node.tone = 'positive';
    });
    expect(valueEl(el).className).toContain('tone-positive');
    expect(valueEl(el).className).not.toContain('tone-negative');
  });
});
