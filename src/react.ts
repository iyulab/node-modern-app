import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { SidebarLayout as SidebarLayoutElement, type SidebarLayoutEventMap } from './layouts/SidebarLayout.js';
import { Wizard as WizardElement } from './components/Wizard.js';
import type { WizardEventMap } from './components/Wizard.js';
import type { GroupBoxLevel } from './components/GroupBox.js';
import type { InfoFieldFormat, InfoFieldSize, InfoFieldTrend, InfoFieldTone } from './components/InfoField.js';

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
  events: {
    onOverlayClose: 'overlay-close' as EventName<SidebarLayoutEventMap['overlay-close']>,
  },
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
    onStepChange: 'step-change' as EventName<WizardEventMap['step-change']>,
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

// React JSX.IntrinsicElements 증강 — 래퍼 없이 원시 태그를 JSX 에 쓰는 소비자를 위한 것이다.
// ⚠**주 엔트리가 아니라 이 서브패스에 둔다**: `react` 는 optional peer 라, 주 엔트리 선언에
// 두면 React 없는 TS 소비자가 `skipLibCheck: false` 에서 `TS2307` 로 깨진다(2026-10-06 실측).
// ⚠**같은 파일 안에 둔다**: 다른 파일을 side-effect 타입 import 로 끌어오면 선언 번들러가
// 그 import 를 «미사용» 으로 지워 증강이 소비자에게 닿지 않는다(0.18.9 → 0.18.10 실측).
// 원시 태그만 쓰는 소비자는 프로그램 어딘가에서 한 번 `import type {} from '@iyulab/modern-app/react'`.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'u-action-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        sticky?: boolean;
      };
      'u-empty-state': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        variant?: 'no-data' | 'no-results';
        title?: string;
        description?: string;
        locale?: string;
      };
      'u-group-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        title?: string;
        divider?: boolean;
        flush?: boolean;
        level?: GroupBoxLevel;
        meta?: string;
        description?: string;
      };
      'u-info-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        /** 클래스 필드와 동일하게 `unknown` — 렌더 로직이 `String(value)`/포맷터로 무엇이
         *  오든 처리하므로 `null`·숫자를 그대로 넘길 수 있다(`InfoField.value` 의 JSDoc 참조). */
        value?: unknown;
        blank?: string;
        numeric?: boolean;
        format?: InfoFieldFormat;
        currency?: string;
        unit?: string;
        size?: InfoFieldSize;
        trend?: InfoFieldTrend;
        /** 프로퍼티는 `trendLabel`이지만 Lit 기본 속성명 규칙(소문자화, kebab
         *  아님)상 실제 HTML 속성명은 `trendlabel`이다. */
        trendlabel?: string;
        tone?: InfoFieldTone;
      };
      'u-info-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        min?: number | string;
      };
      'u-master-detail-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'master-size'?: string;
        'overlay-breakpoint'?: number | string;
        locale?: string;
      };
      'u-page-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        title?: string;
        subtitle?: string;
        eyebrow?: string;
        back?: string;
        'back-label'?: string;
        locale?: string;
      };
    }
  }
}
