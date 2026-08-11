import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { SidebarLayout as SidebarLayoutElement } from './layouts/SidebarLayout.js';
import { Wizard as WizardElement } from './components/Wizard.js';
import type { WizardStepChangeDetail } from './components/Wizard.js';

/**
 * React wrapper for `<u-sidebar-layout>`. `config` is an `@property({ type: Object })` —
 * a raw custom element handles that correctly under React 19 (property assignment) but not
 * React 18 (JSX attributes stringify), so this wrapper keeps `config` working on both.
 */
export const SidebarLayout = createComponent({
  react: React,
  tagName: 'u-sidebar-layout',
  elementClass: SidebarLayoutElement,
  events: {},
});

export type SidebarLayoutProps = React.ComponentProps<typeof SidebarLayout>;

/**
 * React wrapper for `<u-wizard>`. `Wizard` dispatches a `step-change` custom event, but a raw
 * custom element in JSX maps `onStepChange` to a listener for a literal `"StepChange"` DOM
 * event — one `Wizard` never fires — so the event never reaches a consumer without this
 * wrapper's `events` mapping. `steps` is also an `@property({ type: Array })`, which the
 * wrapper keeps working on React 18 the same way it does for `SidebarLayout`'s `config`.
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
export type {
  SidebarLayoutConfig,
  SidebarItem,
  SidebarLogoConfig,
  SidebarLinkConfig,
  SidebarSectionConfig,
  SidebarGroupConfig,
  SidebarButtonConfig,
  SidebarHtmlConfig,
} from './layouts/SidebarLayout.types.js';
export type { WizardStep, WizardStepState, WizardStepChangeDetail } from './components/Wizard.js';
