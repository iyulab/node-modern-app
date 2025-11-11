import type { StyleMap } from "../types/AppTypes";
import type { SidebarLogoConfig } from "../components/SidebarLogo";
import type { SidebarLinkConfig } from "../components/SidebarLink";
import type { SidebarSectionConfig } from "../components/SidebarSection";
import type { SidebarGroupConfig } from "../components/SidebarGroup";
import type { SidebarButtonConfig } from "../components/SidebarButton";
import type { UnsafeContentConfig } from "../components/UnsafeContent";

/** 사이드바 레이아웃 컴포넌트의 요소(part) 타입 */
export type SidebarParts = 'host' | 'sidebar' | 'sidebar-toggler' | 'sidebar-header' | 'sidebar-menu' | 'sidebar-footer' | 'main' | 'progress';

/** 사이드바 상태 타입 */
export type SidebarState = 'docked' | 'modal' | 'slim' | 'closed';

/** union: section | group | link | button */
export type SidebarItem = (
  SidebarLinkConfig | 
  SidebarSectionConfig |
  SidebarGroupConfig |
  SidebarButtonConfig |
  UnsafeContentConfig
);

/** 사이드바 전체 설정 (루트) */
export interface SidebarLayoutConfig {
  type: 'sidebar';
  /** 최상단 앱 로고 */
  logo: SidebarLogoConfig;
  /** 상단/메인 메뉴 항목들 */
  menu?: SidebarItem[];
  /** 하단(footer)에 고정해서 렌더할 항목들 */
  footer?: SidebarItem[];
  /** 사이드바 스타일 맵 */
  styles?: StyleMap<SidebarParts>;
}