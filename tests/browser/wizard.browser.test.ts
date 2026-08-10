import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/Wizard.js';
import type { Wizard, WizardStepChangeDetail } from '../../src/components/Wizard.js';

/**
 * Real-render checks for the parts a source read cannot confirm: keyboard-only
 * completion, focus moving to the panel on step change, and the live-region
 * announcement actually updating. jsdom/happy-dom never move real focus, so all
 * three only exist here (cycle-268's Reflection note on the master-detail-layout
 * work applies here too).
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
});
afterEach(() => host.remove());

const settle = async () => {
  await new Promise(r => requestAnimationFrame(() => r(null)));
  await new Promise(r => setTimeout(r, 0));
};

const partOf = (el: Element, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`);
const stepsOf = (el: Element) =>
  [...el.shadowRoot!.querySelectorAll<HTMLElement>('[part="step"]')];

const mount = async (setup: (el: Wizard) => void): Promise<Wizard> => {
  const el = document.createElement('u-wizard') as Wizard;
  setup(el);
  host.appendChild(el);
  await el.updateComplete;
  return el;
};

const threeSteps = [
  { id: 'a', label: 'Info' },
  { id: 'b', label: 'Payment' },
  { id: 'c', label: 'Review' },
];

describe('u-wizard — step panels', () => {
  it('shows only the active step\'s light-DOM child, hides the rest', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    el.innerHTML = `<div>info panel</div><div>payment panel</div><div>review panel</div>`;
    await settle();
    const [a, b, c] = [...el.children] as HTMLElement[];
    expect(a.hidden).toBe(false);
    expect(b.hidden).toBe(true);
    expect(c.hidden).toBe(true);
  });

  it('following active moves the visible panel', async () => {
    const el = await mount(node => { node.steps = threeSteps; node.active = 1; });
    el.innerHTML = `<div>info panel</div><div>payment panel</div><div>review panel</div>`;
    await settle();
    const [a, b] = [...el.children] as HTMLElement[];
    expect(a.hidden).toBe(true);
    expect(b.hidden).toBe(false);
  });
});

describe('u-wizard — step-change (cancelable)', () => {
  it('advances on next() and fires step-change with {from, to}', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    let detail: WizardStepChangeDetail | undefined;
    el.addEventListener('step-change', (e) => { detail = (e as CustomEvent<WizardStepChangeDetail>).detail; });
    const advanced = el.next();
    await settle();
    expect(advanced).toBe(true);
    expect(el.active).toBe(1);
    expect(detail).toEqual({ from: 0, to: 1 });
  });

  it('preventDefault() on step-change blocks the transition', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    el.addEventListener('step-change', (e) => e.preventDefault());
    const advanced = el.next();
    await settle();
    expect(advanced).toBe(false);
    expect(el.active).toBe(0);
  });

  it('back() does not go below the first step', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    expect(el.back()).toBe(false);
    expect(el.active).toBe(0);
  });

  it('next() does nothing on the last step (no next() button rendered either)', async () => {
    const el = await mount(node => { node.steps = threeSteps; node.active = 2; });
    await settle();
    expect(el.next()).toBe(false);
    // only the Back button should be in the default actions slot at the last step
    const buttons = el.shadowRoot!.querySelectorAll('[part="actions"] u-button');
    expect(buttons.length).toBe(1);
  });
});

describe('u-wizard — linear reachability', () => {
  it('linear (default): clicking an unvisited future step does not navigate', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    await settle();
    stepsOf(el)[2].click();
    await settle();
    expect(el.active).toBe(0);
  });

  it('linear: a step explicitly marked done is reachable out of order', async () => {
    const steps = [
      { id: 'a', label: 'Info', state: 'done' as const },
      { id: 'b', label: 'Payment' },
      { id: 'c', label: 'Review' },
    ];
    const el = await mount(node => { node.steps = steps; node.active = 1; });
    await settle();
    stepsOf(el)[0].click();
    await settle();
    expect(el.active).toBe(0);
  });

  it('linear=false: any non-disabled step is reachable directly', async () => {
    const el = await mount(node => { node.steps = threeSteps; node.linear = false; });
    await settle();
    stepsOf(el)[2].click();
    await settle();
    expect(el.active).toBe(2);
  });

  it('a step marked disabled is never reachable, even with linear=false', async () => {
    const steps = [
      { id: 'a', label: 'Info' },
      { id: 'b', label: 'Payment', state: 'disabled' as const },
      { id: 'c', label: 'Review' },
    ];
    const el = await mount(node => { node.steps = steps; node.linear = false; });
    await settle();
    stepsOf(el)[1].click();
    await settle();
    expect(el.active).toBe(0);
    expect(stepsOf(el)[1].hasAttribute('disabled')).toBe(true);
  });
});

describe('u-wizard — accessibility', () => {
  it('moves focus to the panel after a step change', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    await settle();
    el.next();
    await settle();
    expect(document.activeElement).toBe(el);
    expect(el.shadowRoot!.activeElement).toBe(partOf(el, 'panel'));
  });

  it('updates the live-region announcement on step change', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    await settle();
    const live = el.shadowRoot!.querySelector('[aria-live="polite"]')!;
    expect(live.textContent!.trim()).toBe('');
    el.next();
    await settle();
    expect(live.textContent!.trim()).toBe('Step 2 of 3: Payment');
  });

  it('ArrowDown moves focus to the next reachable tab without changing the active step', async () => {
    const steps = [
      { id: 'a', label: 'Info', state: 'done' as const },
      { id: 'b', label: 'Payment', state: 'done' as const },
      { id: 'c', label: 'Review' },
    ];
    const el = await mount(node => { node.steps = steps; node.active = 2; });
    await settle();
    const tabs = stepsOf(el);
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true, cancelable: true }));
    await settle();
    expect(el.shadowRoot!.activeElement).toBe(tabs[1]);
    expect(el.active).toBe(2); // focus moved, selection did not
  });

  it('reflects aria-selected/tabindex to the active tab only', async () => {
    const el = await mount(node => { node.steps = threeSteps; node.active = 1; });
    await settle();
    const tabs = stepsOf(el);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
  });
});

describe('u-wizard — actions slot override', () => {
  // ⚠Fallback content inside a <slot> stays present in the shadow tree even when the slot
  // has real assigned nodes — querying shadowRoot directly would find the built-in buttons
  // regardless. What actually changes is which nodes the slot *flattens to* — check that.
  const actionsSlot = (el: Wizard) =>
    el.shadowRoot!.querySelector('slot[name="actions"]') as HTMLSlotElement;

  it('with no override, the default Back/Next buttons are what the slot flattens to', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    await settle();
    const flattened = actionsSlot(el).assignedNodes({ flatten: true });
    expect(flattened.some(n => (n as HTMLElement).tagName === 'U-BUTTON')).toBe(true);
  });

  it('a slotted actions element fully replaces the default Back/Next buttons', async () => {
    const el = await mount(node => { node.steps = threeSteps; });
    const custom = document.createElement('button');
    custom.slot = 'actions';
    custom.textContent = 'Custom';
    el.appendChild(custom);
    await settle();
    const flattened = actionsSlot(el).assignedNodes({ flatten: true });
    expect(flattened).toEqual([custom]);
    expect(flattened.some(n => (n as HTMLElement).tagName === 'U-BUTTON')).toBe(false);
  });
});
