import type { FallbackRouteConfig, RouteError } from '@iyulab/router';

import { EmptyState, type EmptyStateVariant } from '../components/EmptyState.js';
import { getLocaleStrings } from './locale.js';

/**
 * `app.load()` 에 `fallback` 을 주지 않은 앱의 라우팅 실패 화면 — 앱 프레임워크의 빈 상태 어휘로 그린다.
 *
 * 종전에는 router 의 `UErrorPage`(큰 상태 코드 화면)가 그려졌다. 셸·빈 상태 어휘를 가진 프레임워크에서 오류만
 * 남의 외형이었고, 권한 거부(403)도 «장애» 처럼 보였다.
 *
 * - 403 → `no-access`(라우트 가드의 거부) · 404 → `not-found` · 그 밖 → `error`(오류 메시지가 설명).
 * - 판정은 클래스가 아니라 **코드**로 한다 — `AccessDeniedError`·`NotFoundError` 가 403·404 를 싣고, 라우트가 던진
 *   `{ status: 404 }` 류도 router 가 같은 코드의 `RouteError` 로 감싼다. 진단 코드(`OUTLET_MISSING` 등)는 화면에
 *   코드로 내지 않고 메시지를 설명으로 쓴다.
 * - 소비자가 `fallback` 을 주면 그것이 그대로 이긴다(이 모듈은 쓰이지 않는다).
 */
export function variantOf(error: Pick<RouteError, 'code'>): EmptyStateVariant {
  switch (String(error.code)) {
    case '403': return 'no-access';
    case '404': return 'not-found';
    default: return 'error';
  }
}

export const defaultFallback: FallbackRouteConfig = {
  render: (ctx) => {
    const el = new EmptyState();
    el.variant = variantOf(ctx.error);
    if (el.variant === 'error') {
      // `error` 변종의 기본 제목은 목록을 말한다 — 라우트 실패는 화면 단위다.
      el.title = getLocaleStrings().routeErrorTitle;
      el.description = ctx.error.message;
    }
    return el;
  },
};
