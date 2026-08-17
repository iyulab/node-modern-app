import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { SidebarLayout as SidebarLayoutElement } from './layouts/SidebarLayout.js';
import { Wizard as WizardElement } from './components/Wizard.js';
import type { WizardStepChangeDetail } from './components/Wizard.js';

// `SidebarLayout`을 `app.load()` 없이 이 서브패스만으로 단독 마운트하는 소비자를 위한
// 반응형 구동 수단 — `SidebarLayout`의 large→slim/medium→modal/small→mobile 전환은
// 이 클래스가 쏘는 `screen-resize` 이벤트에 전적으로 의존하며, `app.load()` 경로 밖에서는
// 이것이 유일한 공개 진입점이다(예: `useEffect`에서 생성하고 정리 시 `destroy()`).
export { ScreenObserver } from './internals/ScreenObserver.js';
export type { ScreenSize, ScreenObserverConfig, ScreenResizeEvent } from './internals/ScreenObserver.js';

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
