import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

/**
 * The value and the trend text of a `u-info-field` are data the app put there, whatever the page's direction. A Latin value
 * in a right-to-left page has the page as its paragraph direction, so its trailing punctuation and a leading sign jump to the
 * wrong end (`Blue Harbor Co.` read `.Blue Harbor Co`; `+3.2% MoM` read `MoM +3.2%` with the sign stranded). Each is isolated
 * (`bdi`: the text decides its own order, the box keeps its alignment). The label and the description are prose in the app's
 * language — they follow the page, and so does a slotted value (it is usually a widget, not text).
 */
let host: HTMLElement;
afterEach(() => host?.remove());

async function mount(dir: 'ltr' | 'rtl', attrs: string) {
  host = document.createElement('div');
  host.setAttribute('dir', dir);
  host.style.cssText = 'width:320px';
  host.innerHTML = `<u-info-field appearance="tile" label="Customer" ${attrs}></u-info-field>`;
  document.body.appendChild(host);
  const el = host.querySelector('u-info-field') as InfoField;
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 60));
  return el;
}

/** The text node of the part that holds `text`, inside the field's shadow root. */
function edges(el: InfoField, part: string, text: string) {
  const root = el.shadowRoot!.querySelector(`[part="${part}"]`)!;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node && node.data.trim() !== text) node = walker.nextNode() as Text | null;
  if (!node) throw new Error(`text not found in ${part}: ${text}`);
  const range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, 1);
  const first = range.getBoundingClientRect();
  range.setStart(node, node.data.length - 1);
  range.setEnd(node, node.data.length);
  const last = range.getBoundingClientRect();
  return { first: first.left, last: last.left };
}

describe('u-info-field — value and trend keep their own direction', () => {
  it('in a right-to-left page a Latin value reads left to right — the full stop stands after the last word', async () => {
    const el = await mount('rtl', 'value="Blue Harbor Co."');
    const e = edges(el, 'value', 'Blue Harbor Co.');
    expect(e.last).toBeGreaterThan(e.first); // «.Blue Harbor Co» put the dot left of the B
  });

  it('the trend text reads in its own order — the leading sign is the first thing read', async () => {
    const el = await mount('rtl', 'value="12" trend="up" trendlabel="+3.2% MoM"');
    const e = edges(el, 'trend', '+3.2% MoM');
    expect(e.first).toBeLessThan(e.last); // the «+» is at the left end of the Latin run
  });

  it('NEGATIVE: in a left-to-right page the value stands as before', async () => {
    const el = await mount('ltr', 'value="Blue Harbor Co."');
    const e = edges(el, 'value', 'Blue Harbor Co.');
    expect(e.last).toBeGreaterThan(e.first);
  });
});
