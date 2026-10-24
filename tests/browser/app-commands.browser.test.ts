import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { app } from '../../src/App.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { UCommandPalette } from '@iyulab/components/dist/components/command-palette/UCommandPalette.js';
import { parseShortcut } from '../../src/internals/commands.js';

/**
 * `app.load({ commands })` — the shell's command palette. A «Find» button heads the sidebar; `mod+k` opens it except
 * inside an edit field; the screens group is the sidebar's links after the permission filter (one source of truth);
 * the app adds domain sources; choosing an item with `href` goes there with `app.navigate`, one with `run` runs it;
 * recent items are opt-in.
 */
const settle = async (ms = 40) => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, ms));
};
const startPath = window.location.pathname + window.location.search;
const mac = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
const MOD = mac ? 'Meta' : 'Control';

let root: HTMLElement | undefined;
afterEach(() => {
  app.unload();
  root?.remove();
  history.replaceState(null, '', startPath);
  try { localStorage.removeItem('modern-app:commands:recent:/'); } catch { /* */ }
});

async function load(commands: Record<string, unknown> | undefined, extra: Record<string, unknown> = {}) {
  history.replaceState(null, '', startPath);
  root = document.createElement('div');
  root.style.height = '500px';
  document.body.appendChild(root);
  await app.load({
    root,
    routerMode: 'hash',
    initialLoad: false,
    layout: {
      type: 'sidebar',
      hasPermission: (code: string) => code !== 'admin',
      main: [
        { type: 'link', label: 'Orders', href: '/orders', icon: 'list' },
        { type: 'group', label: 'Settings', items: [
          { type: 'link', label: 'Users', href: '/users', requirePermission: 'admin' },
          { type: 'link', label: 'Profile', href: '/profile' },
        ] },
      ],
    },
    routes: [
      { path: '/orders', render: () => 'orders' },
      { path: '/profile', render: () => 'profile' },
      { path: '/orders/:id', render: () => 'order' },
    ],
    commands,
    ...extra,
  } as Parameters<typeof app.load>[0]);
  const layout = root.querySelector('u-sidebar-layout') as SidebarLayout;
  await layout.updateComplete;
  return layout;
}

const palette = () => root!.querySelector('u-command-palette') as UCommandPalette | null;
const labels = (p: UCommandPalette) => [...p.shadowRoot!.querySelectorAll('.option-label')].map((n) => n.textContent);
const groupLabels = (p: UCommandPalette) => [...p.shadowRoot!.querySelectorAll('.group-label')].map((n) => n.textContent);

describe('app.load({ commands })', () => {
  it('without commands there is no palette and no Find button', async () => {
    const layout = await load(undefined);
    expect(palette()).toBeNull();
    expect(layout.shadowRoot!.querySelector('u-sidebar-button')).toBeNull();
  });

  it('the Find button opens it; screens are the sidebar links the user may see', async () => {
    const layout = await load({});
    const find = layout.shadowRoot!.querySelector('u-sidebar-button')!;
    expect(find.getAttribute('label') ?? (find as unknown as { label: string }).label).toBe('Find');
    (find.shadowRoot!.querySelector('button') as HTMLButtonElement).click();
    await settle(80);
    const p = palette()!;
    expect(p.open).toBe(true);
    expect(groupLabels(p)).toEqual(['Screens']);
    expect(labels(p)).toEqual(['Orders', 'Profile']);
  });

  it('the dialog is named like the Find button that opens it', async () => {
    await load({});
    app.showCommands();
    await settle(80);
    const p = palette()!;
    expect(p.getAttribute('aria-label')).toBe('Find');
    expect(p.shadowRoot!.querySelector('[role="combobox"]')!.getAttribute('aria-label')).toBe('Find');
  });

  it('mod+K opens it — but not from inside an edit field', async () => {
    await load({});
    const field = document.createElement('input');
    root!.appendChild(field);
    field.focus();
    await userEvent.keyboard(`{${MOD}>}k{/${MOD}}`);
    await settle();
    expect(palette()!.open).toBe(false);
    field.blur();
    document.body.focus();
    await userEvent.keyboard(`{${MOD}>}k{/${MOD}}`);
    await settle(80);
    expect(palette()!.open).toBe(true);
  });

  it('shortcut: false — only the Find button opens it', async () => {
    await load({ shortcut: false });
    await userEvent.keyboard(`{${MOD}>}k{/${MOD}}`);
    await settle();
    expect(palette()!.open).toBe(false);
  });

  it('choosing a screen navigates there; an app item with run runs it', async () => {
    let ran = 0;
    await load({
      sources: [{ id: 'actions', label: 'Actions', search: () => [{ id: 'new', label: 'New order', run: () => { ran++; } }] }],
    });
    app.showCommands();
    await settle(80);
    const p = palette()!;
    expect(groupLabels(p)).toEqual(['Screens', 'Actions']);
    await userEvent.keyboard('profile');
    await settle(250);
    await userEvent.keyboard('{Enter}');
    await settle(80);
    expect(location.hash).toBe('#/profile');
    app.showCommands();
    await settle(80);
    await userEvent.keyboard('new');
    await settle(250);
    await userEvent.keyboard('{Enter}');
    await settle(80);
    expect(ran).toBe(1);
  });

  it('recent: chosen items come first for the empty query, after a reload too', async () => {
    await load({
      recent: true,
      sources: [{ id: 'orders', label: 'Order records', search: (q: string) => (q ? [{ id: '7', label: 'Order 7', href: '/orders/7' }] : []) }],
    });
    app.showCommands();
    await settle(80);
    await userEvent.keyboard('7');
    await settle(250);
    await userEvent.keyboard('{Enter}');
    await settle(80);
    expect(location.hash).toBe('#/orders/7');
    app.unload();
    root!.remove();
    await load({ recent: true });
    app.showCommands();
    await settle(80);
    const p = palette()!;
    expect(groupLabels(p)[0]).toBe('Recent');
    expect(labels(p)[0]).toBe('Order 7');
  });

  it('recent is off by default', async () => {
    await load({});
    app.showCommands();
    await settle(80);
    expect(groupLabels(palette()!)).not.toContain('Recent');
  });
});

describe('parseShortcut', () => {
  it('reads modifier+key and rejects unknown modifiers', () => {
    const ctrlShiftP = parseShortcut('ctrl+shift+p')!;
    expect(ctrlShiftP(new KeyboardEvent('keydown', { key: 'P', ctrlKey: true, shiftKey: true }))).toBe(true);
    expect(ctrlShiftP(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true }))).toBe(false);
    expect(parseShortcut('hyper+k')).toBeNull();
  });
});
