import type { RouteConfig } from "@iyulab/router";

// Navigation Item 타입
export interface NavItemConfig {
  /** 아이콘 이름 */
  icon?: string;
  /** 네비게이션 아이템 레이블 */
  label: string;
  /** 라우트 경로 */
  path?: string;
  /** 하위 네비게이션 아이템들 */
  children?: NavItemConfig[];
  /** 구분선 표시 여부 */
  divider?: boolean;
}

// Button Config 타입
export interface ButtonConfig {
  /** 아이콘 이름 */
  icon?: string;
  /** 버튼 레이블 */
  label: string;
  /** 클릭 액션 */
  onClick?: (event: MouseEvent) => void;
}

// Sidebar 설정 인터페이스
export interface SidebarConfig {
  /** 로고 이미지 URL 또는 템플릿 */
  logo?: string;
  /** 앱 타이틀 */
  title?: string;
  /** 사이드바 너비 (기본: 260px) */
  width?: number;
  /** collapse 가능 여부 (기본: true) */
  collapsible?: boolean;
  /** 기본 collapsed 상태 (기본: false) */
  defaultCollapsed?: boolean;
  /** 네비게이션 아이템들 */
  navItems?: NavItemConfig[];
  /** 하단 버튼들 */
  buttons?: ButtonConfig[];
}

// 앱 설정 인터페이스
export interface AppConfig {
  /** 베이스 경로 */
  basepath?: string;
  /** 라우트 설정 */
  routes: RouteConfig[];
  /** 다국어 설정 */
  locales?: {
    defaultLanguage?: string;
    fallbackLanguage?: string;
    resources?: Record<string, any>;
  };
  /** 레이아웃 설정 */
  layout?: SidebarConfig;
  /** 화면 크기 브레이크포인트 [small, medium] (기본: [768, 1280]) */
  breakpoints?: [number, number];
}