import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/router';
import '../../src/components/SidebarLink.js';
import '../../src/components/SidebarButton.js';
import '../../src/components/SidebarGroup.js';
import '../../src/components/SidebarSection.js';

/**
 * An expanded sidebar shows every item name in full.
 *
 * Defect: the names were one line with `text-overflow: ellipsis` and no tooltip or title, so a name longer than the
 * sidebar — a long translated menu name, 200% text, or the WCAG 1.4.12 text-spacing overrides — lost its tail
 * («Voice, tone & accessibil…») with no way to read the rest. Names now wrap; a name that fits stays one line, and the
 * collapsed (icon-only) sidebar still hides the name visually.
 */
afterEach(() => document.body.replaceChildren());

const LONG = 'Voice, tone and accessibility guidelines for every screen';

async function mount<T extends HTMLElement & { updateComplete: Promise<boolean> }>(
  tag: string,
  props: Record<string, unknown>,
): Promise<T> {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width: 180px;';
  const el = document.createElement(tag) as T;
  Object.assign(el, props);
  wrap.appendChild(el);
  document.body.appendChild(wrap);
  await el.updateComplete;
  return el;
}

function part(el: HTMLElement, selector: string): HTMLElement {
  const found = el.shadowRoot!.querySelector<HTMLElement>(selector);
  if (!found) throw new Error(`no ${selector}`);
  return found;
}

/** Nothing of the text is cut off: the box is as wide as its content and is not narrowed by an ellipsis. */
function expectNotClipped(text: HTMLElement) {
  expect(text.scrollWidth).toBeLessThanOrEqual(text.clientWidth + 1);
  expect(getComputedStyle(text).textOverflow).not.toBe('ellipsis');
}

describe('sidebar item names wrap instead of being cut', () => {
  it('u-sidebar-link shows a long name in full over several lines', async () => {
    const el = await mount('u-sidebar-link', { href: '/voice', label: LONG, icon: 'chat' });
    const label = part(el, '[part="label"]');
    expectNotClipped(label);
    const lineHeight = parseFloat(getComputedStyle(label).lineHeight);
    expect(label.getBoundingClientRect().height).toBeGreaterThan(lineHeight * 1.5);
  });

  it('u-sidebar-link keeps a name that fits on one line, at the same row height', async () => {
    const short = await mount('u-sidebar-link', { href: '/home', label: 'Home', icon: 'house' });
    const label = part(short, '[part="label"]');
    const lineHeight = parseFloat(getComputedStyle(label).lineHeight);
    expect(label.getBoundingClientRect().height).toBeLessThan(lineHeight * 1.5);
  });

  it('u-sidebar-link in the collapsed sidebar still hides the name visually', async () => {
    const el = await mount('u-sidebar-link', { href: '/voice', label: LONG, icon: 'chat', compact: true });
    const rect = part(el, '[part="label"]').getBoundingClientRect();
    expect(rect.width).toBeLessThanOrEqual(1);
    expect(rect.height).toBeLessThanOrEqual(1);
  });

  it('u-sidebar-group shows a long name in full', async () => {
    const el = await mount('u-sidebar-group', { label: LONG, icon: 'folder' });
    expectNotClipped(part(el, '.label'));
  });

  it('u-sidebar-button shows a long name and description in full', async () => {
    const el = await mount('u-sidebar-button', { label: LONG, icon: 'gear' });
    expectNotClipped(part(el, '[part="label"]'));
    const two = await mount('u-sidebar-button', { label: LONG, description: LONG, avatar: { initials: 'K' } });
    expectNotClipped(part(two, '.line'));
    expectNotClipped(part(two, '.description'));
  });

  it('u-sidebar-section shows a long title in full', async () => {
    const el = await mount('u-sidebar-section', { mainTitle: LONG });
    expectNotClipped(part(el, '.title'));
  });
});
