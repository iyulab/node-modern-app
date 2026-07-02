import type { InitOptions, Module, Newable, NewableModule } from "i18next";
import type { RouteConfig, FallbackRouteConfig, RouteContext } from "@iyulab/router";
import type { ThemeInitOptions } from "@iyulab/components/dist/utilities/Theme.js";
import type { SidebarLayoutConfig } from "../layouts/SidebarLayout.types";

/** 
 * i18next의 초기화 옵션과 플러그인 배열을 포함한 다국어 설정 
 */
export type I18nInitOptions = InitOptions & {
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
   * 현재 애플리케이션의 기본 라우팅 경로 설정 
   * @default '/'
   */
  basepath?: string;

  /** 
   * 현재 애플리케이션의 기본 아이콘 경로 설정 
   * @default '/assets/icons/'
   */
  iconBasepath?: string;
  
  /**
   * 클라이언트 사이드 라우팅을 위한 설정 배열
   */
  routes?: RouteConfig[];

  /**
   * 라우팅 실패 시 대체 컨텐츠 설정
   */
  fallback?: FallbackRouteConfig;

  /**
   * 모든 라우트 전환 전에 호출되는 전역 인증/권한 가드입니다.
   * - `string` 반환: 해당 경로로 redirect
   * - `false` 반환: 네비게이션 취소(403)
   * - `true`/무반환: 통과
   * @example
   * ```typescript
   * app.load({
   *   enter: (ctx) => isAuthenticated() || `/login?returnTo=${encodeURIComponent(ctx.pathname)}`,
   *   routes: [
   *     { path: '/login', render: () => html`<login-page></login-page>` },
   *     // ...
   *   ],
   * });
   * ```
   */
  enter?: (ctx: RouteContext) => Promise<string | boolean> | string | boolean;

  /**
   * 초기 로드 시 현재 URL로 라우팅을 자동으로 수행할지 여부를 설정합니다.
   * @default true
   */
  initialLoad?: boolean;

  /**
   * `a` 태그 클릭 시 클라이언트 라우팅을 수행할지 여부를 설정합니다.
   * @default true
   */
  useIntercept?: boolean;

  /**
   * 애플리케이션이 렌더링될 루트 HTML 요소
   * @default document.body
   */
  root?: Element;

  /**
   * 애플리케이션을 구성하기 위한 레이아웃 설정
   * 
   * @description 현재는 사이드바 레이아웃만 지원합니다.
   */
  layout: LayoutConfig;

  /**
   * 애플리케이션의 스타일 테마 설정
   */
  theme?: ThemeInitOptions;

  /** 
   * i18next의 InitOptions와 플러그인 배열을 포함합니다. i18next를 사용하지 않는 경우 이 설정은 생략할 수 있습니다.
   * @see 설정에 대한 자세한 내용은 {@link https://www.i18next.com/overview/configuration-options} 참조하십시오.
   */
  i18n?: I18nInitOptions;
}