import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { SidebarLayout as SidebarLayoutElement } from './layouts/SidebarLayout.js';
import { Wizard as WizardElement } from './components/Wizard.js';
import type { WizardStepChangeDetail } from './components/Wizard.js';

/**
 * React wrapper for `<u-sidebar-layout>`. Needed because `config` is an
 * `@property({ type: Object })` — plain JSX attributes serialize to strings, so this is the
 * only supported way to pass it from React.
 */
export const SidebarLayout = createComponent({
  react: React,
  tagName: 'u-sidebar-layout',
  elementClass: SidebarLayoutElement,
  events: {},
});

export type SidebarLayoutProps = React.ComponentProps<typeof SidebarLayout>;

/**
 * React wrapper for `<u-wizard>`. Needed because `steps` is an `@property({ type: Array })`.
 */
export const Wizard = createComponent({
  react: React,
  tagName: 'u-wizard',
  elementClass: WizardElement,
  events: {
    onStepChange: 'step-change' as EventName<CustomEvent<WizardStepChangeDetail>>,
  },
});

export type WizardProps = React.ComponentProps<typeof Wizard>;

export type { SidebarLayoutElement, WizardElement };
export type { SidebarLayoutConfig, SidebarItem, SidebarLogoConfig } from './layouts/SidebarLayout.types.js';
export type { WizardStep, WizardStepState, WizardStepChangeDetail } from './components/Wizard.js';
