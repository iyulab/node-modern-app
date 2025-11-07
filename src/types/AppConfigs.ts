import type { RouteConfig } from "@iyulab/router";
import type { LocalizerConfig } from "@iyulab/components/dist/utilities/localizer.js";
import type { SidebarLayoutConfig } from "../layouts/SidebarLayout.types";

/** 
 * 레이아웃 설정
 * 현재는 SidebarLayoutConfig만 지원합니다. 
 */
export type LayoutConfig = SidebarLayoutConfig;

/** 
 * 전체 애플리케이션 설정 
 */
export interface AppConfig {
  /** 라우트 베이스 경로 */
  basepath?: string;
  /** 라우트 설정 */
  routes: RouteConfig[];
  /** 레이아웃 설정 */
  layout: LayoutConfig;
  /** 화면 크기(width pixel) 브레이크포인트 [small, medium] (기본: [768, 1280]) */
  breakpoints?: [number, number];
  /** 다국어 설정 */
  locales?: LocalizerConfig;
}