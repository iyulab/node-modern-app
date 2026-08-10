// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/InfoField.js';
import type { InfoField } from '../src/components/InfoField.js';

let els: InfoField[] = [];
const mount = async (setup: (el: InfoField) => void): Promise<InfoField> => {
  const el = document.createElement('u-info-field') as InfoField;
  setup(el);
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
};
const trendEl = (el: InfoField) => el.shadowRoot!.querySelector('[part="trend"]');

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('InfoField — trend', () => {
  it('trend/trendLabel 둘 다 없으면 trend part 를 렌더하지 않는다', async () => {
    const el = await mount(node => { node.label = 'amount'; node.value = 100; });
    expect(trendEl(el)).toBeNull();
  });

  it('trend="up" 은 tone 을 명시하지 않으면 positive 로 유추된다', async () => {
    const el = await mount(node => { node.label = 'revenue'; node.value = 100; node.trend = 'up'; });
    expect(trendEl(el)!.className).toContain('tone-positive');
  });

  it('trend="down" 은 tone 을 명시하지 않으면 negative 로 유추된다', async () => {
    const el = await mount(node => { node.label = 'errors'; node.value = 5; node.trend = 'down'; });
    expect(trendEl(el)!.className).toContain('tone-negative');
  });

  it('trend="flat" 은 tone 을 명시하지 않으면 neutral 로 유추된다', async () => {
    const el = await mount(node => { node.label = 'users'; node.value = 100; node.trend = 'flat'; });
    expect(trendEl(el)!.className).toContain('tone-neutral');
  });

  it('🔴명시적 tone 이 trend 유추를 이긴다("미결 건수 감소"처럼 방향과 좋음이 반대인 지표)', async () => {
    const el = await mount(node => {
      node.label = 'open tickets'; node.value = 5; node.trend = 'down'; node.tone = 'positive';
    });
    expect(trendEl(el)!.className).toContain('tone-positive');
    expect(trendEl(el)!.className).not.toContain('tone-negative');
  });

  it('trendLabel 문구를 그대로 렌더한다(도메인 문구는 컴포넌트가 짓지 않는다)', async () => {
    const el = await mount(node => {
      node.label = 'revenue'; node.value = 100; node.trend = 'up'; node.trendLabel = '+12% vs last month';
    });
    expect(trendEl(el)!.textContent).toContain('+12% vs last month');
  });

  it('trendLabel 만 있고 trend 가 없으면 tone 은 neutral 로 기본된다', async () => {
    const el = await mount(node => { node.label = 'note'; node.value = 1; node.trendLabel = 'unchanged'; });
    expect(trendEl(el)).not.toBeNull();
    expect(trendEl(el)!.className).toContain('tone-neutral');
  });
});
