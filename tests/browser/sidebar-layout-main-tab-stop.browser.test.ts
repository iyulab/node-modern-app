import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * The shell's content region is a Tab stop only when it scrolls and holds nothing reachable by Tab — the browser's
 * own rule for scrollers (Chrome 130 "keyboard focusable scrollers").
 *
 * Defect: the region carries `tabindex="-1"` for programmatic focus (skip link, route change), and a negative
 * tabindex is that rule's explicit opt-out. A long screen with no controls — a document, a notice — could not be
 * scrolled by a keyboard user who tabbed past it (axe `scrollable-region-focusable`). A screen with controls keeps
 * `-1`: the scroll keys work from those controls, and an extra stop would only be noise (NEGATIVE cases).
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
afterEach(() => document.body.replaceChildren());

async function mount(content: string): Promise<SidebarLayout> {
  const host = document.createElement('div');
  host.style.height = '400px';
  document.body.appendChild(host);
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  el.innerHTML = content;
  host.appendChild(el);
  await el.updateComplete;
  await sleep(200);
  return el;
}

const main = (el: SidebarLayout) => el.shadowRoot!.querySelector<HTMLElement>('.main')!;
const longText = `<article>${'<p>Paragraph of reading text.</p>'.repeat(80)}</article>`;

describe('shell content region tab stop', () => {
  it('a long screen with nothing to Tab to — the region is a Tab stop', async () => {
    const el = await mount(longText);
    expect(main(el).getAttribute('tabindex')).toBe('0');
  });

  it('content that grows later is judged again', async () => {
    const el = await mount('<article id="a"><p>Short.</p></article>');
    expect(main(el).getAttribute('tabindex')).toBe('-1');
    el.querySelector('#a')!.innerHTML = '<p>Paragraph of reading text.</p>'.repeat(80);
    await sleep(200);
    expect(main(el).getAttribute('tabindex')).toBe('0');
  });

  it('NEGATIVE — a long screen with a control keeps -1', async () => {
    const el = await mount(`${longText}<button>Save</button>`);
    expect(main(el).getAttribute('tabindex')).toBe('-1');
  });

  it('NEGATIVE — a short screen keeps -1', async () => {
    const el = await mount('<p>Short.</p>');
    expect(main(el).getAttribute('tabindex')).toBe('-1');
  });

  it('NEGATIVE — a control inside a component shadow root counts', async () => {
    class WithButton extends HTMLElement {
      connectedCallback() { this.attachShadow({ mode: 'open' }).innerHTML = '<button>Edit</button>'; }
    }
    if (!customElements.get('test-with-button')) customElements.define('test-with-button', WithButton);
    const el = await mount(`${longText}<test-with-button></test-with-button>`);
    expect(main(el).getAttribute('tabindex')).toBe('-1');
  });
});
