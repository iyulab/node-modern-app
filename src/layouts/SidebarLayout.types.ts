import type { TemplateResult } from "lit";
import type { StyleMap } from "../internals/StyledElement";
import type { SidebarLinkConfig } from "../components/SidebarLink";
import type { SidebarSectionConfig } from "../components/SidebarSection";
import type { SidebarGroupConfig } from "../components/SidebarGroup";
import type { SidebarButtonConfig } from "../components/SidebarButton";

/** 사이드바 레이아웃 컴포넌트의 요소(part) 타입 */
export type SidebarParts = 'host' | 'mobile-header' | 'sidebar' | 'sidebar-header' | 'sidebar-main' | 'sidebar-footer' | 'main' | 'progress';

/** 사이드바 상태 타입 */
export type SidebarState = 'default' | 'slim' | 'modal' | 'mobile' | 'mobile-open';

/** 사이드바 안에 HTML 또는 엘리먼트를 직접 렌더링하는 설정 */
export interface SidebarHtmlConfig {
  type: 'html';
  render: (state: SidebarState) => TemplateResult<1> | HTMLElement | string;
}

/** union: section | group | link | button */
export type SidebarItem = (
  SidebarLinkConfig | 
  SidebarSectionConfig |
  SidebarGroupConfig |
  SidebarButtonConfig |
  SidebarHtmlConfig
);

/** 사이드바 레이아웃 전체 설정 */
export interface SidebarLayoutConfig {
  type: 'sidebar';
  /** 최상단 앱 로고 */
  logo?: string;
  /** 앱 제목 */
  title?: string;
  
  /** 상단/메인 메뉴 아이템 항목들 */
  main?: SidebarItem[];
  /** 하단(footer)에 고정해서 렌더할 항목들 */
  footer?: SidebarItem[];
  
  /** 사이드바 스타일 맵 */
  styles?: StyleMap<SidebarParts>;
}