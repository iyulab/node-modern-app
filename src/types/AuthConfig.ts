/**
 * 부팅 인증 게이트 설정.
 *
 * `app.load({ auth })` 에 넘기면, 앱 셸(레이아웃·라우터)을 만들기 전에 세션을 판정한다. `me()` 는
 * 세 답 중 하나(`AuthSession`)를 돌려준다:
 * - `authenticated` — 셸을 로드한다(`user` 가 `app.user` 가 된다).
 * - `anonymous` — 셸 대신 `renderLogin` 으로 로그인 UI 를 띄운다. 로그인 성공 시 `onSuccess()` 를
 *   호출하면 앱이 (재)로드되어 셸이 나타난다.
 * - `unknown` — 세션을 확인하지 못했다(서버 다운·오프라인). 미인증이 아니므로 로그인 UI 를 그리지
 *   않는다 — `renderUnavailable` 이 있으면 그것을, 없으면 `load` 가 그 오류로 실패한다. `me()` 가
 *   **던지는** 것도 같은 답이다.
 *
 * `@iyulab/enterprise` 의 `createAuthClient().fetchMe()` 가 돌려주는 `SessionState` 가 이 형태 그대로라
 * `me: () => auth.fetchMe()` 로 잇는다.
 *
 * 프레임워크는 인증의 **오케스트레이션**(판정 → 분기 → 재로드)만 소유한다. 세션 조회/로그인
 * 자체(HTTP)와 사용자·권한 형태, 세션-중 401 처리는 앱/`@iyulab/enterprise` 가 소유한다.
 */
export interface AuthGateContext {
  /** 로그인 UI 를 그릴 루트 요소(= `app.load` 의 `root`, 기본 `document.body`). */
  root: Element;
  /** 로그인 성공 시 호출한다. 앱이 (재)로드되어 셸을 띄운다(이때 `me()` 는 `authenticated` 를 돌려줘야 한다). */
  onSuccess: () => void;
}

/** `renderUnavailable` 이 받는 맥락 — 세션을 확인하지 못했을 때. */
export interface AuthGateUnavailableContext {
  /** 안내 UI 를 그릴 루트 요소(= `app.load` 의 `root`, 기본 `document.body`). */
  root: Element;
  /** `unknown` 답의 `error`, 또는 `me()` 가 던진 값. */
  error: unknown;
  /** 다시 확인한다 — 앱이 (재)로드되어 `me()` 를 다시 부른다(재시도 버튼·`online` 이벤트에서). */
  retry: () => void;
}

/**
 * 세션 조회의 답 — `status` 로 가른다. «미인증»과 «모름»은 다른 답이다: 서버가 잠깐 503 을 낸 것을
 * 미인증으로 다루면 로그인된 사용자가 로그인 화면으로 간다.
 */
export type AuthSession<TUser = unknown> =
  | { status: 'authenticated'; user: TUser }
  | { status: 'anonymous' }
  | { status: 'unknown'; error: unknown };

export interface AuthGateConfig {
  /**
   * 현재 세션 조회 — `AuthSession` 을 돌려준다(동기/비동기 모두 허용). 던지면 `unknown` 으로 본다.
   * `status` 가 셋 중 하나가 아닌 값을 돌려주면 `load` 가 `TypeError` 로 실패한다 — 사용자 객체를 그대로
   * 돌려주는 옛 형태를 «인증됨»으로 추측하지 않는다.
   */
  me: () => AuthSession | Promise<AuthSession>;

  /**
   * 미인증 시 `context.root` 에 로그인 UI 를 그린다. 성공하면 `context.onSuccess()` 를 호출해야 한다.
   * 정리 함수를 반환하면 앱 로드/`unload` 시 호출되어 로그인 UI 를 제거한다.
   */
  renderLogin: (context: AuthGateContext) => (() => void) | void;

  /**
   * 세션을 모를 때(`unknown` · `me()` 가 던짐) `context.root` 에 안내 UI 를 그린다(선택). `context.retry()` 로
   * 다시 확인한다. 정리 함수를 반환하면 앱 로드/`unload` 시 호출된다. 없으면 `load` 가 그 오류로 실패한다.
   */
  renderUnavailable?: (context: AuthGateUnavailableContext) => (() => void) | void;

  /**
   * 인증 성공 후, 앱 셸을 만들기 직전에 호출된다(선택).
   * 사용자별 라우트/메뉴 필터 등 셸 구성 전 처리를 여기서 한다.
   */
  onAuthenticated?: (user: unknown) => void | Promise<void>;
}
