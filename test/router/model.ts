import type { LitElement } from "lit";
import type { ComponentType } from "react";

/**
 * 인덱스 라우트는 path가 없는 라우트입니다.
 */
export type IndexRoute = {
  /**
   * 라우터의 basepath를 따르는 라우트입니다.
   */
  index: true;
  path?: undefined;
}

/**
 * 인덱스 라우트가 아닌 라우트는 path가 필수입니다.
 */
export type NonIndexRoute = {
  index?: undefined;
  /**
   * 라우터 경로는 URLPattern을 사용하여 비교합니다.
   * @example
   * - /user/:id/:name
   * - /user/:id/:name?
   * - /user/:id/:name*
   * - /user/:id/:name+
   * - /user/:id/:name{1,3}
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
   */
  path: string;
}

/**
 * 라우트 기본 타입
 * @todo: children으로 중첩된 라우트(컴포넌트안의 컴포넌트 중첩렌더링) 구현 필요(라우터 구조 변경 필요)
 */
export type BaseRoute = (NonIndexRoute | IndexRoute) & {
  /**
   * 라우터에서 사용하는 URLPattern
   */
  pattern?: URLPattern;

  /**
   * 엘리먼트 또는 컴포넌트를 렌더링하기 전에 호출되는 함수
   * @param 라우터 URL 정보
   */
  loader?: (url: RouteURL) => Promise<any>;

  /**
   * 브라우저의 타이틀이 설정에 따라 변경됩니다.
   */
  title?: string;

  /**
   * 중첩 라우트
   */
  children?: Route[];
}

/**
 * LitElement를 렌더링하는 라우트
 */
export type ElementRoute = BaseRoute & {
  /**
   * 렌더링할 LitElement
   * - LitElement 클래스 또는 태그 이름을 사용합니다.
   * @example
   * ```typescript
   * import { UserPage } from './pages';
   * const route = {
   *    path: '/user',
   *    element: 'user-page' | UserPage,
   * }
   * ```
   */
  element: typeof LitElement | string;
  component?: undefined;
}

/**
 * ReactComponent를 렌더링하는 라우트
 */
export type ComponentRoute = BaseRoute & {
  element?: undefined;
  /**
   * 렌더링할 ReactComponent
   * - ReactComponent의 모듈을 사용합니다.
   * @example
   * ```typescript
   * import { UserPage } from './pages';
   * const route = {
   *    path: '/user',
   *    component: UserPage,
   * }
   * ```
   */
  component: ComponentType;
}

/**
 * 라우트 타입
 */
export type Route = ElementRoute | ComponentRoute;

/**
 * 라우터 URL 정보
 */
export interface RouteURL {

  /**
   * 전체 URL 정보
   * - 도메인 이름을 포함한 URL의 전체 경로입니다.
   * @example https://www.iyulab.com/home/user/1?name=iyu#profile
   */
  href: string;

  /**
   * URL 도메인 이름
   * - URL의 도메인 이름입니다.
   * @example https://www.iyulab.com
   */
  origin: string;

  /**
   * 라우터 URL 전체 경로
   * - 도메인 이름을 제외한 URL의 전체 경로입니다.
   * @example /home/user/1?name=iyu#profile
   */
  path: string;

  /**
   * 라우터 URL 절대 경로
   * - 쿼리스트링과 해시를 제외한 URL 경로입니다.
   * @example /home/user/1
   */
  pathname: string;

  /**
   * 라우터 URL 파라미터
   * - URLPattern을 사용하여 파싱된 파라미터입니다.
   * @example 만약 URL이 /user/:id/:name 일경우
   * ```typescript
   * const id = params.id;
   * const name = params.name;
   * ```
   */
  params: { [key: string]: string | undefined };

  /**
   * 라우터 URL 쿼리스트링
   * - URLSearchParams를 사용하여 파싱된 쿼리스트링입니다.
   * @example 만약 URL이 ?page=1&size=10 일경우
   * ```typescript
   * const page = query.get('page');
   * const size = query.get('size');
   * ```
   */
  query: URLSearchParams;

  /**
   * 라우터 URL 해시
   * - URL의 해시값입니다. 해시값은 하나만 사용할 수 있습니다.
   * - #profile#user 두개 이상의 해시값은 하나로 취급합니다.
   * @example #profile
   */
  hash?: string;
}

/**
 * 라우터 정보
 */
export interface RouteInfo extends RouteURL {
  /**
   * 엘리먼트 또는 컴포넌트 렌더링 전에 호출되는 함수에서 반환된 데이터
   */
  data?: any;
}
