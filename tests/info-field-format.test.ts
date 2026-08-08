// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { Locale } from '@iyulab/components';
import '../src/components/InfoField.js';
import type { InfoField } from '../src/components/InfoField.js';

const valueText = (el: InfoField) =>
  el.shadowRoot!.querySelector('.value')!.textContent!.trim();

let els: InfoField[] = [];
const mount = async (setup: (el: InfoField) => void): Promise<InfoField> => {
  const el = document.createElement('u-info-field') as InfoField;
  setup(el);
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
};

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
  Locale.set('en');
});

describe('InfoField — format/currency', () => {
  it('format="currency" 는 지정한 통화로 렌더한다', async () => {
    Locale.set('ko');
    const el = await mount(node => { node.label = 'amount'; node.format = 'currency'; node.currency = 'KRW'; node.value = 550000; });
    expect(valueText(el)).toBe('₩550,000');
  });

  it('format="currency" 인데 currency 가 없으면 순수 숫자로 낮춰 렌더한다(크래시하지 않음)', async () => {
    const el = await mount(node => { node.label = 'amount'; node.format = 'currency'; node.value = 550000; });
    expect(valueText(el)).toBe('550,000');
  });

  it('format="number" 는 천단위 구분자를 넣는다', async () => {
    Locale.set('en');
    const el = await mount(node => { node.label = 'qty'; node.format = 'number'; node.value = 1234567; });
    expect(valueText(el)).toBe('1,234,567');
  });

  it('format="date" 는 로케일 포맷 날짜 문자열을 렌더한다', async () => {
    Locale.set('en');
    const el = await mount(node => { node.label = 'orderedAt'; node.format = 'date'; node.value = '2026-02-24'; });
    const text = valueText(el);
    expect(text).toContain('2026');
    expect(text).toContain('24');
  });

  it('값이 0이어도 blank 가 아니라 포맷된 0을 보여준다', async () => {
    Locale.set('en');
    const el = await mount(node => { node.label = 'qty'; node.format = 'number'; node.value = 0; });
    expect(valueText(el)).toBe('0');
  });

  it('format 이 없으면 종전과 동일하게 동작한다(회귀 없음)', async () => {
    const el = await mount(node => { node.label = 'name'; node.value = 'plain text'; });
    expect(valueText(el)).toBe('plain text');
  });

  it('값이 blank 이면 format 이 있어도 blank 문구를 보여준다', async () => {
    const el = await mount(node => { node.label = 'amount'; node.format = 'currency'; node.currency = 'KRW'; });
    expect(valueText(el)).toBe('—');
  });
});
