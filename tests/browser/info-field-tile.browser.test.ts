import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

/**
 * A KPI tile grid out of `u-info-field` — `appearance="tile"` (a bordered surface), `size="xl"` (the figure read at a
 * glance), a reflected `tone` that colours the whole tile, a `trend-icon` slot, and `blank-reason` (— on the value line,
 * the reason on the line under it).
 */

const mount = async (html: string): Promise<InfoField[]> => {
  document.body.innerHTML = html;
  const els = [...document.querySelectorAll('u-info-field')] as InfoField[];
  await Promise.all(els.map((e) => e.updateComplete));
  return els;
};
const part = (el: InfoField, name: string) => el.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement | null;
const transparent = 'rgba(0, 0, 0, 0)';

afterEach(() => { document.body.innerHTML = ''; });

describe('u-info-field — tile', () => {
  it('a tile has a border, a radius, padding and a surface; plain has none', async () => {
    const [tile, plain] = await mount(`
      <u-info-field appearance="tile" label="MTBF" value="412"></u-info-field>
      <u-info-field label="MTBF" value="412"></u-info-field>`);
    const t = getComputedStyle(tile);
    expect(t.borderTopStyle).toBe('solid');
    expect(parseFloat(t.borderTopWidth)).toBeGreaterThan(0);
    expect(parseFloat(t.borderTopLeftRadius)).toBeGreaterThan(0);
    expect(parseFloat(t.paddingTop)).toBeGreaterThan(0);
    expect(t.backgroundColor).not.toBe(transparent);
    const p = getComputedStyle(plain);
    expect(p.borderTopStyle).toBe('none');
    expect(p.paddingTop).toBe('0px');
  });

  it('a tile is a card surface — the same corner step as u-group-box', async () => {
    document.documentElement.style.setProperty('--u-radius-xl', '10px');
    document.documentElement.style.setProperty('--u-radius-lg', '6px');
    try {
      const [tile] = await mount(`<u-info-field appearance="tile" label="MTBF" value="412"></u-info-field>`);
      expect(getComputedStyle(tile).borderTopLeftRadius).toBe('10px');
    } finally {
      document.documentElement.style.removeProperty('--u-radius-xl');
      document.documentElement.style.removeProperty('--u-radius-lg');
    }
  });

  it('tone reflects to the host, and a warning tile takes the warning face and border', async () => {
    const [warn, calm] = await mount(`
      <u-info-field appearance="tile" tone="warning" label="PM" value="71" unit="%"></u-info-field>
      <u-info-field appearance="tile" label="PM" value="96" unit="%"></u-info-field>`);
    expect(warn.getAttribute('tone')).toBe('warning');
    const w = getComputedStyle(warn);
    const c = getComputedStyle(calm);
    expect(w.backgroundColor).not.toBe(c.backgroundColor);
    expect(w.borderTopColor).not.toBe(c.borderTopColor);
  });

  it('NEGATIVE a toned plain field keeps no face — only its value text is toned', async () => {
    const [el] = await mount(`<u-info-field tone="warning" label="PM" value="71"></u-info-field>`);
    expect(getComputedStyle(el).backgroundColor).toBe(transparent);
  });

  it('size="xl" draws the value larger than lg', async () => {
    const [xl, lg] = await mount(`
      <u-info-field size="xl" label="A" value="412"></u-info-field>
      <u-info-field size="lg" label="A" value="412"></u-info-field>`);
    expect(parseFloat(getComputedStyle(part(xl, 'value')!).fontSize)).toBeGreaterThan(parseFloat(getComputedStyle(part(lg, 'value')!).fontSize));
  });

  it('--info-field-xl-size sets the xl figure', async () => {
    const [el] = await mount(`<u-info-field size="xl" label="A" value="412" style="--info-field-xl-size: 31px"></u-info-field>`);
    expect(getComputedStyle(part(el, 'value')!).fontSize).toBe('31px');
  });

  it('blank-reason: the dash stays at figure size, the reason goes under it', async () => {
    const [reasoned, bare] = await mount(`
      <u-info-field size="xl" label="MTTR" blank-reason="No repairs in this period"></u-info-field>
      <u-info-field size="xl" label="MTTR"></u-info-field>`);
    expect(part(reasoned, 'value')!.textContent!.trim()).toBe('—');
    expect(part(reasoned, 'description')!.textContent!.trim()).toBe('No repairs in this period');
    expect(parseFloat(getComputedStyle(part(reasoned, 'value')!).fontSize))
      .toBeGreaterThan(parseFloat(getComputedStyle(part(bare, 'value')!).fontSize));
  });

  it('NEGATIVE blank-reason is not shown once there is a value', async () => {
    const [el] = await mount(`<u-info-field size="xl" label="MTTR" value="3.2" blank-reason="No repairs"></u-info-field>`);
    expect(part(el, 'description')).toBeNull();
  });

  it('the trend-icon slot sits at the start of the trend line', async () => {
    const [el] = await mount(`
      <u-info-field appearance="tile" tone="warning" label="PM" value="71" trendlabel="Below the 90% target">
        <span slot="trend-icon" id="icon">!</span>
      </u-info-field>`);
    const slot = part(el, 'trend')!.querySelector('slot[name="trend-icon"]') as HTMLSlotElement;
    expect(slot.assignedElements()[0]?.id).toBe('icon');
    // a gap between the icon and the caption
    expect(parseFloat(getComputedStyle(document.getElementById('icon')!).marginInlineEnd)).toBeGreaterThan(0);
    // the slotted icon does not count as the value
    expect(part(el, 'value')!.textContent!.trim()).toBe('71');
  });
});
