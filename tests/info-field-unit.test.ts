// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/InfoField.js';
import type { InfoField } from '../src/components/InfoField.js';

let els: InfoField[] = [];
const mount = async (setup: (el: InfoField) => void, children?: string): Promise<InfoField> => {
  const el = document.createElement('u-info-field') as InfoField;
  setup(el);
  if (children) el.innerHTML = children;
  document.body.appendChild(el);
  els.push(el);
  await el.updateComplete;
  return el;
};
const valueEl = (el: InfoField) => el.shadowRoot!.querySelector('[part="value"]') as HTMLElement;
const unitEl = (el: InfoField) => el.shadowRoot!.querySelector('[part="unit"]');

afterEach(() => {
  els.forEach(el => el.remove());
  els = [];
});

describe('InfoField — unit', () => {
  it('renders the unit after the value, inside the value part', async () => {
    const el = await mount(node => { node.label = 'Open orders'; node.value = 12; node.unit = '건'; });
    const unit = unitEl(el);
    expect(unit).not.toBeNull();
    expect(unit!.textContent).toBe('건');
    expect(valueEl(el).contains(unit)).toBe(true);
    expect(valueEl(el).textContent!.replace(/\s+/g, '')).toBe('12건');
  });

  it('follows the formatted value', async () => {
    const el = await mount(node => { node.value = 1234.5; node.format = 'number'; node.unit = 'h'; });
    expect(valueEl(el).textContent!.replace(/\s+/g, '')).toMatch(/^1,234\.5h$/);
  });

  it('keeps 0 — a zero is a value, so its unit is shown', async () => {
    const el = await mount(node => { node.value = 0; node.unit = '%'; });
    expect(unitEl(el)).not.toBeNull();
  });

  it('is hidden when the value is blank — "— 건" is not a reading', async () => {
    for (const value of [null, undefined, '', '  ']) {
      const el = await mount(node => { node.value = value; node.unit = '건'; });
      expect(unitEl(el)).toBeNull();
      expect(valueEl(el).textContent!.trim()).toBe('—');
    }
  });

  it('also follows slotted value content', async () => {
    const el = await mount(node => { node.unit = '건'; }, '<b>12</b>');
    expect(unitEl(el)).not.toBeNull();
  });

  it('renders nothing extra when unset or empty', async () => {
    for (const unit of [undefined, '']) {
      const el = await mount(node => { node.value = 12; node.unit = unit; });
      expect(unitEl(el)).toBeNull();
    }
  });

  it('reads the unit attribute', async () => {
    const el = document.createElement('u-info-field') as InfoField;
    el.setAttribute('unit', 'h');
    el.value = 3;
    document.body.appendChild(el);
    els.push(el);
    await el.updateComplete;
    expect(unitEl(el)!.textContent).toBe('h');
  });
});
