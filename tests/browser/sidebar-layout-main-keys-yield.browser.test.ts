import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * The content area's scroll keys (Space · PageUp/Down · Home/End · ↑/↓) yield to a control that owns
 * the key — pressed with real keys.
 *
 * The shortcut skipped text fields only. With focus on a button, Space scrolled the page by a screen
 * and the button never fired; with focus in a widget that uses the arrows itself (a tree, a menu, a
 * radio group, a grid), each arrow moved inside the widget *and* scrolled the content by a step.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '300px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(content: HTMLElement) {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  const filler = document.createElement('div');
  filler.style.height = '2000px';
  el.append(content, filler);
  host.appendChild(el);
  await el.updateComplete;
  const main = el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;
  return { el, main };
}

describe('SidebarLayout content scroll keys yield to the focused control', () => {
  it('Space on a button presses the button and does not scroll', async () => {
    const button = document.createElement('button');
    button.textContent = 'Save';
    let clicks = 0;
    button.addEventListener('click', () => clicks++);
    const { main } = await mount(button);
    button.focus();
    await userEvent.keyboard(' ');
    expect(clicks).toBe(1);
    expect(main.scrollTop).toBe(0);
  });

  it('an arrow a widget handled itself (preventDefault) does not also scroll the content', async () => {
    const widget = document.createElement('div');
    widget.tabIndex = 0;
    widget.setAttribute('role', 'listbox');
    let moves = 0;
    widget.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moves++; }
    });
    const { main } = await mount(widget);
    widget.focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    expect(moves).toBe(2);
    expect(main.scrollTop).toBe(0);
  });

  it('NEGATIVE: with focus on plain content, Space and ArrowDown still scroll the content', async () => {
    const text = document.createElement('div');
    text.tabIndex = -1;
    text.textContent = 'text';
    const { main } = await mount(text);
    text.focus();
    await userEvent.keyboard('{ArrowDown}');
    const afterArrow = main.scrollTop;
    expect(afterArrow).toBeGreaterThan(0);
    await userEvent.keyboard(' ');
    expect(main.scrollTop).toBeGreaterThan(afterArrow);
  });
});
