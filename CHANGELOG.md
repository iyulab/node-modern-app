# Changelog

## [0.11.0] - 2026-08-04

### Fixed

- 🔴**`u-action-bar[sticky]` 가 부모 밖으로 넘쳤다 — 가로 스크롤바가 생기고 주 액션이 잘렸다.**
  좌우 음수 마진(`margin: 0 calc(-1 * var(--u-space-md))`)으로 «가장자리까지» 늘리고 있었는데,
  그것은 ***부모가 정확히 그만큼의 가로 패딩을 갖고 있다***는 가정이다. 라이브러리가 소비자의
  여백을 알 수는 없다 ⇒ 음수 마진을 제거하고 세로 패딩만 남겼다.
  실측: 1034px 뷰포트에서 우측 12px 초과 → 저장 버튼 클리핑.

### Added

- 🔴**내비게이션 항목에 아이콘이 없거나 해석에 실패하면 기본 아이콘(큐브)을 그린다.**
  사이드바가 접히면 라벨이 숨고 아이콘만 남는데, 그 아이콘이 없으면 그 메뉴는 **높이만 있고
  아무것도 없는 빈 줄**이 되어 ***그 화면으로 갈 수단이 통째로 사라진다.***
  ⚠«이름이 없을 때»만 막으면 부족하다 — 실측 사례는 *이름은 있는데 파일이 없는* 쪽이었다.
  그래서 폴백은 `u-icon` 의 **해석 실패 지점**에 걸린다(`u-icon[fallback]`, `@iyulab/components`).
  폴백 SVG 는 **인라인**이다 — 다시 네트워크에 의존하면 같은 실패가 재현된다.

### Added

- **`u-action-bar` — 상세·편집 화면의 푸터 액션 바.** 초안 R4 의 잔여였다.

  ```html
  <u-action-bar sticky>
    <u-button slot="danger" color="danger" variant="ghost">삭제</u-button>
    <u-button variant="ghost">취소</u-button>
    <u-button color="primary">저장</u-button>
  </u-action-bar>
  ```

  **위험 액션은 왼쪽 끝, 주 액션은 오른쪽 끝** — 같은 무리에 두면 «저장»을 누르려다
  «삭제»를 누른다. **거리가 안전장치**이므로 이 분리는 취향이 아니라 기능이다.
  좁아지면 두 무리가 각자 한 줄을 갖고 **주 액션이 위로** 온다(엄지 위치에 위험 액션을
  두지 않기 위해서다). `sticky` 로 스크롤 컨테이너 하단에 고정한다.

### Changed

- 🔴**접힘 기준이 «화면»에서 «자기 폭»으로 바뀌었다** — `u-page-header` · `u-group-box`.

  종전에는 `@media (max-width: …)` 였고, 그러면 이 프리미티브들이 **자기가 얼마나 좁은지와
  무관하게** 접혔다: 사이드바가 열려 본문이 500px 인 1280px 화면에서는 접히지 않고, 넓은
  본문을 가진 좁은 화면에서는 불필요하게 접혔다. 컴포넌트가 스스로 판단할 수 있는 것은
  **자기 컨테이너 폭**뿐이다 ⇒ `@container` 로 옮겼다(`container-type: inline-size`).

  ⚠**시각 변화가 있을 수 있다** — 좁은 컬럼 안의 페이지 헤더는 이제 접히고(종전에는 화면이
  넓으면 접히지 않았다), 넓은 본문을 가진 태블릿에서는 접히지 않는다(종전에는 접혔다).

- **`u-group-box` 의 헤더 툴바가 좁을 때 제목 아래로 내려간다**(컨테이너 480px 이하).
  제목과 툴바가 한 줄에 남으면 제목은 잘리고 입력은 손가락보다 좁아진다 — 초안 R4 가
  *"좁은 화면에서 접히는 규칙을 라이브러리가 정한다"* 로 요구한 자리다.


## [0.9.0] - 2026-08-03

> **LOB 레이아웃 프리미티브 신설.** 이 패키지는 종전에 **셸 바깥 껍데기**(사이드바·라우팅·
> 테마·토스트)만 갖고 있었고 **셸 안쪽(페이지 본문)에 대한 제공물은 0개**였다. 그래서 소비앱이
> 화면마다 같은 구조를 손으로 다시 짰다 — 실측된 형태로 **라벨-값 그리드 41곳 · 카드 30여 곳**.
> 손으로 짜면 제목 크기·여백·열 수가 화면마다 조금씩 달라지고, 그 차이는 화면을 옮겨 다니는
> 사용자에게 *"제품이 하나로 만들어지지 않았다"* 로 읽힌다.

### Added

- **`u-page-header`** — 제목 + 상태 배지 슬롯 + 우측 액션 슬롯 + 뒤로가기. 좁은 화면에서
  액션이 아래로 내려가며 **왼쪽 정렬**이 된다(오른쪽 유지는 손가락이 닿기 어려운 쪽으로 몰린다).
- **`u-group-box`** — 제목이 붙은 카드. `u-card` 는 면만 주는데, LOB 에서 반복되는 것은
  *면 + 제목 + 우측 액션* 이라는 **묶음**이다. `divider`·`flush` 속성.
- **`u-info-section`** / **`u-info-field`** — 읽기 전용 라벨-값 그리드.
  ★열 수를 **컨테이너 폭**이 정한다(`auto-fit`). 미디어 쿼리로 고정하면 사이드 패널 같은
  좁은 컨테이너 안에서 화면 폭 기준으로 계산돼 칸이 짓눌린다.
  🔴**"아직 없음"과 "0"은 다른 사실이다** — `null`·`undefined`·빈 문자열은 `—`, `0`·`false`·`'0'`
  은 값 그대로. 규칙을 사람이 기억하는 방식으로 두면 반드시 어긋난다(실제로 *"부수 0인 주문"*
  과 *"부수가 아직 안 정해진 주문"* 이 똑같이 `—` 로 보인 소비앱이 있었다).
  숫자는 `numeric` 으로 우정렬 + `tabular-nums` — 자릿수가 세로로 맞아야 크기 비교가 눈으로 된다.
- **`u-empty-state`** — 🔴**`no-data`(아직 없음)와 `no-results`(조건에 안 맞음)를 가른다.**
  같은 문구로 보여 주면 사용자는 필터가 걸려 있는 줄 모르고 *"데이터가 사라졌다"* 로 읽는다.
  `--empty-state-icon-size` 훅.

- 🆕**로케일 레지스트리** — `registerLocale` · `setDefaultLocale` · `getLocaleStrings`.

  ```ts
  registerLocale('ko', { back: '뒤로', noResultsTitle: '조건에 맞는 결과가 없습니다' });
  setDefaultLocale('ko');
  ```

  🔴**기본값은 영어다.** 이 패키지는 3층 구분에서 **「범용」**이다(`components` = 중립
  프리미티브 / **`modern-app` = 범용** / `enterprise` = 이유랩 하우스 스타일).
  범용 층이 특정 언어를 기본값으로 가지면 **그 언어를 쓰지 않는 소비자를 배제**하며,
  그것은 이 리포가 `components` 에 대해 기각한 것과 **같은 형태**다.
  ⚠**언어는 미감보다 강하게 배제한다** — 어색한 기본값은 어색할 뿐이지만 읽을 수 없는
  기본값은 쓸 수 없다.

  ★**초판(미게시)의 `u-empty-state`·`u-page-header` 는 한국어 기본값을 갖고 있었다.**
  로케일 표준(*영어 기본 + 레지스트리*)은 이 리포가 **채택했지만 강제한 적이 없었고**,
  그래서 채택 이후에 만들어진 컴포넌트가 그대로 들어왔다. 회귀 테스트가
  **`src/**` 문자열 리터럴에 한글 0건**을 지킨다(주석·JSDoc 은 대상 아님 — 이 리포의
  내부 문서 언어는 한국어다). 부분 등록은 영어와 병합되고, `ko` 등록이 `ko-KR` 에도
  걸린다(소비자는 `ko` 를 등록하고 브라우저는 `ko-KR` 을 준다).

### Docs

- 🆕`docs/lob-primitives.md` — 카탈로그 · 오버라이드 경로 · **아직 만들지 않은 것과 그 이유**.
- ★**등급 정책을 명시했다.** 이 패키지에는 `enterprise` 같은 카탈로그·등급 문서가 없었다.
  프리미티브를 다섯 개 얹으면서 **정책을 조용히 만들어 버리는 것**을 피하려고 적었다 —
  *"현대적 앱이 보통 제공하는 것"* 이면 들어오되, **오버라이드 경로(`part`+slot)와 토큰 전용**
  둘을 요구한다.
- ➡**`EmptyState` 소유권을 `@iyulab/enterprise` 카탈로그에서 이관받았다.** 빈 상태는 프레임워크
  중립이 맞고, 그쪽 L2 는 React 전용이다. 같은 표면을 두 패키지가 각각 만들면 **소비자가 둘 중
  무엇을 쓸지 매번 고르게 되고, 그 비용은 만드는 쪽이 아니라 쓰는 쪽이 낸다.**

### 🔴 실브라우저 검증에서 잡힌 것 — 소스는 멀쩡했다

- **`:not(:has(*))` 로 빈 슬롯 래퍼를 접으려던 것이 동작하지 않았다.** `<slot>` **자신이
  자식 요소**라 `:has(*)` 가 항상 참이다. 소스 검사도 jsdom 도 통과시킨다 — 브라우저에서만
  드러난다. ⇒ 배정 상태를 `slotchange` 로 추적한다(`internals/slotted.ts`).
- **`render()` 안의 `this.querySelector()`** 는 **자식이 늦게 붙으면 못 본다.** 소비자가
  `requestUpdate()` 를 부를 이유가 없으므로 헤더가 사라진 채로 남는다. ⇒ 같은 방식으로 교체.
  헤더는 이제 **DOM 에서 빼지 않고 접는다** — 슬롯이 렌더되지 않으면 `slotchange` 가 영영 오지
  않아 나중에 붙는 자식을 못 보기 때문이다.

### 계약 테스트

`tests/browser/lob-primitives.browser.test.ts` — **실제로 렌더해** 검증한다(23건).
`0` 이 `0` 으로 · 빈 값이 `—` 로 DOM 에 나오는가, 빈 슬롯 래퍼가 정말 접히는가,
좁은/넓은 컨테이너에서 열 수가 바뀌는가. ★`isBlank()` 단위 테스트는 **술어**를 증명할 뿐
컴포넌트를 증명하지 않는다 — 이 파일이 그 간격을 메운다.

`tests/lob-primitives.test.ts` — 색·크기 리터럴 0(예외는 헤어라인 `1px solid` 하나, 이유 명시) ·
`part` 노출 · `u-` 접두어 · export · **빈 값 대 0** · 빈 상태 두 variant 의 문구 분리.

### 요구 사항

`@iyulab/components` **1.21.0 이상**(타입 스케일 · 여백/반경 상단 축) — `dependencies` 상향.
⚠**폴백 리터럴은 아직 1.20.0 시트 값이다.** `tests/token-fallbacks.test.ts` 는 **설치된 시트**와
대조하므로, 1.21.0 을 설치하면 그 테스트가 빨개진다 — **회귀가 아니라 갱신 부채**다.
업그레이드 시 `node scripts/token-fallbacks.mjs` 로 다시 굽는다.
⚠**1.20.0 이하에서는 폴백 값으로 렌더된다** — 깨지지는 않지만 *"조용히 예전 모양"* 이 된다.
시트 부재 내성과 같은 기제다.

## [0.8.2] - 2026-08-03

### Fixed

- **`SidebarLayout` 토글 버튼에 테두리가 남던 문제** — 토글러는 `<u-button>` 을 variant 없이
  쓰고 있었고, `@iyulab/components` 의 기본값은 `solid` 이라 내부 버튼이
  `--btn-border-color: var(--btn-color)` 로 **자기 테두리를 그렸다.**

  ⚠**시트의 `.toggler { border: none }` 으로는 지워지지 않는다** — 그 규칙은 `<u-button>`
  **호스트**에만 닿고, 선을 그리는 것은 그 섀도 루트 안의 `<button>` 이다. 그래서 호스트를
  재면 `0px` 로 보이고(테스트도 그렇게 통과한다) 화면에는 선이 남는다.

  ⇒ 마크업에 `variant="ghost"` 를 명시해 컴포넌트가 스스로 투명하게 그리도록 했다
  (실측: 내부 버튼 테두리 `1px solid <주색>` → `1px solid transparent`).
  중복이 된 `.toggler` 의 `border`·`background` 선언은 걷어냈다. `color: inherit` 는
  헤더 색을 따르게 하려는 의도이므로 유지한다.

  주색을 진하게 잡은 소비자일수록 눈에 띄던 자리다 — 테두리가 그 주색으로 그려졌다.

## [0.8.1] - 2026-08-02

### Fixed

- **토큰 폴백 리터럴 7곳이 정본 시트와 어긋나 있던 문제** — `--u-txt-color-hover`(5곳) ·
  `--u-primary-color`(2곳). `@iyulab/components` 1.16.0 이 텍스트 용도를 `-strong` 으로
  라우팅하면서 값이 바뀌었다.

### Changed

- 셸 활성 메뉴 색이 주색을 따라 한 단 진해진다(`#1E88E5` → `#1976D2`, hover 파생
  `#1A74C3` → `#1564B3`). 업스트림의 AA 수정을 그대로 따르는 것이며 이 패키지의 결정이 아니다.

  ⚠**이 결함은 개발 환경에서 절대 드러나지 않는다.** 토큰 시트가 있으면 폴백은 아예
  평가되지 않는다 — 깨지는 곳은 시트를 로드하지 않은 소비자의 화면이고, 우리가 보지
  못하는 자리다. 모노레포 루트의 `npm run tokens:sync` 가 이제 정본 시트와 대조한다.

## [0.8.0] - 2026-08-01

### Added

- ★**셸을 브랜드 색으로 다시 칠할 수 있다** — 사이드바의 활성 메뉴 색이 파랑 프리미티브
  (`--u-blue-600`)에 하드와이어돼 있었다. 소비자가 브랜드를 다른 색으로 잡아도 **화면에서
  가장 눈에 띄는 좌측 메뉴만 파랑으로 남았고**, 이를 고치는 길이 둘 다 나빴다 — 팔레트를
  덮으면 *진짜 파랑*이 필요한 배지·차트까지 오염되고(팔레트는 이름이 곧 값의 약속이다),
  섀도 DOM 내부 CSS 를 뚫으면 구조 변경에 조용히 깨진다.

  이제 셸은 역할 토큰을 경유한다. **재브랜딩이 한 줄이다**:

  ```css
  :root { --u-primary-color: #7B1FA2; }
  ```

- **셸 표면 토큰을 소비자 계약으로 공개했다** — `--app-sidebar-{bg,fg,active-bg,active-fg,width,width-slim}`
  · `--app-header-{bg,fg}`. **전부 선택**이며 미지정 시 역할 토큰에서 파생되므로, 아무것도
  하지 않으면 브랜드를 따라오고 원하면 셸만 따로 조절한다. 문서: [docs/theme.md](docs/theme.md).

  활성 메뉴의 hover 는 **별도 토큰이 아니라 파생**(`color-mix(… 85%, black)`)이다 — 한쪽만
  덮은 소비자가 어긋난 색 쌍을 얻는 것이 이 계약이 막으려는 결함이기 때문이다.

- **브라우저 테스트 프로젝트** — 실제 렌더에서만 드러나는 것을 검증한다
  (`npm run test:browser`). `color-mix` 계산과 커스텀 프로퍼티 캐스케이드는 jsdom 이
  재현하지 못한다.

### Fixed

- **라우팅 실패 표시가 컴포넌트의 위험색 규약을 따르지 않던 문제 수정** — `u-progress-bar` 의
  API 에 없는 `error` 속성을 세우고 색을 자체 CSS 로 덮고 있었다. 컴포넌트가 제공하는
  `status="error"` 를 쓰도록 고쳤다 — 막대 색이 규약값으로 정정되고, 종전에는 정정되지 않던
  버퍼 색도 함께 따라온다.
- **진행 표시 트랙 색 지정이 오타로 동작하지 않던 문제 수정** — `--progres-bar-track-color`
  (`s` 누락)라 트랙이 투명해지지 않고 기본 회색으로 남아 있었다.
- **키보드 포커스 링이 테마를 따르지 않던 문제 수정** — 사이드바 그룹·버튼의 포커스 윤곽선이
  하드코딩된 색(`#6666ff`)이었다. 브랜드와 무관했고 다크 테마에서도 그대로였다.

### Changed

- ⚠**활성 메뉴 hover 배경이 미세하게 어두워진다** — 고정된 `--u-blue-700`(#1976D2) 대신
  활성 색에서 파생하므로 기본 팔레트에서 #1A74C3 이 된다. 소비자가 브랜드를 바꿔도 hover 가
  함께 따라오게 하려면 파생이어야 한다(고정 단은 따라오지 않는다).
- ⚠**사이드바 그룹의 강조 텍스트 색이 바뀐다** — 같은 파생식을 쓴다. 대비는 오히려
  올라간다(4.60:1 → 4.85:1, WCAG AA 통과 유지).
- **사이드바 본문 텍스트가 `--u-neutral-800` 에서 시맨틱 토큰 `--u-txt-color` 로 바뀌었다.**
  소비자의 텍스트 색 지정을 따르게 된다.

## [0.7.0] - 2026-08-01

### Fixed

- ★**토큰 시트를 로드하지 않으면 앱 셸이 깨지던 문제 수정** — 사이드바·레이아웃의 색 선언
  **34곳**이 `@iyulab/components` 의 시트 토큰을 폴백 없이 참조하고 있었다. 시트가 없으면
  `var(--u-*)` 가 무효가 되어 **그 선언이 통째로 버려지므로**, 메뉴 텍스트가 보이지 않고
  사이드바 배경이 투명해졌다. 앱 셸이라 화면 전체가 영향을 받는다.

  이제 각 참조가 기본 테마 값을 폴백으로 갖는다(`var(--u-txt-color, #212121)`).
  **시트를 로드하는 경우 시각 변화는 없다** — 폴백은 시트가 없을 때만 평가된다.
  리터럴이 업스트림 시트와 어긋나지 않도록 대조 테스트가 강제하며, 폴백은 손으로 쓰지 않고
  생성한다.

  ⚠**폰트(`--u-font-base`)는 예외**다 — 폴백을 배선하지 않았다. 시트가 없으면 브라우저 기본
  폰트로 대체되어 화면이 깨지지 않는다(색은 깨진다).

## [0.6.0] - 2026-07-03

### Added
- **`AppConfig.auth`** — 부팅 인증 게이트. 지정하면 앱 셸(레이아웃·라우터)을 만들기 전에 `me()` 로 세션을 판정하여, 인증 시 셸을 로드하고 미인증 시 `renderLogin` 으로 로그인 UI 를 띄운다. 로그인 성공 시 `onSuccess()` 를 호출하면 앱이 (재)로드되어 셸이 나타난다. `onAuthenticated(user)` 로 셸 구성 직전 훅(권한 set 등)을 제공한다.
  - 프레임워크는 인증 **오케스트레이션**(판정→분기→재로드)만 소유. 세션 조회/로그인 HTTP·사용자/권한 형태·세션-중 401 은 앱/`@iyulab/enterprise`(`createAuthClient`/`createODataService`)가 소유한다. 소비앱이 `app.load()` 앞단에 손으로 짜던 부팅 게이트를 표준화.
- **`app.user`** getter — 인증 게이트 사용 시 인증된 현재 사용자(미인증/미사용이면 `undefined`).
- **사이드바 네이티브 권한 메뉴 필터** — 모든 메뉴 항목(link/section/group/button/html)에 `requirePermission?`/`requireAnyPermission?` 지원(공통 `SidebarPermissionGuard`). `SidebarLayoutConfig.hasPermission` 판정 함수를 주면 만족하지 않는 항목을 숨기고, 항목이 모두 걸러진 section/group 은 통째로 숨긴다. 소비앱이 손으로 짜던 `filterMenu` 를 표준화. 순수 헬퍼 `filterSidebarItems(items, hasPermission)` 도 export.

### Notes
- `auth`/`hasPermission` 미지정 시 동작은 완전히 하위호환(게이트·필터 없이 기존대로 셸 로드).

## [0.5.0] - 2026-07-02

### Added
- `AppConfig.enter` — global route guard, forwarded to the underlying `@iyulab/router` `Router`. Previously `@iyulab/router` already supported this via `RouterConfig.enter`, but `App.load()` never passed it through, so the global guard path was unreachable from modern-app. Return a `string` to redirect, `false` to cancel (403), `true`/nothing to proceed. See [docs/routing.md#authentication--guards](./docs/routing.md#authentication--guards).
- `AppConfig.initialLoad` / `AppConfig.useIntercept` — forwarded to `Router` alongside `enter` (previously also unreachable; `initialLoad: false` is needed for guard unit tests that drive navigation explicitly).
- Vitest + happy-dom test infrastructure (`npm test`) — first automated test suite for this package, covering `AppConfig.enter` redirect/cancel behavior.

### Changed
- `package.json` `scripts`: `"test"` now runs `vitest run` (was `vite`, which only started the dev server). The old behavior is available as `"start"`.

## [0.4.0] - 2026-07-02

### Added
- `SidebarLayoutConfig.logo` now accepts an image (`{ src, alt?, href? }`) or a custom render function (`(state) => TemplateResult | HTMLElement | string`), in addition to the existing icon-name string. Logo click navigates to `/` by default, or to `href` when given on the image variant.

### Fixed
- `README.md`/`docs/`/`skills/` previously documented `logo` as accepting an image URL string (e.g. `'/assets/logo.svg'`), but the implementation only ever rendered it as a `u-icon` name — an image URL string silently failed to render an image. Docs now use the image variant (`{ src, alt }`) for that case.

## [0.3.7] - 2026-06-09

### Fixed
- `SidebarLayout`: main-content keyboard scroll shortcuts (Space/arrows/Home/End/PageUp/PageDown) were swallowing input inside editable elements (input/textarea/select/contenteditable/ARIA textbox) — now skipped via `composedPath()`-based detection

## [0.3.6] - 2026-05-21

### Added
- `SidebarLayout`: keyboard scroll support for `.main` content area (`tabindex="-1"` + `@keydown` handler) — WCAG 2.1 SC 2.1.1 accessibility fix, focus moves to `.main` on route change

## [0.3.5] - 2026-04-07

### Changed
- Updated dependencies: `@iyulab/components` ^1.0.1 → ^1.0.3, `@iyulab/router` ^0.7.4 → ^0.9.1

## [0.3.4] - 2026-04-01

### Added
- Progress bar fade-in/out with CSS transition tied to `route-begin` and `route-done` events
- Progress bar error state (red) on `route-error` with auto-dismiss
- `docs/` topic guides and `skills/modern-app/` agent skill package

### Changed
- Rewrote `README.md` with accurate API references and links to docs and skills

## [0.3.3] - 2026-04-01

### Fixed
- Fixed missing `u-` prefix in `customElement` registration for `SidebarButton`, `SidebarGroup`, `SidebarLink`, and `SidebarSection` — components were referenced as `u-sidebar-*` in templates but registered as `sidebar-*`, causing them not to render

## [0.3.2] - 2026-04-01

### Changed
- **Breaking:** Upgraded `@iyulab/components` from `^0.4.0` to `^1.0.0`:
  - `Notifier` → `Toast` API migration
  - `AlertType` → `AlertStatus`, `ScreenPosition` → `ToastPosition` type renames
  - `IconRegistry` import path: `utilities/IconRegistry.js` → `utilities/icons.js`
  - Component import style: `.component.js` → side-effect import (e.g. `UIcon.js`, `UButton.js`)
- Removed `static dependencies` pattern — switched to `@customElement` decorator with side-effect imports
- Simplified Toast API: each notification method now calls `Toast.notice()` etc. directly; removed private `notify()` from `App` class
- Updated dependencies: `i18next` ^25.8.13 → ^25.10.10, `vite` ^7.3.1 → ^8.0.3, `@types/node` ^25.3.2 → ^25.5.0

### Fixed
- Changed `updated()` → `willUpdate()` in `SidebarLayout` to resolve update-in-update anti-pattern
- Switched `SidebarLayout` icon library from inline `sidebar-app` to `bootstrap`; removed inline SVG registration

## [0.3.1] - 2026-03-05

### Changed
- **Breaking:** Replaced `<u-outlet>` inside `SidebarLayout` with `<slot>`; moved `<u-outlet>` to Light DOM in `App` to allow external CSS during React routing
- Migrated base class of all components from `BaseElement` to `UElement`
- `SidebarLinkConfig.type` changed from optional to required
- Corrected import path casing for `Theme.js`, `Notifier.js`, etc.
- Updated dependencies: `@iyulab/components` ^0.2.0 → ^0.4.0, `@iyulab/router` ^0.6.2 → ^0.7.2, `i18next` ^25.8.0 → ^25.8.13, `@types/node` ^25.0.9 → ^25.3.2

### Fixed
- Removed duplicate `color` property in `SidebarButton.styles.ts`
- Cleaned up unused callback parameters in `repeat` directive

## [0.3.0] - 2026-01-21

### Added
- Mobile layout support with new states (`mobile`, `mobile-open`) and dedicated mobile header
- Route context tracking and active link highlighting
- `ScreenObserver` class replacing MobX observables for responsive behavior
- `title` and `iconBasepath` properties in app configuration

### Changed
- **Breaking:** `localization` config option renamed to `i18n`
- **Breaking:** `layout.menu` renamed to `layout.main`
- **Breaking:** `logo` type changed to string (icon name)
- Type definitions moved from `AppTypes.ts` to their respective modules
- Improved color scheme, typography, transition animations, layout spacing, and event handling

### Removed
- Removed `SidebarLogo` component — logo now rendered via `u-icon`
- Removed `observables.ts` (replaced by `ScreenObserver`)
- Removed `AppTypes.ts`

## [0.2.5] - 2026-01-06

### Changed
- Updated `@iyulab/components` to v0.1.11

## [0.2.4] - 2025-12-19

### Fixed
- Fixed case-sensitive import paths

## [0.2.3] - 2025-12-19

### Added
- `root` option in `AppConfig` to set the application root element

### Changed
- Updated `@iyulab/components` to v0.1.10

## [0.2.2] - 2025-11-17

### Added
- `fallback` config option in `AppConfig`

### Changed
- Improved `route-progress` handling in layout component

## [0.2.1] - 2025-11-13

### Changed
- `progress` property changed from a value to a function on the `app` instance
- `locales` option renamed to `localization` in `AppConfig`

### Fixed
- Fixed component and sidebar style issues

### Removed
- Removed `theme` setter property from `app` instance

## [0.2.0] - 2025-11-12

### Added
- Initial release