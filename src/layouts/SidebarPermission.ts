/**
 * 사이드바 메뉴 항목의 권한 가드. 모든 메뉴 config(link/section/group/button/html)가 확장한다.
 *
 * 판정 자체는 `SidebarLayoutConfig.hasPermission` 으로 **주입**한다 — 라이브러리는 권한 코드를
 * 불투명 문자열로만 다루고 의미(도메인)는 앱이 소유한다. `@iyulab/enterprise` 의 `hasPermission`
 * 을 그대로 넘겨 쓰는 것이 일반적이다.
 *
 * 의존성 없는 leaf 모듈 — 각 메뉴 config 파일이 순환 없이 import 한다.
 */
export interface SidebarPermissionGuard {
  /** 이 권한 코드를 보유해야 항목이 표시된다. */
  requirePermission?: string;
  /** 이 코드 중 하나라도 보유하면 표시된다(빈 배열은 제약 없음). */
  requireAnyPermission?: string[];
}
