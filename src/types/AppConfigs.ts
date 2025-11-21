import type { InitOptions, Module, Newable, NewableModule } from "i18next";
import type { RouteConfig, FallbackRouteConfig } from "@iyulab/router";
import type { ThemeInitOptions } from "@iyulab/components/dist/utilities/theme.js";
import type { SidebarLayoutConfig } from "../layouts/SidebarLayout.types";

/** 
 * i18next의 초기화 옵션과 플러그인 배열을 포함한 다국어 설정 
 */
export type LocalizationInitOptions = InitOptions & {
  /** 
   * i18next 플러그인 배열
   * @description i18next.use() 메서드에 전달되는 플러그인들의 배열입니다.
   */
  plugins?: (Module | NewableModule<Module> | Newable<Module>)[];
};

/** 
 * 어플리케이션 레이아웃 설정 
 */
export type LayoutConfig = (SidebarLayoutConfig) & {
  /**
   * 반응형 레이아웃 디자인을 위한 화면 크기의 브레이크포인트 설정 
   * @description 태블릿과 데스크탑의 최소 픽셀 너비를 차례로 지정합니다.
   * @default [768, 1024]
   */
  breakpoints?: [number, number];
}

/** 
 * 전체 애플리케이션 설정
 */
export interface AppConfig {
  /** 
   * 현재 애플리케이션의 기본 경로 설정 
   * @default '/'
   */
  basepath?: string;
  
  /**
   * 클라이언트 사이드 라우팅을 위한 설정 배열
   */
  routes?: RouteConfig[];

  /**
   * 라우팅 실패 시 대체 컨텐츠 설정
   */
  fallback?: FallbackRouteConfig;

  /** 
   * 애플리케이션이 렌더링될 루트 HTML 요소
   * @description 지정하지 않을 경우 document.body가 사용됩니다.
   */
  root?: Element;

  /**
   * 애플리케이션을 구성하기 위한 레이아웃 설정
   * @description 현재는 사이드바 레이아웃만 지원합니다.
   */
  layout: LayoutConfig;

  /**
   * 애플리케이션의 스타일 테마 설정
   */
  theme?: ThemeInitOptions;

  /** 
   * i18next를 사용하는 다국어 설정
   * @description i18next의 InitOptions와 플러그인 배열을 포함합니다. i18next를 사용하지 않는 경우 이 설정은 생략할 수 있습니다.
   * @see 설정에 대한 자세한 내용은 {@link https://www.i18next.com/overview/configuration-options} 참조하십시오.
   */
  localization?: LocalizationInitOptions;
}