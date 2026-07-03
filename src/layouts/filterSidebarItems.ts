import type { SidebarItem } from './SidebarLayout.types';
import type { SidebarPermissionGuard } from './SidebarPermission';

/** 단일 항목이 권한 가드를 통과하는지 판정한다. */
function passesGuard(guard: SidebarPermissionGuard, hasPermission: (code: string) => boolean): boolean {
  if (guard.requirePermission && !hasPermission(guard.requirePermission)) return false;
  if (guard.requireAnyPermission && guard.requireAnyPermission.length > 0) {
    if (!guard.requireAnyPermission.some((c) => hasPermission(c))) return false;
  }
  return true;
}

/**
 * 권한에 따라 사이드바 메뉴 트리를 필터링한다. 소비앱이 손으로 짜던 `filterMenu` 를 표준화.
 *
 * - 각 항목의 `requirePermission`/`requireAnyPermission` 를 `hasPermission` 으로 검사해 탈락 항목 제거.
 * - `section`/`group` 은 자식(`items`)을 재귀 필터하고, **자식이 모두 걸러지면 컨테이너째 제거**한다.
 * - `hasPermission` 이 없으면(undefined) 원본을 그대로 반환한다(필터링 없음).
 *
 * 원본 배열/항목을 변형하지 않고 새 배열/얕은 복제본을 반환한다(순수).
 */
export function filterSidebarItems(
  items: readonly SidebarItem[],
  hasPermission?: (code: string) => boolean,
): SidebarItem[] {
  if (!hasPermission) return items as SidebarItem[];
  const check = hasPermission;

  const result: SidebarItem[] = [];
  for (const item of items) {
    if (!item) continue;
    if (!passesGuard(item, check)) continue;

    if (item.type === 'section' || item.type === 'group') {
      const children = filterSidebarItems(item.items as SidebarItem[], check);
      // 자식이 모두 걸러진 컨테이너는 숨긴다.
      if (children.length === 0) continue;
      result.push({ ...item, items: children } as SidebarItem);
    } else {
      result.push(item);
    }
  }
  return result;
}
