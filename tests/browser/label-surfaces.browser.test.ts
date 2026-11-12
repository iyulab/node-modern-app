import { describe, it, expect } from 'vitest';
import '../../src/index.js';

/**
 * Every element this package registers is mounted in a right-to-left page with a Latin value as its text. Either the value
 * keeps its own direction (the trailing full stop stands after the last word) or the element is on the list below with the
 * reason it follows the page. A new component with a one-line label slot that forgets the `bdi` isolation fails here.
 * The targets are derived (every `@customElement` in the source); the rule — which elements may follow the page — is the
 * written list. Not judged: an element whose text does not render in this bare mount (it has its own tests).
 */
const sources = import.meta.glob('../../src/**/*.ts', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const tags = new Set<string>();
for (const src of Object.values(sources)) for (const m of src.matchAll(/@customElement\(\s*['"]([^'"]+)['"]\s*\)/g)) tags.add(m[1]);

const FOLLOWS_PAGE: Record<string, string> = {
  'u-action-bar': 'container — the default slot takes action buttons',
  'u-group-box': 'content box',
  'u-info-field': 'the default slot takes value widgets, not text (the value attribute is isolated — see info-field-bidi)',
  'u-info-section': 'content box',
  'u-master-detail-layout': 'layout — the default slot takes the panes',
  'u-side-panel': 'content box',
  'u-timeline': 'container — the default slot takes timeline items',
  'u-timeline-item': 'the default slot is the item body (sentences); the heading and time are named slots',
  'u-wizard': 'container — the default slot takes steps'
};

const VALUE = 'Blue Harbor Co.';

async function probe(tag: string): Promise<'isolated' | 'reversed' | 'not-rendered'> {
  if (!customElements.get(tag)) return 'not-rendered';
  const host = document.createElement('div');
  host.setAttribute('dir', 'rtl');
  host.style.cssText = 'width:300px;padding:8px';
  host.innerHTML = `<${tag}>${VALUE}</${tag}>`;
  document.body.appendChild(host);
  try {
    const el = host.firstElementChild as HTMLElement & { updateComplete?: Promise<unknown> };
    await el.updateComplete?.catch(() => undefined);
    await new Promise((r) => setTimeout(r, 30));
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode() as Text | null;
    while (node && node.data.trim() !== VALUE) node = walker.nextNode() as Text | null;
    if (!node) return 'not-rendered';
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 1);
    const first = range.getBoundingClientRect();
    range.setStart(node, node.data.length - 1);
    range.setEnd(node, node.data.length);
    const last = range.getBoundingClientRect();
    if (first.width === 0 && last.width === 0) return 'not-rendered';
    return last.left > first.left ? 'isolated' : 'reversed';
  } finally {
    host.remove();
  }
}

describe('modern-app — every label surface keeps its value\'s direction in a right-to-left page', () => {
  it('derives its targets from the source (a non-empty set)', () => {
    expect(tags.size).toBeGreaterThan(0);
  });

  it('the follows-the-page list names only registered elements (no stale entry)', () => {
    expect([...Object.keys(FOLLOWS_PAGE)].filter((t) => !tags.has(t))).toEqual([]);
  });

  it('no element outside the follows-the-page list reverses the value', async () => {
    const reversed: string[] = [];
    for (const tag of [...tags].sort()) {
      if (tag in FOLLOWS_PAGE) continue;
      if ((await probe(tag)) === 'reversed') reversed.push(tag);
    }
    expect(reversed).toEqual([]);
  });

  it('NEGATIVE: the probe does reverse a surface that does not isolate (u-group-box)', async () => {
    expect(await probe('u-group-box')).toBe('reversed');
  });
});
