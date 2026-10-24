import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/AttentionList.js';
import type { AttentionList, AttentionItem } from '../../src/components/AttentionList.js';

/**
 * `u-attention-list` — one line per thing waiting on a person: an urgency rail, what and why, the count and the action
 * that goes to it. The count and the action line up across lines; a line with nothing to do stays, quieter, with no action.
 */

const ITEMS: AttentionItem[] = [
  { title: 'Late', description: 'Past the promised date — oldest 39 days', count: 14, tone: 'negative', href: '#late', action: 'Open' },
  { title: 'Due in 3 days', description: 'Ship today or it is late', count: 8, tone: 'warning', href: '#soon', action: 'Open' },
  { title: 'Quantity mismatch', count: 1234, tone: 'info', href: '#mismatch', action: 'Reconcile' },
  { title: 'Partner requests', description: 'Nothing new', count: 0, href: '#partner', action: 'Open' },
];

const mount = async (items = ITEMS, width = '640px'): Promise<AttentionList> => {
  document.body.innerHTML = `<div style="width:${width}"><u-attention-list label="Needs a person"></u-attention-list></div>`;
  const el = document.querySelector('u-attention-list') as AttentionList;
  el.items = items;
  await el.updateComplete;
  await Promise.all([...el.shadowRoot!.querySelectorAll('u-button')].map((b) => (b as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete));
  return el;
};
const all = (el: AttentionList, sel: string) => [...el.shadowRoot!.querySelectorAll(sel)] as HTMLElement[];

afterEach(() => { document.body.innerHTML = ''; });

describe('u-attention-list', () => {
  it('is a named list with one item per line', async () => {
    const el = await mount();
    expect(el.shadowRoot!.querySelector('ul')!.getAttribute('aria-label')).toBe('Needs a person');
    expect(all(el, 'li').length).toBe(4);
  });

  it('lines the counts and actions up in columns across lines', async () => {
    const el = await mount();
    const counts = all(el, '[part="count"]').map((c) => Math.round(c.getBoundingClientRect().right));
    expect(new Set(counts).size).toBe(1);
    const actions = all(el, 'u-button').map((b) => Math.round(b.getBoundingClientRect().right));
    expect(new Set(actions).size).toBe(1);
    expect(all(el, '[part="count"]')[2].textContent).toMatch(/1.?234/);
  });

  it('an action is a link to its href, named by its action', async () => {
    const el = await mount();
    const buttons = all(el, 'u-button');
    expect(buttons.map((b) => b.getAttribute('href'))).toEqual(['#late', '#soon', '#mismatch']);
    expect(buttons[0].textContent).toBe('Open');
  });

  it('colours the rail by urgency; a line with nothing to do keeps a neutral rail and has no action', async () => {
    const el = await mount();
    const rails = all(el, '[part="rail"]').map((r) => getComputedStyle(r).backgroundColor);
    expect(new Set(rails.slice(0, 3)).size).toBe(3);
    expect(rails[3]).not.toBe(rails[0]);
    const idle = all(el, 'li')[3];
    expect(idle.hasAttribute('data-idle')).toBe(true);
    expect(idle.querySelector('u-button')).toBeNull();
  });

  it('a narrow list keeps every line inside its box', async () => {
    const el = await mount(ITEMS, '300px');
    const box = el.getBoundingClientRect();
    for (const li of all(el, 'li')) expect(li.getBoundingClientRect().right).toBeLessThanOrEqual(box.right + 1);
    for (const b of all(el, 'u-button')) expect(b.getBoundingClientRect().right).toBeLessThanOrEqual(box.right + 1);
  });
});
