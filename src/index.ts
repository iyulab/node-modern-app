import { app } from './App.js';

export type * from './types/AppConfigs';
export type * from './types/AppOptions';
export type * from './types/AuthConfig';
export type { SidebarPermissionGuard } from './layouts/SidebarPermission';

// 권한 기반 메뉴 필터 헬퍼(SidebarLayoutConfig.hasPermission 이 내부적으로 사용) — 재사용을 위해 노출
export { filterSidebarItems } from './layouts/filterSidebarItems.js';

// ── LOB 레이아웃 프리미티브 ───────────────────────────────────────────────
// 셸 **안쪽**(페이지 본문)의 반복 골격. 종전에는 이 자리에 제공물이 0개였고, 소비앱이
// 화면마다 같은 구조를 손으로 다시 짰다(라벨-값 그리드 41곳·카드 30여 곳이 실측된 형태).
// 등록은 side-effect 이므로 import 만으로 커스텀 엘리먼트가 정의된다.
export { PageHeader } from './components/PageHeader.js';
export { GroupBox } from './components/GroupBox.js';
export { InfoSection } from './components/InfoSection.js';
export { InfoField, isBlank } from './components/InfoField.js';
export { EmptyState } from './components/EmptyState.js';
export { ActionBar } from './components/ActionBar.js';
export { MasterDetailLayout } from './components/MasterDetailLayout.js';
export { Wizard } from './components/Wizard.js';
export type { WizardStep, WizardStepState, WizardStepChangeDetail } from './components/Wizard.js';

// 로케일 레지스트리 — 이 패키지는 범용 층이라 기본값이 **영어**다.
// 한국어 등은 소비자가 등록한다: registerLocale('ko', { back: '뒤로', … }).
export {
  registerLocale,
  setDefaultLocale,
  getLocaleStrings,
  getDefaultLocale,
} from './internals/locale.js';
export type { ModernAppLocaleStrings } from './internals/locale.js';

// `SidebarLayout`의 반응형 상태 전환(large→slim, medium→modal, small→mobile)은
// 이 클래스가 쏘는 `screen-resize` 이벤트에 전적으로 의존한다. `app.load()`가 내부적으로
// 인스턴스화하지만, `app.load()` 없이 `SidebarLayout`만 단독으로 쓰는 소비자(예: `/react`
// 서브패스)에게는 이것이 반응형을 구동할 유일한 공개 수단이다.
export { ScreenObserver } from './internals/ScreenObserver.js';
export type { ScreenSize, ScreenObserverConfig, ScreenResizeEvent } from './internals/ScreenObserver.js';

export { app };
export default app;
