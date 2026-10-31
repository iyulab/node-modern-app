import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/Wizard.js';
import '../../src/components/MasterDetailLayout.js';
import '../../src/components/EmptyState.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';
import { clickableNoise } from './clickable.js';

/**
 * A click-type listener on an element outside a handful of roles has NVDA announce «clickable» (measured — every
 * button whose host carried a listener read as «clickable, button»). Handlers are heard on the shadow root
 * (`delegate` from `@iyulab/components`); the oracle reads the listeners the browser holds (`clickable.ts`).
 */
type El = HTMLElement & { updateComplete?: Promise<unknown>; [k: string]: unknown };

afterEach(() => { document.body.innerHTML = ''; });

const settle = async (box: Element) => {
  for (let i = 0; i < 3; i++) {
    for (const el of box.querySelectorAll('*')) await (el as El).updateComplete;
    await new Promise((r) => setTimeout(r, 60));
  }
};

const noiseOf = async (el: Element) =>
  [...new Set((await clickableNoise(el)).map((n) => `${n.element} (${n.role}) ${n.types.join('+')}`))];

describe('click-type listeners screen readers would announce as «clickable»', () => {
  it('none on the wizard, master-detail layout and empty state', async () => {
    const box = document.createElement('div');
    box.innerHTML = `
      <u-wizard><div>one</div><div>two</div></u-wizard>
      <u-master-detail-layout>master<div slot="detail">detail</div></u-master-detail-layout>
      <u-empty-state variant="error"></u-empty-state>`;
    document.body.appendChild(box);
    (box.querySelector('u-wizard') as unknown as El).steps = [{ id: 'a', label: 'One' }, { id: 'b', label: 'Two' }];
    await settle(box);
    expect(await noiseOf(box)).toEqual([]);
  }, 60_000);

  it('none on the sidebar shell', async () => {
    const el = document.createElement('u-sidebar-layout') as SidebarLayout;
    el.config = {
      type: 'sidebar',
      main: [{ type: 'link', label: 'Home', href: '/' }, { type: 'button', label: 'Act', icon: 'gear', onClick: () => {} }],
    } as unknown as SidebarLayoutConfig;
    document.body.appendChild(el);
    await settle(document.body);
    expect(await noiseOf(el)).toEqual([]);
  }, 60_000);
});
