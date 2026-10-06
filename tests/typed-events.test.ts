// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import '../src/components/Wizard.js';
import '../src/components/MasterDetailLayout.js';
import '../src/layouts/SidebarLayout.js';

/**
 * Listeners on the three elements that dispatch custom events get their maps' detail types — before,
 * `addEventListener('step-change', …)` gave a plain `Event`. The assignments are the test:
 * `npm run typecheck` fails if the overloads stop applying.
 */
describe('typed events', () => {
  it('u-wizard step-change carries WizardStepChangeDetail', () => {
    const wizard = document.createElement('u-wizard');
    const moves: Array<[number, number]> = [];
    wizard.addEventListener('step-change', (e) => {
      const from: number = e.detail.from;
      const to: number = e.detail.to;
      moves.push([from, to]);
    });
    wizard.dispatchEvent(new CustomEvent('step-change', { detail: { from: 0, to: 1 } }));
    expect(moves).toEqual([[0, 1]]);
  });

  it('detail-close and overlay-close are typed as detail-less CustomEvents', () => {
    const layout = document.createElement('u-master-detail-layout');
    const shell = document.createElement('u-sidebar-layout');
    let seen = 0;
    layout.addEventListener('detail-close', (e) => {
      const detail: null = e.detail;
      void detail;
      seen++;
    });
    shell.addEventListener('overlay-close', (e) => {
      const detail: null = e.detail;
      void detail;
      seen++;
    });
    layout.dispatchEvent(new CustomEvent('detail-close', { detail: null }));
    shell.dispatchEvent(new CustomEvent('overlay-close', { detail: null }));
    expect(seen).toBe(2);
  });
});
