import type { FallbackRouteConfig, FallbackRouteContext, RouteError } from '@iyulab/router';

import { EmptyState, type EmptyStateVariant } from './components/EmptyState.js';
import { getLocaleStrings } from './internals/locale.js';

/**
 * `app.load()` 에 `fallback` 을 주지 않은 앱의 라우팅 실패 화면 — 앱 프레임워크의 빈 상태 어휘로 그린다.
 *
 * 종전에는 router 의 `UErrorPage`(큰 상태 코드 화면)가 그려졌다. 셸·빈 상태 어휘를 가진 프레임워크에서 오류만
 * 남의 외형이었고, 권한 거부(403)도 «장애» 처럼 보였다.
 *
 * - 403 → `no-access`(라우트 가드의 거부) · 404 → `not-found` · 그 밖 → `error`(오류 메시지가 설명).
 * - 판정은 클래스가 아니라 **코드**로 한다 — `AccessDeniedError`·`NotFoundError` 가 403·404 를 싣고, 가드가 던진
 *   `{ status: 404 }` 류도 router 가 같은 코드의 `RouteError` 로 감싸며, `render()` 가 던진 `NotFoundError`
 *   (레코드 없음)는 router 0.21 부터 그대로 닿는다. 진단 코드(`OUTLET_MISSING` 등)는 화면에 코드로 내지 않고
 *   메시지를 설명으로 쓴다.
 * - 탭 제목은 화면 제목과 같다 — 오류 메시지(`Page not found: http://…`)는 진단이지 제목이 아니다.
 * - 소비자가 `fallback` 을 주면 그것이 그대로 이긴다(이 모듈은 쓰이지 않는다).
 */
export function variantOf(error: Pick<RouteError, 'code'>): EmptyStateVariant {
  switch (String(error.code)) {
    case '403': return 'no-access';
    case '404': return 'not-found';
    default: return 'error';
  }
}

/** 실패 화면의 제목 — 화면과 탭이 같은 말을 한다. */
function titleOf(ctx: FallbackRouteContext): string {
  const t = getLocaleStrings();
  switch (variantOf(ctx.error)) {
    case 'no-access': return t.noAccessTitle;
    case 'not-found': return t.notFoundTitle;
    default: return t.routeErrorTitle;
  }
}

/**
 * 라우팅 실패 화면 — `app.load()` 가 `fallback` 없이 쓰는 바로 그것.
 *
 * ★**왜 공개하는가**(#977): 실패를 이 패키지의 말과 모양으로 그리는 정책은 이 패키지 것인데, 종전에는 `App` 경로만
 *   받았다. `Router` 를 직접 구성하는 앱(셸을 자기 라우트 트리의 부모로 그리는 경우 등)은 매핑을 베껴야 했고, 베낀
 *   쪽은 판이 고친 것(0.47.1 의 탭 제목)을 받지 못했다. 이 값을 넘기면 판이 바뀔 때 같이 바뀐다.
 *
 * 상태가 없다 — 로캘은 그릴 때 읽는다. 일부만 바꾸려면 감싼다: `{ ...defaultFallback, render: (ctx) => … }`.
 *
 * @example
 * ```ts
 * import { defaultFallback } from '@iyulab/modern-app';
 * new Router({ root, routes, fallback: defaultFallback });
 * ```
 */
export const defaultFallback: FallbackRouteConfig = {
  title: titleOf,
  render: (ctx) => {
    const el = new EmptyState();
    el.variant = variantOf(ctx.error);
    if (el.variant === 'error') {
      // `error` 변종의 기본 제목은 목록을 말한다 — 라우트 실패는 화면 단위다.
      el.title = titleOf(ctx);
      el.description = ctx.error.message;
    }
    return el;
  },
};
