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

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('InfoField — size', () => {
  it('기본값은 "default" 다', async () => {
    const el = await mount(node => { node.label = 'amount'; node.value = 100; });
    expect(el.size).toBe('default');
  });

  it('size="lg" 를 프로퍼티로 설정하면 size 속성으로 반영된다(:host 선택자가 그것에 의존)', async () => {
    const el = await mount(node => { node.label = 'revenue'; node.value = 1000; node.size = 'lg'; });
    expect(el.getAttribute('size')).toBe('lg');
  });
});
