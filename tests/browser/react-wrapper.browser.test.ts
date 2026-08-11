// @vitest-environment happy-dom is NOT used here — this is a browser-project test (real
// Chromium via Playwright), matching every other file under tests/browser/.
import { describe, it, expect, afterEach, vi } from 'vitest';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import React from 'react';
import { SidebarLayout, Wizard, type SidebarLayoutConfig, type WizardStep, type WizardStepChangeDetail } from '../../src/react.js';
import type { Wizard as WizardElement } from '../../src/components/Wizard.js';

let container: HTMLDivElement | null = null;
let root: Root | null = null;

afterEach(() => {
  root?.unmount();
  container?.remove();
  container = null;
  root = null;
});

describe('modern-app /react wrapper', () => {
  it('passes an object prop to <u-sidebar-layout>.config, not a stringified attribute', () => {
    const config: SidebarLayoutConfig = {
      type: 'sidebar',
      title: 'Test App',
      main: [{ type: 'link', label: 'Home', href: '/' }],
    };
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    flushSync(() => {
      root!.render(React.createElement(SidebarLayout, { config }, React.createElement('div', null, 'content')));
    });
    const el = container.querySelector('u-sidebar-layout') as unknown as { config?: SidebarLayoutConfig };
    expect(el.config).toEqual(config);
  });

  it('passes an array prop to <u-wizard>.steps, not a stringified attribute', () => {
    const steps: WizardStep[] = [
      { id: 'one', label: 'One' },
      { id: 'two', label: 'Two' },
    ];
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    flushSync(() => {
      root!.render(React.createElement(Wizard, { steps, active: 0 }));
    });
    const el = container.querySelector('u-wizard') as unknown as { steps: WizardStep[] };
    expect(el.steps).toEqual(steps);
  });

  it('maps onStepChange to the step-change event, which a raw custom element would not receive', () => {
    const steps: WizardStep[] = [
      { id: 'one', label: 'One' },
      { id: 'two', label: 'Two' },
    ];
    const onStepChange = vi.fn();
    container = document.body.appendChild(document.createElement('div'));
    root = createRoot(container);
    flushSync(() => {
      root!.render(React.createElement(Wizard, { steps, active: 0, onStepChange }));
    });
    const el = container.querySelector('u-wizard') as unknown as WizardElement;
    el.next();
    expect(onStepChange).toHaveBeenCalledTimes(1);
    const event = onStepChange.mock.calls[0][0] as CustomEvent<WizardStepChangeDetail>;
    expect(event.detail).toEqual({ from: 0, to: 1 });
  });
});
