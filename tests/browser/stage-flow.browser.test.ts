import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/StageFlow.js';
import type { StageFlow, StageFlowItem } from '../../src/components/StageFlow.js';

/**
 * `u-stage-flow` — counts per stage as bars on one scale, the order between stages, a toned stage that says why,
 * and stages that are links when they have somewhere to go.
 */

const ITEMS: StageFlowItem[] = [
  { label: 'Received', count: 400, description: '$626k', href: '#received' },
  { label: 'Proof sent', count: 0, description: 'none waiting', href: '#proof' },
  { label: 'Billing', count: 800, description: '$187k', tone: 'negative', note: '2.1× usual', href: '#billing' },
  { label: 'Paid', count: 200 },
];

const mount = async (items: StageFlowItem[] = ITEMS, attrs = '', width = '960px'): Promise<StageFlow> => {
  document.body.innerHTML = `<div style="width:${width}"><u-stage-flow label="Order flow" unit="orders" ${attrs}></u-stage-flow></div>`;
  const el = document.querySelector('u-stage-flow') as StageFlow;
  el.items = items;
  await el.updateComplete;
  return el;
};
const all = (el: StageFlow, sel: string) => [...el.shadowRoot!.querySelectorAll(sel)] as HTMLElement[];
const height = (e: Element) => e.getBoundingClientRect().height;

afterEach(() => { document.body.innerHTML = ''; });

describe('u-stage-flow', () => {
  it('draws each stage’s bar in proportion to the largest stage', async () => {
    const el = await mount();
    // 전환을 끝까지 기다리지 않도록 막대 전환을 끈다 — 재는 것은 최종 높이다.
    all(el, '.bar').forEach((b) => (b.style.transition = 'none'));
    const [received, proof, billing, paid] = all(el, '.bar').map(height);
    expect(billing).toBeGreaterThan(0);
    expect(received / billing).toBeCloseTo(0.5, 1);
    expect(paid / billing).toBeCloseTo(0.25, 1);
    expect(proof).toBe(0);
  });

  it('`max` puts several flows on one scale', async () => {
    const el = await mount(ITEMS, 'max="1600"');
    all(el, '.bar').forEach((b) => (b.style.transition = 'none'));
    const wells = all(el, '.well').map(height);
    const billing = height(all(el, '.bar')[2]);
    expect(billing / wells[2]).toBeCloseTo(0.5, 1);
  });

  it('a stage with an href is one link named by its label, count, description and note', async () => {
    const el = await mount();
    const links = all(el, 'a[part="stage"]');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['#received', '#proof', '#billing']);
    const name = links[2].textContent!.replace(/\s+/g, ' ').trim();
    expect(name).toContain('Billing');
    expect(name).toContain('800');
    expect(name).toContain('orders');
    expect(name).toContain('2.1× usual');
    // 링크가 없는 단계는 링크가 아니다.
    expect(all(el, 'div[part="stage"]').length).toBe(1);
  });

  it('is an ordered list with the given name; the bar is not read', async () => {
    const el = await mount();
    const list = el.shadowRoot!.querySelector('ol')!;
    expect(list.getAttribute('aria-label')).toBe('Order flow');
    expect(all(el, 'li').length).toBe(4);
    expect(all(el, '.well').every((w) => w.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('a toned stage colours its bar and figure, and says why in its note', async () => {
    const el = await mount();
    const bars = all(el, '.bar');
    const counts = all(el, '[part="count"]');
    expect(getComputedStyle(bars[2]).backgroundColor).not.toBe(getComputedStyle(bars[0]).backgroundColor);
    expect(getComputedStyle(counts[2]).color).not.toBe(getComputedStyle(counts[0]).color);
    expect(all(el, '[part="note"]').map((n) => n.textContent)).toEqual(['2.1× usual']);
  });

  it('`numbered` puts a sequence number before each label that is not part of the name', async () => {
    const el = await mount(ITEMS, 'numbered');
    const idx = all(el, '.index');
    expect(idx.map((i) => i.textContent)).toEqual(['01', '02', '03', '04']);
    expect(idx.every((i) => i.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('wraps to more rows when narrow instead of overflowing', async () => {
    const el = await mount(ITEMS, '', '260px');
    const host = el.getBoundingClientRect();
    const stages = all(el, 'li');
    expect(Math.max(...stages.map((s) => s.getBoundingClientRect().right))).toBeLessThanOrEqual(host.right + 1);
    const tops = new Set(stages.map((s) => Math.round(s.getBoundingClientRect().top)));
    expect(tops.size).toBeGreaterThan(1);
  });
});
