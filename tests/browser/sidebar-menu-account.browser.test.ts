import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * An account menu at the foot of the sidebar — `type: 'menu'` with `avatar` and `description`: the avatar in place of the
 * icon, a second weaker line, an accessible name of both lines, and in a slim sidebar only the avatar.
 */

let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement('div');
  host.style.cssText = 'width:1280px;height:800px;position:relative;';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

const config = (avatar: { src?: string; initials?: string } | undefined, description?: string): SidebarLayoutConfig => ({
  type: 'sidebar',
  main: [{ type: 'link', label: 'Home', href: '/' }],
  footer: [{
    type: 'menu', icon: 'person', label: 'Kim Minji', avatar, description,
    items: [{ label: 'Change password', onClick: () => {} }, { label: 'Sign out', onClick: () => {} }],
  }],
});

async function mount(c: SidebarLayoutConfig, state?: 'slim'): Promise<HTMLElement> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = c;
  host.appendChild(el);
  await el.updateComplete;
  if (state) { el.state = state; await el.updateComplete; }
  const trigger = el.shadowRoot!.querySelector('u-sidebar-button') as HTMLElement & { updateComplete: Promise<unknown> };
  await trigger.updateComplete;
  return trigger;
}

describe("type: 'menu' — account trigger", () => {
  it('the avatar takes the icon’s place, with the initials', async () => {
    const trigger = await mount(config({ initials: 'KM' }, 'Maintenance planner'));
    const root = trigger.shadowRoot!;
    expect(root.querySelector('u-icon')).toBeNull();
    const avatar = root.querySelector('u-avatar') as HTMLElement & { label?: string };
    expect(avatar.label).toBe('KM');
    expect(avatar.getAttribute('aria-hidden')).toBe('true');
  });

  it('the description is a second, smaller line, and part of the name', async () => {
    const trigger = await mount(config({ initials: 'KM' }, 'Maintenance planner'));
    const root = trigger.shadowRoot!;
    const line = root.querySelector('.line') as HTMLElement;
    const desc = root.querySelector('[part="description"]') as HTMLElement;
    expect(desc.textContent!.trim()).toBe('Maintenance planner');
    expect(desc.getBoundingClientRect().top).toBeGreaterThan(line.getBoundingClientRect().top);
    expect(parseFloat(getComputedStyle(desc).fontSize)).toBeLessThan(parseFloat(getComputedStyle(line).fontSize));
    await expect.element(page.getByRole('button', { name: 'Kim Minji Maintenance planner' })).toBeInTheDocument();
  });

  it('slim: only the avatar shows, the name stays', async () => {
    const trigger = await mount(config({ initials: 'KM' }, 'Maintenance planner'), 'slim');
    const root = trigger.shadowRoot!;
    const label = root.querySelector('[part~="label"]') as HTMLElement;
    expect(label.getBoundingClientRect().width).toBeLessThanOrEqual(1);
    expect((root.querySelector('u-avatar') as HTMLElement).getBoundingClientRect().width).toBeGreaterThan(10);
    await expect.element(page.getByRole('button', { name: 'Kim Minji Maintenance planner' })).toBeInTheDocument();
  });

  it('NEGATIVE without avatar and description the trigger is the icon and one line, as before', async () => {
    const trigger = await mount(config(undefined));
    const root = trigger.shadowRoot!;
    expect(root.querySelector('u-avatar')).toBeNull();
    expect(root.querySelector('u-icon')).not.toBeNull();
    expect(root.querySelector('[part="description"]')).toBeNull();
  });
});
