import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/router';
import '../../src/components/SidebarLink.js';
import type { SidebarLink } from '../../src/components/SidebarLink.js';

/**
 * A link's count is read as text, so it needs the text contrast floor (4.5:1 at its 11px) on its own.
 *
 * Defect: the count was quietened with `opacity: 0.8`. Opacity mixes the text toward whatever is behind it, so the
 * count lost contrast in proportion to how weak the link colour already was — under a palette whose resting link
 * text is a mid grey (#5B5E63 on white, 6.4:1) the count fell to about 4.2:1. The count is already a type step
 * below the label; it now paints in the label's own colour, so it has the label's contrast under every palette.
 */
afterEach(() => document.body.replaceChildren());

function luminance(rgb: string): number {
  const [r, g, b] = (rgb.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('SidebarLink — count contrast', () => {
  it('paints the count in the label’s colour, at full opacity', async () => {
    const wrap = document.createElement('div');
    // A resting link colour as weak as a shipped palette's — the case that failed.
    wrap.style.cssText = 'background: rgb(255, 255, 255); color: rgb(91, 94, 99); --u-sidebar-txt-color: rgb(91, 94, 99);';
    const el = document.createElement('u-sidebar-link') as SidebarLink;
    Object.assign(el, { href: '/reviews', label: 'Reviews', count: 12 });
    wrap.appendChild(el);
    document.body.appendChild(wrap);
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('[part="label"]')!;
    const count = el.shadowRoot!.querySelector('[part="count"]')!;
    const cs = getComputedStyle(count);
    expect(cs.opacity).toBe('1');
    expect(cs.color).toBe(getComputedStyle(label).color);
    expect(ratio(cs.color, 'rgb(255, 255, 255)')).toBeGreaterThanOrEqual(4.5);
  });
});
