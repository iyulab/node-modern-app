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
    // 상자는 섀도 안 base 가 그린다(문서 리셋에 지지 않게).
    const t = getComputedStyle(part(tile, 'base')!);
    expect(t.borderTopStyle).toBe('solid');
    expect(parseFloat(t.borderTopWidth)).toBeGreaterThan(0);
    expect(parseFloat(t.borderTopLeftRadius)).toBeGreaterThan(0);
    expect(parseFloat(t.paddingTop)).toBeGreaterThan(0);
    expect(t.backgroundColor).not.toBe(transparent);
    const p = getComputedStyle(part(plain, 'base')!);
    expect(p.borderTopStyle).toBe('none');
    expect(p.paddingTop).toBe('0px');
  });

  it('a tile is a card surface — the same corner step as u-group-box', async () => {
    document.documentElement.style.setProperty('--u-radius-xl', '10px');
    document.documentElement.style.setProperty('--u-radius-lg', '6px');
    try {
      const [tile] = await mount(`<u-info-field appearance="tile" label="MTBF" value="412"></u-info-field>`);
      expect(getComputedStyle(part(tile, 'base')!).borderTopLeftRadius).toBe('10px');
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
    const w = getComputedStyle(part(warn, 'base')!);
    const c = getComputedStyle(part(calm, 'base')!);
    expect(w.backgroundColor).not.toBe(c.backgroundColor);
    expect(w.borderTopColor).not.toBe(c.borderTopColor);
  });

  it('NEGATIVE a toned plain field keeps no face — only its value text is toned', async () => {
    const [el] = await mount(`<u-info-field tone="warning" label="PM" value="71"></u-info-field>`);
    expect(getComputedStyle(el).backgroundColor).toBe(transparent);
    expect(getComputedStyle(part(el, 'base')!).backgroundColor).toBe(transparent);
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
    // a gap between the icon and the caption — held by the shadow box around the slot, so a document reset cannot remove it
    await el.updateComplete;
    const box = part(el, 'trend')!.querySelector('.trend-icon') as HTMLElement;
    expect(box.hidden).toBe(false);
    expect(parseFloat(getComputedStyle(box).marginInlineEnd)).toBeGreaterThan(0);
    // the slotted icon does not count as the value
    expect(part(el, 'value')!.textContent!.trim()).toBe('71');
  });

  it('a toned tile keeps its description at the text floor (4.5:1) on the tinted face', async () => {
    // A palette whose weaker step only clears 4.5:1 on white — the tinted faces are darker than white.
    const tokens: Record<string, string> = {
      '--u-txt-color-weak': 'rgb(102, 102, 102)',
      '--u-txt-color-weaker': 'rgb(107, 111, 117)',
      '--u-success-bg-color': 'rgb(230, 244, 234)',
      '--u-warning-bg-color': 'rgb(254, 245, 230)',
      '--u-danger-bg-color': 'rgb(253, 236, 234)',
    };
    for (const [k, v] of Object.entries(tokens)) document.documentElement.style.setProperty(k, v);
    try {
      const tiles = await mount(['positive', 'warning', 'negative'].map((tone) =>
        `<u-info-field appearance="tile" tone="${tone}" label="L" value="1" description="Why it reads so"></u-info-field>`).join(''));
      for (const tile of tiles) {
        const ratio = contrast(getComputedStyle(part(tile, 'description')!).color, getComputedStyle(part(tile, 'base')!).backgroundColor);
        expect(ratio, `${tile.getAttribute('tone')} tile description`).toBeGreaterThanOrEqual(4.5);
      }
      // An untoned tile keeps the quieter step — it stands on the plain face.
      const [plain] = await mount(`<u-info-field appearance="tile" label="L" value="1" description="d"></u-info-field>`);
      expect(getComputedStyle(part(plain, 'description')!).color).toBe('rgb(107, 111, 117)');
    } finally {
      for (const k of Object.keys(tokens)) document.documentElement.style.removeProperty(k);
    }
  });
});

function contrast(a: string, b: string): number {
  const lum = (c: string) => {
    const [r, g, bl] = c.match(/[\d.]+/g)!.map(Number).map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
