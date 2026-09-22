import type { TemplateResult } from "lit";
import type { RouteContext } from "@iyulab/router";
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

/**
 * 셸이 **자기 chrome 으로** 그리는 아이콘의 출처와 이름. 지정한 키만 기본값을 대체한다.
 *
 * 🔴**기본값은 네트워크를 타지 않는다.** `internal` 은 `@iyulab/components` 가 빌드 시점에
 * 굽는 번들이라, 폐쇄망·오프라인 배포에서도 셸 아이콘이 비지 않는다. 0.24.0 이전에는 셸의
 * 토글러 둘이 `bootstrap`(= jsdelivr CDN 조회)을 썼고, 소비자가 자기 아이콘을 전부 번들로
 * 구워 등록해도 **셸이 쓰는 것만은 그 등록을 타지 않았다.**
 *
 * ⚠**`lib` 만 바꿀 때는 이름도 함께 봐야 한다** — 기본 이름들은 `internal` 번들의 이름이고,
 * 다른 lib 이 같은 이름을 갖는다는 보장이 없다. 자기 아이콘 세트로 갈아끼울 때는 보통
 * `lib` 과 이름을 함께 준다:
 *
 * ```ts
 * icons: { lib: 'app', menu: 'list', close: 'x-lg', sidebarToggle: 'layout-sidebar' }
 * ```
 */
export interface SidebarIconsConfig {
  /** 아래 이름들을 해석할 아이콘 lib. 기본 `'internal'`(번들 — 네트워크 없음). */
  lib?: string;
  /** 모바일 헤더의 메뉴 «열기». 기본 `'menu-2'`. */
  menu?: string;
  /** 모바일 헤더의 메뉴 «닫기». 기본 `'x'`. */
  close?: string;
  /** 사이드바 접기/펼치기 토글. 기본 `'layout-sidebar'`. */
  sidebarToggle?: string;
  /** 오버레이 닫기 버튼. 기본 `'x'`. */
  overlayClose?: string;
}

/** 사이드바 레이아웃 컴포넌트의 요소(part) 타입 */
export type SidebarParts = 'host' | 'mobile-header' | 'sidebar' | 'sidebar-header' | 'sidebar-main' | 'sidebar-footer' | 'main' | 'main-content' | 'progress' | 'overlay' | 'overlay-close';

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

  /**
   * 라우트 전환이 끝날 때(`route-done`, 포커스가 메인 스크롤 컨테이너로 옮겨지기 직전)
   * 호출된다 — 새 라우트의 `RouteContext`와 그 스크롤 컨테이너(`SidebarLayout.mainElement`와
   * 동일 엘리먼트)를 받는다. 스크롤 위치를 리셋·저장·복원하는 로직은 이 훅 안에서 직접
   * 구현한다(예: 목록→상세로 갔다가 돌아올 때 스크롤 위치 복원). 미지정 시 기본값은
   * "아무것도 안 함" — Vue Router의 `scrollBehavior` 미지정 기본값과 동일하다(breaking 아님).
   */
  scrollBehavior?: (context: RouteContext, main: HTMLElement) => void;

  /**
   * 셸 chrome 아이콘의 출처·이름 오버라이드. 지정한 키만 기본값을 대체한다.
   * 기본값은 전부 `internal` 번들이라 **네트워크를 타지 않는다** — `SidebarIconsConfig` 참조.
   */
  icons?: SidebarIconsConfig;

  /** 사이드바 스타일 맵 */
  styles?: StyleMap<SidebarParts>;
}