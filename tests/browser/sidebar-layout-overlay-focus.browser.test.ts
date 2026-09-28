import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import { RouteDoneEvent, type RouteContext } from '@iyulab/router';
import '@iyulab/components/dist/components/drawer/UDrawer.js';
import { LitElement, html } from 'lit';
import '@iyulab/components/dist/components/select/USelect.js';

/** A panel that is a component — its controls live in its own shadow root. */
class DetailPanel extends LitElement {
  static properties = { auto: { type: Boolean } };
  auto = false;
  render() {
    return this.auto
      ? html`<input id="first"><input id="auto" autofocus>`
      : html`<button id="b">Action</button><input id="name">`;
  }
}
customElements.define('test-detail-panel', DetailPanel);

/**
 * The overlay's keyboard contract — the shell owns it (docket iyulab/node-packages#390).
 *
 * The shell makes route content `inert` while the overlay is open. The control that opened
 * the overlay lives in that route content, so the moment it goes inert the focus it held
 * falls to `<body>`. Moving focus into the panel, putting it back on close and closing on
 * Escape are therefore the shell's to finish — not something every consumer re-implements.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mount(): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

const settle = async (el: SidebarLayout) => {
  await new Promise((r) => setTimeout(r, 0));
  await el.updateComplete;
};

/** The element that actually holds focus, through shadow roots. */
function deepActive(): Element | null {
  let a: Element | null = document.activeElement;
  while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
  return a;
}

/** Route content with a trigger button, focused — the state a user is in when they open the overlay. */
async function withFocusedTrigger(el: SidebarLayout): Promise<HTMLButtonElement> {
  const trigger = document.createElement('button');
  trigger.textContent = 'Open order';
  el.appendChild(trigger);
  await settle(el);
  trigger.focus();
  expect(deepActive()).toBe(trigger);
  return trigger;
}

async function openPanel(el: SidebarLayout, html: string): Promise<HTMLElement> {
  const panel = document.createElement('div');
  panel.slot = 'overlay';
  panel.innerHTML = html;
  el.appendChild(panel);
  await settle(el);
  return panel;
}

const closeButton = (el: SidebarLayout) =>
  el.shadowRoot!.querySelector<HTMLElement>('.overlay-close')!;

function fakeRouteContext(pathname = '/next'): RouteContext {
  return {
    href: `https://example.com${pathname}`, origin: 'https://example.com', basepath: '/',
    path: pathname, pathname, params: {}, query: new URLSearchParams(),
    progress: () => {}, metadata: {},
  };
}

describe('SidebarLayout overlay — focus moves into the panel when it opens', () => {
  it('an [autofocus] element wins', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input id="first"><button id="auto" autofocus>Go</button>');
    expect(deepActive()).toBe(panel.querySelector('#auto'));
  });

  it('otherwise the first input control', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<button id="b">Action</button><input id="name">');
    expect(deepActive()).toBe(panel.querySelector('#name'));
  });

  it('otherwise the shell\'s own close button — focus never stays on <body>', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    await openPanel(el, '<p>Read-only detail</p>');
    // u-button delegates to the native <button> in its own shadow root.
    const active = deepActive();
    expect(active === closeButton(el) || closeButton(el).shadowRoot!.contains(active)).toBe(true);
  });

  it("finds [autofocus] inside a panel component's shadow root, after its first render", async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = document.createElement('test-detail-panel') as DetailPanel;
    panel.auto = true;
    panel.slot = 'overlay';
    el.appendChild(panel);
    await panel.updateComplete;
    await settle(el);
    expect(deepActive()).toBe(panel.shadowRoot!.querySelector('#auto'));
  });

  it("finds the first input control inside a panel component's shadow root", async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = document.createElement('test-detail-panel') as DetailPanel;
    panel.slot = 'overlay';
    el.appendChild(panel);
    await panel.updateComplete;
    await settle(el);
    expect(deepActive()).toBe(panel.shadowRoot!.querySelector('#name'));
  });

  it('skips the closed popover inside a u-select that comes first', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<u-select></u-select><button id="b">Save</button><input id="auto" autofocus>');
    await settle(el);
    expect(deepActive()).toBe(panel.querySelector('#auto'));
  });

  it('leaves focus alone when the consumer already put it inside the panel', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.innerHTML = '<input id="name"><button id="mine">Mine</button>';
    el.appendChild(panel);
    // The consumer's own focus handling, done before the shell reacts (the pre-#390 contract).
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0));
    panel.querySelector<HTMLElement>('#mine')!.focus();
    await settle(el);
    expect(deepActive()).toBe(panel.querySelector('#mine'));
  });
});

describe('SidebarLayout overlay — focus returns to the trigger when it closes', () => {
  it('restores focus to the control that opened the overlay', async () => {
    const el = await mount();
    const trigger = await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input>');
    expect(deepActive()).toBe(panel.querySelector('input'));
    panel.remove();
    await settle(el);
    expect(deepActive()).toBe(trigger);
  });

  it('does not steal focus the consumer moved elsewhere while closing', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const other = document.createElement('button');
    other.textContent = 'Elsewhere';
    document.body.appendChild(other);
    try {
      const panel = await openPanel(el, '<input>');
      panel.remove();
      other.focus();
      await settle(el);
      expect(deepActive()).toBe(other);
    } finally {
      other.remove();
    }
  });

  it('with no trigger (opened programmatically), focus lands on the main scroller, not <body>', async () => {
    const el = await mount();
    (document.activeElement as HTMLElement | null)?.blur();
    const panel = await openPanel(el, '<input>');
    panel.remove();
    await settle(el);
    expect(deepActive()).toBe(el.shadowRoot!.querySelector('.main'));
  });
});

describe('SidebarLayout overlay — Escape closes it', () => {
  it('Escape inside the panel fires overlay-close', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    await openPanel(el, '<input>');
    let fired = 0;
    el.addEventListener('overlay-close', () => fired++);
    await userEvent.keyboard('{Escape}');
    await settle(el); // 셸은 디스패치가 끝난 뒤 판정한다
    expect(fired).toBe(1);
  });

  it('Escape outside the panel does not', async () => {
    const el = await mount();
    const outside = document.createElement('input');
    document.body.appendChild(outside);
    try {
      await openPanel(el, '<input>');
      outside.focus();
      let fired = 0;
      el.addEventListener('overlay-close', () => fired++);
      await userEvent.keyboard('{Escape}');
      expect(fired).toBe(0);
    } finally {
      outside.remove();
    }
  });

  it('an Escape already consumed inside the panel (an open popover) closes only that layer', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input id="i">');
    panel.querySelector('#i')!.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Escape') e.preventDefault();
    });
    let fired = 0;
    el.addEventListener('overlay-close', () => fired++);
    await userEvent.keyboard('{Escape}');
    await settle(el);
    expect(fired).toBe(0);
  });

  it('🔴a layer opened inside the panel after the overlay (u-drawer) closes first — the shell waits for it', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input id="field"><u-drawer><input id="inDrawer"></u-drawer>');
    const drawer = panel.querySelector('u-drawer') as HTMLElement & { open: boolean; updateComplete: Promise<unknown> };
    // 드로어는 오버레이가 열린 «뒤» 에 열린다 — 그 Escape 리스너가 셸보다 나중에 등록된다.
    drawer.open = true;
    await drawer.updateComplete;
    await settle(el);
    (panel.querySelector('#inDrawer') as HTMLInputElement).focus();
    let fired = 0;
    el.addEventListener('overlay-close', () => fired++);

    await userEvent.keyboard('{Escape}');
    await settle(el);
    await drawer.updateComplete;
    expect(drawer.open, 'the inner layer closes').toBe(false);
    expect(fired, 'the overlay stays').toBe(0);

    (panel.querySelector('#field') as HTMLInputElement).focus();
    await userEvent.keyboard('{Escape}');
    await settle(el);
    expect(fired, 'the next Escape closes the overlay').toBe(1);
  });

  // 패널은 층 스택의 한 층이다 — 한 번의 Escape 는 가장 위 층 하나만 닫으므로, 그것을 쓴 층이 소비를
  // 표시해도 다른 층의 판단을 오염시키지 않는다. 모든 층이 같은 계약: 층을 닫은 Escape 는 소비됐다.
  it('the Escape that closes the panel is marked consumed, like every layer', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    await openPanel(el, '<input>');
    let prevented: boolean | null = null;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') prevented = e.defaultPrevented; };
    window.addEventListener('keydown', onKey);
    try {
      await userEvent.keyboard('{Escape}');
      await settle(el);
      expect(prevented).toBe(true);
    } finally {
      window.removeEventListener('keydown', onKey);
    }
  });

  it('NEGATIVE — an Escape pressed outside the panel is declined and left unconsumed', async () => {
    const el = await mount();
    // 본문은 오버레이가 열리면 inert 라 거기에는 포커스를 둘 수 없다 — 셸 밖의 입력칸을 쓴다.
    const outside = document.createElement('input');
    document.body.appendChild(outside);
    let prevented: boolean | null = null;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') prevented = e.defaultPrevented; };
    window.addEventListener('keydown', onKey);
    try {
      await openPanel(el, '<input>');
      outside.focus();
      await userEvent.keyboard('{Escape}');
      await settle(el);
      expect(prevented).toBe(false);
    } finally {
      window.removeEventListener('keydown', onKey);
      outside.remove();
    }
  });

  it('no listener is left behind once the overlay is closed', async () => {
    const el = await mount();
    const trigger = await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input>');
    panel.remove();
    await settle(el);
    let fired = 0;
    el.addEventListener('overlay-close', () => fired++);
    trigger.focus();
    await userEvent.keyboard('{Escape}');
    expect(fired).toBe(0);
  });
});

describe('SidebarLayout overlay — a route transition underneath keeps focus in the panel', () => {
  it('route-done while the overlay is open does not pull focus to the main scroller', async () => {
    const el = await mount();
    await withFocusedTrigger(el);
    const panel = await openPanel(el, '<input id="name">');
    expect(deepActive()).toBe(panel.querySelector('#name'));
    window.dispatchEvent(new RouteDoneEvent(fakeRouteContext()));
    await settle(el);
    expect(deepActive()).toBe(panel.querySelector('#name'));
  });
});
