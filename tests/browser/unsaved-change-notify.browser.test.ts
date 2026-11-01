import { describe, it, expect, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import {
  trackUnsavedChanges,
  onUnsavedChange,
  notifyUnsavedChange,
  UnsavedChangesController,
} from '../../src/unsaved.js';
import { useUnsavedChanges, useHasUnsavedChanges } from '../../src/react.js';

/**
 * **A shell can show «unsaved» without polling.** The registry only answered when asked (`hasUnsavedChanges()`), so a
 * shell drawing a dot on a document tab or a mark in the window title had to call it on a timer — running every screen's
 * check each time. `onUnsavedChange(listener)` now calls the listener when the answer changes: the registry re-checks at
 * the moments it knows (register, release, a controller host's update, `markClean()`, a hook's `dirty` change) and when a
 * screen that registered a plain check calls `notifyUnsavedChange()`. One check per tick, none while nobody listens.
 */
const tick = () => new Promise((r) => setTimeout(r, 0));
const cleanups: Array<() => void> = [];
afterEach(() => {
  for (const c of cleanups.splice(0)) c();
  document.body.replaceChildren();
});

function listen(): boolean[] {
  const heard: boolean[] = [];
  cleanups.push(onUnsavedChange((unsaved) => heard.push(unsaved)));
  return heard;
}

describe('onUnsavedChange — the function API', () => {
  it('hears register, a state change through notifyUnsavedChange, and release — each change once', async () => {
    const heard = listen();
    let dirty = false;
    const release = trackUnsavedChanges(() => dirty);
    await tick();
    expect(heard, 'a clean screen registering is no change').toEqual([]);
    dirty = true;
    notifyUnsavedChange();
    await tick();
    expect(heard).toEqual([true]);
    notifyUnsavedChange();
    await tick();
    expect(heard, 'the same answer is not repeated').toEqual([true]);
    release();
    await tick();
    expect(heard).toEqual([true, false]);
  });

  it('checks once per tick however many moments there were, and not at all while nobody listens', async () => {
    let calls = 0;
    const release = trackUnsavedChanges(() => { calls++; return false; });
    cleanups.push(release);
    calls = 0;
    notifyUnsavedChange();
    notifyUnsavedChange();
    await tick();
    expect(calls, 'no listener — no check').toBe(0);
    listen();
    calls = 0;
    notifyUnsavedChange();
    notifyUnsavedChange();
    notifyUnsavedChange();
    await tick();
    expect(calls).toBe(1);
  });
});

class NotifyForm extends LitElement {
  dirty = false;
  readonly unsaved = new UnsavedChangesController(this, () => this.dirty);
  render() { return html`<p>form</p>`; }
}
customElements.define('notify-form', NotifyForm);

describe('onUnsavedChange — UnsavedChangesController', () => {
  it('hears the host update that made it dirty, markClean, and the host leaving', async () => {
    const heard = listen();
    const form = document.body.appendChild(document.createElement('notify-form')) as NotifyForm;
    await form.updateComplete;
    await tick();
    expect(heard).toEqual([]);
    form.dirty = true;
    form.requestUpdate();
    await form.updateComplete;
    await tick();
    expect(heard).toEqual([true]);
    form.unsaved.markClean();
    await tick();
    expect(heard).toEqual([true, false]);
    form.requestUpdate();
    await form.updateComplete;
    await tick();
    expect(heard, 'the next update looks at the state again').toEqual([true, false, true]);
    form.remove();
    await tick();
    expect(heard).toEqual([true, false, true, false]);
  });
});

describe('React — useUnsavedChanges and useHasUnsavedChanges', () => {
  it('a tab marker re-renders when a form becomes dirty and when it is saved', async () => {
    let setDirty!: (v: boolean) => void;
    let markClean!: () => void;
    function Form() {
      const [dirty, set] = React.useState(false);
      setDirty = set;
      markClean = useUnsavedChanges(dirty).markClean;
      return null;
    }
    function Tab() {
      return React.createElement('span', { 'data-tab': '' }, useHasUnsavedChanges() ? '● Order' : 'Order');
    }
    const host = document.body.appendChild(document.createElement('div'));
    const root: Root = createRoot(host);
    cleanups.push(() => root.unmount());
    flushSync(() => root.render(React.createElement(React.Fragment, null, React.createElement(Tab), React.createElement(Form))));
    const tab = () => host.querySelector('[data-tab]')!.textContent;
    expect(tab()).toBe('Order');
    flushSync(() => setDirty(true));
    await tick();
    await tick();
    expect(tab()).toBe('● Order');
    markClean();
    await tick();
    await tick();
    expect(tab()).toBe('Order');
  });
});
