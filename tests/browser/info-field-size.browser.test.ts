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

  it('a unit is drawn in the supporting step, not in the value step — smaller, body weight, weak color', async () => {
    const el = await mount(node => { node.label = 'open'; node.value = 12; node.size = 'lg'; node.unit = '건'; });
    const value = getComputedStyle(valueEl(el));
    const unit = getComputedStyle(el.shadowRoot!.querySelector('[part="unit"]') as HTMLElement);
    expect(parseFloat(unit.fontSize)).toBeLessThan(parseFloat(value.fontSize));
    expect(unit.fontWeight).toBe('400');
    expect(unit.color).not.toBe(value.color);
  });

  it('a blank at size="lg" is drawn at body size — a reason sentence must fit a tile', async () => {
    const valued = await mount(node => { node.label = 'mtbf'; node.value = 120; node.size = 'lg'; });
    const blank = await mount(node => { node.label = 'mtbf'; node.size = 'lg'; node.blank = 'No downtime recorded for the failures'; });
    expect(parseFloat(getComputedStyle(valueEl(blank)).fontSize))
      .toBeLessThan(parseFloat(getComputedStyle(valueEl(valued)).fontSize));
  });

  it('…but keeps the height of a valued row, so tiles in one strip stay level', async () => {
    const valued = await mount(node => { node.label = 'mtbf'; node.value = 120; node.size = 'lg'; });
    const blank = await mount(node => { node.label = 'mtbf'; node.size = 'lg'; });
    expect(valueEl(blank).getBoundingClientRect().height)
      .toBeCloseTo(valueEl(valued).getBoundingClientRect().height, 0);
  });
});

describe('u-info-field — tone colors (computed style)', () => {
  it('tone="warning" paints the value and the trend with the theme warning color, distinct from negative', async () => {
    document.documentElement.style.setProperty('--u-warning-color-strong', 'rgb(1, 2, 3)');
    try {
      const warn = await mount(node => { node.label = 'due'; node.value = 3; node.tone = 'warning'; node.trendLabel = 'in 2 days'; });
      const neg = await mount(node => { node.label = 'over'; node.value = 3; node.tone = 'negative'; });
      expect(getComputedStyle(valueEl(warn)).color).toBe('rgb(1, 2, 3)');
      expect(getComputedStyle(warn.shadowRoot!.querySelector('[part="trend"]') as HTMLElement).color).toBe('rgb(1, 2, 3)');
      expect(getComputedStyle(valueEl(neg)).color).not.toBe('rgb(1, 2, 3)');
    } finally {
      document.documentElement.style.removeProperty('--u-warning-color-strong');
    }
  });
});
