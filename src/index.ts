import { app } from './App.js';

export type * from './types/AppConfigs';
export type * from './types/AppOptions';
export type * from './types/AuthConfig';
export type { SidebarPermissionGuard } from './layouts/SidebarPermission';

// 권한 기반 메뉴 필터 헬퍼(SidebarLayoutConfig.hasPermission 이 내부적으로 사용) — 재사용을 위해 노출
export { filterSidebarItems } from './layouts/filterSidebarItems.js';

export { app };
export default app;
