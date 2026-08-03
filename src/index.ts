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

export { app };
export default app;
