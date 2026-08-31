/**
 * React JSX 타입 선언 — `/react` `createComponent` 래퍼가 없는 raw 커스텀 엘리먼트용.
 *
 * `SidebarLayout`/`Wizard`는 Array/Object 프로퍼티(`config`/`steps`)를 갖고 있어
 * React 18의 JSX 속성 문자열화 문제 때문에 `/react` 래퍼(`react.ts`)가 필요하지만,
 * 아래 엘리먼트들은 전부 String/Number/Boolean 프로퍼티뿐이라 raw 커스텀 엘리먼트로
 * JSX에 직접 써도 안전하도록 설계됐다 — 그런데 `HTMLElementTagNameMap` 전역 선언만
 * 있고 React JSX가 실제로 참조하는 `JSX.IntrinsicElements` 증강이 없어, 소비자가 이
 * 태그들을 `.tsx`에 쓰는 순간 `TS2339`로 막혔다.
 *
 * ⚠**`declare global { namespace JSX {...} } }` 형태만으로는 이 패키지가 로컬
 * 워크스페이스에서 소비될 때(원본 `.ts` 소스가 그대로 로드되는 경로) 병합되지 않는다**
 * (실측 확인) — 반드시 `declare module 'react' { namespace JSX {...} } }` 형태를 써야
 * 실제로 인식된다. 컴파일된 `.d.ts`로 게시된 뒤에는 이 차이가 없을 수 있으나, 두 형태를
 * 동시에 내보내는 쪽이 소비 경로와 무관하게 안전하다.
 */
import type React from 'react';
import type { InfoFieldFormat, InfoFieldSize, InfoFieldTrend, InfoFieldTone } from '../components/InfoField.js';

type BaseElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

interface InfoFieldElementProps extends BaseElementProps {
  label?: string;
  value?: string;
  blank?: string;
  numeric?: boolean;
  format?: InfoFieldFormat;
  currency?: string;
  size?: InfoFieldSize;
  trend?: InfoFieldTrend;
  /** 프로퍼티는 `trendLabel`이지만 Lit 기본 속성명 규칙(소문자화, kebab 아님)상
   *  실제 HTML 속성명은 `trendlabel`이다 — 하이픈을 넣으면 반영되지 않는다. */
  trendlabel?: string;
  tone?: InfoFieldTone;
}

interface PageHeaderElementProps extends BaseElementProps {
  title?: string;
  subtitle?: string;
  back?: string;
  'back-label'?: string;
  locale?: string;
}

interface EmptyStateElementProps extends BaseElementProps {
  variant?: 'no-data' | 'no-results';
  title?: string;
  description?: string;
  locale?: string;
}

interface GroupBoxElementProps extends BaseElementProps {
  title?: string;
  divider?: boolean;
  flush?: boolean;
}

interface InfoSectionElementProps extends BaseElementProps {
  min?: number | string;
}

interface ActionBarElementProps extends BaseElementProps {
  sticky?: boolean;
}

interface MasterDetailLayoutElementProps extends BaseElementProps {
  'master-size'?: string;
  'overlay-breakpoint'?: number | string;
  locale?: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'u-info-field': InfoFieldElementProps;
      'u-page-header': PageHeaderElementProps;
      'u-empty-state': EmptyStateElementProps;
      'u-group-box': GroupBoxElementProps;
      'u-info-section': InfoSectionElementProps;
      'u-action-bar': ActionBarElementProps;
      'u-master-detail-layout': MasterDetailLayoutElementProps;
    }
  }
}
