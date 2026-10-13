import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/InfoSection.js';
import '../../src/components/InfoField.js';

/**
 * `u-info-section layout="strip"` — 지표 띠. 결과의 합계를 칸으로: 한 면 위에 1px 구분선으로 나뉜 칸들이
 * 전부 나란히, 아니면 전부 쌓인다(띠 폭 640px 미만). 들쭉날쭉한 줄(셋 + 하나)은 만들지 않는다.
 *
 * ⚠실브라우저가 필요하다 — 전부 실제 좌표다.
 */

type El = HTMLElement & { updateComplete: Promise<unknown> };

const STATS = `
  <u-info-field label="Orders" value="962" description="1,764,211 units"></u-info-field>
  <u-info-field label="Invoiced" value="₩761,234,820" description="Settled ₩743,188,120"></u-info-field>
  <u-info-field label="Due in 7 days" value="14" tone="warning" description="3 not started"></u-info-field>
  <u-info-field label="Overdue" value="₩0" tone="negative" description="0 orders"></u-info-field>
`;

const mount = async (width: number, attrs: string) => {
  const frame = document.createElement('div');
  frame.style.width = `${width}px`;
  frame.innerHTML = `<u-info-section ${attrs}>${STATS}</u-info-section>`;
  document.body.appendChild(frame);
  const section = frame.querySelector('u-info-section') as El;
  await section.updateComplete;
  await Promise.all([...frame.querySelectorAll('u-info-field')].map((f) => (f as El).updateComplete));
  await new Promise((r) => setTimeout(r, 30));
  return { section, cells: [...frame.querySelectorAll('u-info-field')] as El[] };
};

afterEach(() => {
  document.body.innerHTML = '';
});

describe('u-info-section layout="strip"', () => {
  it('wide — all cells on one line, split by 1px dividers', async () => {
    const { cells } = await mount(900, 'layout="strip"');
    const rects = cells.map((c) => c.getBoundingClientRect());
    expect(new Set(rects.map((r) => Math.round(r.top))).size).toBe(1);
    for (let i = 1; i < rects.length; i++) {
      expect(rects[i].left - rects[i - 1].right).toBeCloseTo(1, 0);
    }
  });

  it('narrower than 640px — every cell stacked, full width (never three plus one)', async () => {
    const { section, cells } = await mount(560, 'layout="strip"');
    const inner = section.shadowRoot!.querySelector('[part="grid"]')!.getBoundingClientRect();
    const rects = cells.map((c) => c.getBoundingClientRect());
    expect(new Set(rects.map((r) => Math.round(r.left))).size).toBe(1);
    for (const r of rects) expect(r.width).toBeCloseTo(inner.width - 2, 0);
    for (let i = 1; i < rects.length; i++) {
      expect(rects[i].top - rects[i - 1].bottom).toBeCloseTo(1, 0);
    }
  });

  it('the strip is one bordered surface; each cell is padded on it', async () => {
    const { section, cells } = await mount(900, 'layout="strip"');
    const grid = getComputedStyle(section.shadowRoot!.querySelector('[part="grid"]')!);
    expect(grid.borderTopWidth).toBe('1px');
    expect(parseFloat(getComputedStyle(cells[0]).paddingLeft)).toBeGreaterThan(0);
  });

  it('NEGATIVE: the default grid keeps its gaps and no surface', async () => {
    const { section, cells } = await mount(900, '');
    const grid = getComputedStyle(section.shadowRoot!.querySelector('[part="grid"]')!);
    expect(grid.display).toBe('grid');
    expect(grid.borderTopWidth).toBe('0px');
    expect(parseFloat(getComputedStyle(cells[0]).paddingLeft)).toBe(0);
  });
});

describe('u-info-field description', () => {
  it('renders a supporting line below the value', async () => {
    const { cells } = await mount(900, 'layout="strip"');
    const root = cells[0].shadowRoot!;
    const value = root.querySelector('[part="value"]')!.getBoundingClientRect();
    const description = root.querySelector('[part="description"]')!;
    expect(description.textContent).toBe('1,764,211 units');
    expect(description.getBoundingClientRect().top).toBeGreaterThanOrEqual(value.bottom);
  });

  it('NEGATIVE: no description, no line', async () => {
    const frame = document.createElement('div');
    frame.innerHTML = '<u-info-field label="A" value="1"></u-info-field>';
    document.body.appendChild(frame);
    const field = frame.querySelector('u-info-field') as El;
    await field.updateComplete;
    expect(field.shadowRoot!.querySelector('[part="description"]')).toBeNull();
  });
});
