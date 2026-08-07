// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/components/InfoField.js';
import type { InfoField } from '../src/components/InfoField.js';

/**
 * `value` 가 `attribute: false` 였을 때는 `<u-info-field value="…">`(속성형)가 조용히
 * 무시됐다 — 실사용 3/3 이 그 형태로 손이 갔다는 신호를 받아 `type: String` 으로 전환했다
 * (§D-18, `L2-11-3`). 이 파일은 그 전환이 ⑴ 속성형을 실제로 동작하게 하고 ⑵ 기존
 * 프로퍼티 바인딩(숫자 등 비-문자열)을 깨지 않는지를 함께 잰다.
 */

const valueText = (el: InfoField) =>
  el.shadowRoot!.querySelector('.value')!.textContent!.trim();

let els: InfoField[] = [];
const mount = async (html: string): Promise<InfoField> => {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
  const el = host.querySelector('u-info-field') as InfoField;
  els.push(el);
  await el.updateComplete;
  return el;
};

beforeEach(() => { els = []; });
afterEach(() => { els.forEach(el => el.closest('div')?.remove()); });

describe('InfoField — value 속성/프로퍼티', () => {
  it('속성형 value="…" 가 이제 렌더된다(종전엔 attribute:false 라 무시됐다)', async () => {
    const el = await mount('<u-info-field label="a" value="42"></u-info-field>');
    expect(valueText(el)).toBe('42');
  });

  it('속성형 value="0" 은 «값 0»이지 blank 가 아니다', async () => {
    const el = await mount('<u-info-field label="a" value="0"></u-info-field>');
    expect(valueText(el)).toBe('0');
  });

  it('프로퍼티 바인딩(.value=숫자)은 그대로 동작한다 — 변환기는 속성 파싱에만 관여', async () => {
    const el = document.createElement('u-info-field') as InfoField;
    el.setAttribute('label', 'a');
    el.value = 7;
    document.body.appendChild(el);
    els.push(el);
    await el.updateComplete;
    expect(valueText(el)).toBe('7');
    expect(typeof el.value).toBe('number');
  });

  it('속성이 없으면 blank 문구다', async () => {
    const el = await mount('<u-info-field label="a"></u-info-field>');
    expect(valueText(el)).toBe('—');
  });
});
