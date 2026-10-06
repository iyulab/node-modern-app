/**
 * 부팅 인증 게이트 설정.
 *
 * `app.load({ auth })` 에 넘기면, 앱 셸(레이아웃·라우터)을 만들기 전에 세션을 판정한다:
 * `me()` 가 값을 반환하면 인증된 것으로 보고 셸을 로드하고, `null`/`undefined` 면
 * 미인증으로 보고 `renderLogin` 으로 로그인 UI 를 띄운다. 로그인 성공 시 `onSuccess()` 를
 * 호출하면 앱이 (재)로드되어 셸이 나타난다. `me()` 가 **던지면** 세션을 «모름»(서버 다운·오프라인)
 * 으로 보고 로그인 UI 를 그리지 않는다 — `renderUnavailable` 이 있으면 그것을, 없으면 `load` 가 그
 * 오류로 실패한다.
 *
 * 프레임워크는 인증의 **오케스트레이션**(판정 → 분기 → 재로드)만 소유한다. 세션 조회/로그인
 * 자체(HTTP)와 사용자·권한 형태, 세션-중 401 처리는 앱/`@iyulab/enterprise` 가 소유한다.
 */
export interface AuthGateContext {
  /** 로그인 UI 를 그릴 루트 요소(= `app.load` 의 `root`, 기본 `document.body`). */
  root: Element;
  /** 로그인 성공 시 호출한다. 앱이 (재)로드되어 셸을 띄운다(이때 `me()` 는 사용자를 반환해야 한다). */
  onSuccess: () => void;
}

/** `renderUnavailable` 이 받는 맥락 — 세션을 확인하지 못했을 때. */
export interface AuthGateUnavailableContext {
  /** 안내 UI 를 그릴 루트 요소(= `app.load` 의 `root`, 기본 `document.body`). */
  root: Element;
  /** `me()` 가 던진 값. */
  error: unknown;
  /** 다시 확인한다 — 앱이 (재)로드되어 `me()` 를 다시 부른다(재시도 버튼·`online` 이벤트에서). */
  retry: () => void;
}

export interface AuthGateConfig {
  /**
   * 현재 세션 조회. 값을 반환하면 인증, `null`/`undefined` 면 미인증으로 본다. **세션을 확인하지
   * 못했으면 던진다**(서버 다운·오프라인) — 그것을 `null` 로 돌려주면 로그인된 사용자가 로그인 화면으로 간다.
   * 동기/비동기 모두 허용한다.
   */
  me: () => Promise<unknown | null | undefined> | unknown | null | undefined;

  /**
   * 미인증 시 `context.root` 에 로그인 UI 를 그린다. 성공하면 `context.onSuccess()` 를 호출해야 한다.
   * 정리 함수를 반환하면 앱 로드/`unload` 시 호출되어 로그인 UI 를 제거한다.
   */
  renderLogin: (context: AuthGateContext) => (() => void) | void;

  /**
   * `me()` 가 던졌을 때(세션 모름) `context.root` 에 안내 UI 를 그린다(선택). `context.retry()` 로 다시
   * 확인한다. 정리 함수를 반환하면 앱 로드/`unload` 시 호출된다. 없으면 `load` 가 `me()` 의 오류로 실패한다.
   */
  renderUnavailable?: (context: AuthGateUnavailableContext) => (() => void) | void;

  /**
   * 인증 성공 후, 앱 셸을 만들기 직전에 호출된다(선택).
   * 사용자별 라우트/메뉴 필터 등 셸 구성 전 처리를 여기서 한다.
   */
  onAuthenticated?: (user: unknown) => void | Promise<void>;
}
