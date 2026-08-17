import type { TemplateResult } from "lit";
import type { StyleMap } from "../internals/StyledElement";
import type { SidebarLinkConfig } from "../components/SidebarLink";
import type { SidebarSectionConfig } from "../components/SidebarSection";
import type { SidebarGroupConfig } from "../components/SidebarGroup";
import type { SidebarButtonConfig } from "../components/SidebarButton";
import type { SidebarPermissionGuard } from "./SidebarPermission";

export type { SidebarPermissionGuard } from "./SidebarPermission";
export type { SidebarLinkConfig } from "../components/SidebarLink";
export type { SidebarSectionConfig } from "../components/SidebarSection";
export type { SidebarGroupConfig } from "../components/SidebarGroup";
export type { SidebarButtonConfig } from "../components/SidebarButton";

/** 사이드바 레이아웃 컴포넌트의 요소(part) 타입 */
export type SidebarParts = 'host' | 'mobile-header' | 'sidebar' | 'sidebar-header' | 'sidebar-main' | 'sidebar-footer' | 'main' | 'progress';

/** 사이드바 상태 타입 */
export type SidebarState = 'default' | 'slim' | 'modal' | 'mobile' | 'mobile-open';

/** 사이드바 안에 HTML 또는 엘리먼트를 직접 렌더링하는 설정 */
export interface SidebarHtmlConfig extends SidebarPermissionGuard {
  type: 'html';
  render: (state: SidebarState) => TemplateResult<1> | HTMLElement | string;
}

/** 이미지 로고 설정. `href` 지정 시 클릭 시 기본 홈 이동 대신 해당 경로로 이동 */
export interface SidebarLogoImage {
  src: string;
  alt?: string;
  href?: string;
}

/** 커스텀 로고 렌더 함수. `SidebarHtmlConfig.render`와 동일한 반환 타입 */
export type SidebarLogoRenderer = (state: SidebarState) => TemplateResult<1> | HTMLElement | string;

/** 최상단 앱 로고 설정: 아이콘명(문자열, 기존 동작) | 이미지 | 커스텀 렌더 함수 */
export type SidebarLogoConfig = string | SidebarLogoImage | SidebarLogoRenderer;

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
  /** 최상단 앱 로고: 아이콘명(문자열) | 이미지({src,alt,href}) | 커스텀 렌더 함수 */
  logo?: SidebarLogoConfig;
  /** 앱 제목 */
  title?: string;
  
  /** 상단/메인 메뉴 아이템 항목들 */
  main?: SidebarItem[];
  /** 하단(footer)에 고정해서 렌더할 항목들 */
  footer?: SidebarItem[];

  /**
   * 메인 내비게이션(`<nav class="sidebar-main">`)의 접근 가능한 이름. 지정하면
   * `aria-label`로 반영돼 스크린리더가 랜드마크를 "주 메뉴" 같은 이름으로 발표한다.
   * `title`은 사이드바 헤더에 표시되는 브랜드 텍스트일 뿐 이 `<nav>`와 연결되지 않는다 —
   * 별개 값이다. 미지정 시 종전과 동일하게 랜드마크 이름이 없다(breaking 아님).
   */
  mainAriaLabel?: string;

  /**
   * 메뉴 항목 권한 필터 판정. 지정하면 `requirePermission`/`requireAnyPermission` 를 만족하지
   * 않는 항목을 숨기고, 항목이 모두 걸러진 section/group 은 통째로 숨긴다.
   * 미지정 시 필터링하지 않는다(모든 항목 표시). 보통 `@iyulab/enterprise` 의 `hasPermission` 을 넘긴다.
   */
  hasPermission?: (code: string) => boolean;

  /** 사이드바 스타일 맵 */
  styles?: StyleMap<SidebarParts>;
}