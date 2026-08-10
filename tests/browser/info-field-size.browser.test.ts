import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

const mount = async (setup: (el: InfoField) => void): Promise<InfoField> => {
  const el = document.createElement('u-info-field') as InfoField;
  setup(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
};

const valueEl = (el: InfoField) => el.shadowRoot!.querySelector('[part="value"]') as HTMLElement;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('u-info-field — size="lg" (computed style)', () => {
  it('size="lg" renders the value at a larger font-size than the default', async () => {
    const defaultEl = await mount(node => { node.label = 'amount'; node.value = 100; });
    const lgEl = await mount(node => { node.label = 'revenue'; node.value = 100; node.size = 'lg'; });
    const defaultSize = parseFloat(getComputedStyle(valueEl(defaultEl)).fontSize);
    const lgSize = parseFloat(getComputedStyle(valueEl(lgEl)).fontSize);
    expect(lgSize).toBeGreaterThan(defaultSize);
  });

  it('a blank value stays visually de-emphasized even at size="lg" (regression test for the specificity bug)', async () => {
    const el = await mount(node => { node.label = 'amount'; node.size = 'lg'; });
    const weight = getComputedStyle(valueEl(el)).fontWeight;
    // body weight (400), not the lg-mode bold weight (700) — the blank state must win.
    expect(weight).toBe('400');
  });
});
