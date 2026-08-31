# Changelog

## [0.18.9] - 2026-08-31

### Fixed

- **JSX couldn't type-check `InfoField`, `PageHeader`, `EmptyState`, `GroupBox`,
  `InfoSection`, `ActionBar`, or `MasterDetailLayout` in a `.tsx` consumer** —
  these seven have no `/react` wrapper by design (plain
  String/Number/Boolean properties work as a raw custom element in JSX on
  both React 18 and 19), but only `HTMLElementTagNameMap` was declared for
  them; `JSX.IntrinsicElements`, what `.tsx` actually checks against, never
  was. Every one of them failed `TS2339` the moment a consumer wrote it in
  JSX. Declared now, and pulled in from each component file itself (not just
  the barrel), so a deep import for tree-shaking still sees it.

## [0.18.8] - 2026-08-30

### Fixed

- **`SidebarLayout` ignored an explicit `collapsed: false` on a group config** — a
  group always rendered collapsed regardless of the configured initial state.
  `SidebarGroup.collapsed` defaults to `true`, and the binding used a
  boolean-attribute directive, which only ever adds the attribute — it never
  removes an already-absent one to force `false`, so the default silently won.
  Switched to a direct property binding, which sets the value regardless of the
  component's own default.

## [0.18.7] - 2026-08-27

### Fixed

- **`SidebarButton`, `SidebarLink`, and `SidebarGroup` lost their accessible
  name entirely in compact (icon-only) sidebar mode.** Compact mode hides the
  visible text label (`part="label"`), and hiding it also removes it from the
  accessibility tree — with no fallback, a screen reader announced these as
  unnamed buttons/links. When `label` is a plain string, it is now promoted to
  `aria-label` while compact; the visible label still drives the name when
  expanded, so nothing changes there.

## [0.18.6] - 2026-08-24

### Fixed

- **`SidebarLayout`'s sidebar and mobile-header backgrounds now fall back to
  `--u-bg-color-raised` instead of `--u-panel-bg-color`.** The sidebar is persistent chrome, not
  a floating overlay (card/menu/dialog) — `--u-panel-bg-color`'s light value is the same white as
  the page background, so an app that never set `--app-sidebar-bg` got a sidebar visually
  indistinguishable from the page (and, since `u-group-box` also read `--u-panel-bg-color`, from
  its own cards too — a three-way collapse). `--u-bg-color-raised` is the token this library
  already documents for chrome surfaces adjacent to the page background, and `u-group-box`
  switched to it in `0.18.2`; the sidebar now matches. Visual change for any consumer relying on
  the unset default — light: sidebar goes from `#FFFFFF` to `#FAFAFA`; dark: `#1E1E1E` to
  `#2A2A2A`, which also fixes the reported card/input collapse (`u-input`'s background stayed on
  `--u-panel-bg-color`, so the sidebar now reads one step lighter than form fields instead of
  identical to them). `--app-sidebar-bg`/`--app-header-bg` overrides still take precedence
  exactly as before.

## [0.18.5] - 2026-08-23

### Fixed

- **`App.load()` now initializes i18next before checking the `auth` gate.** Same ordering bug as
  `0.18.4`'s theme fix, one layer down: when `auth.me()` resolves to `null`, `load()` renders the
  login screen and returns before the shell is built, but `i18next.init()` used to run only after
  the auth check passed. Any `renderLogin` screen that calls `i18next.t()` for its copy rendered
  with i18next uninitialized (falling back to raw keys or an empty string, depending on
  `returnEmptyString`/`returnNull`). i18n setup is pure display configuration independent of auth
  state, so it now runs unconditionally before the gate alongside theme and icon setup — every
  render path, including the pre-auth login screen, has translations available.

## [0.18.4] - 2026-08-23

### Fixed

- **`App.load()` now initializes the theme before checking the `auth` gate.** When `auth.me()`
  resolves to `null`, `load()` calls `auth.renderLogin()` and returns before the shell is built —
  but `Theme.init()` used to run only after the auth check passed, so any `renderLogin` screen
  that relies on `--u-*` design tokens (background, spacing, accent colors) rendered with no
  stylesheet in the document at all. `Theme.init()` and `iconBasepath` setup are pure display
  configuration independent of auth state, so they now run unconditionally before the gate —
  every render path, including the pre-auth login screen, has tokens available.

## [0.18.3] - 2026-08-22

### Fixed

- **`SidebarButtonConfig.id`'s docs no longer claim external light-DOM `u-popover` anchoring
  works.** It doesn't: the rendered `<u-sidebar-button>` lives inside `<u-sidebar-layout>`'s own
  shadow root, and `for="#id"` lookups never cross a shadow boundary — a popover placed outside
  the layout can never find the anchor, no matter how the `id` is passed. Documents the recipe
  that does work instead: assemble the trigger and its `u-popover` together inside a single
  `type: 'html'` item, with `placement` chosen from the sidebar's own state (a sideways flyout
  has no room once the sidebar widens on mobile; a vertical one always does). Not a code change —
  `id` still passes through exactly as before.

## [0.18.2] - 2026-08-19

### Fixed

- **`SidebarLayout`'s mobile-header and sidebar-header toggle buttons now have an accessible
  name.** Both are icon-only `<u-button>`s with no `aria-label`, text, or `title` — a
  screen-reader user only ever heard an unnamed "button". Wired through the same locale
  registry `MasterDetailLayout.detailClose` already uses (`toggleMobileMenu` /
  `toggleSidebar`), so translations follow `registerLocale` automatically; default English
  labels preserve current behavior for everyone who hasn't set a `locale`.

### Added

- **`SidebarButtonConfig.id?: string`.** Passed straight through to the rendered
  `<u-sidebar-button>` host, so a consumer can anchor a `u-popover` (or any `for="#id"`
  pattern) to a sidebar button using only public API — previously the only way to get an
  anchorable id was to reach into the internal, unexported `<u-sidebar-button>` tag name.
  Unset behaves exactly as before (no `id` attribute) — not a breaking change.

## [0.18.1] - 2026-08-19

### Fixed

- **`GroupBox`'s background no longer matches the surrounding page/sidebar in light mode, or
  input fields in dark mode.** It referenced the same token as those surfaces
  (`--u-panel-bg-color`); switched to `--u-bg-color-raised`, which both themes already define
  distinctly.

## [0.18.0] - 2026-08-17

### Added

- **`SidebarLink` now sets `aria-current="page"` on its inner `<u-link>` when `selected` is
  true.** Previously `selected` only drove visual emphasis (a host attribute for CSS) — a
  screen-reader user had no way to tell which item was the current page.
- **`SidebarLayoutConfig.mainAriaLabel?: string`.** When set, it's reflected as `aria-label`
  on the sidebar's main `<nav>` landmark. That `<nav>` lives inside `SidebarLayout`'s shadow
  root, so a consumer had no way to name it from the outside. Unset behaves exactly as
  before (no landmark name) — not a breaking change.
- **`InfoField`'s `tone` now colors the value text itself, not just the trend indicator.**
  Previously `.trend.tone-*` was the only CSS surface for `tone`, so a static figure shown
  without a `trend` (e.g. a balance due) couldn't be toned at all. `trend`'s existing
  behavior is unchanged; this only widens where `tone` is visible.
- **`ScreenObserver` is now exported from both the main entry and `/react`.** `SidebarLayout`'s
  responsive state (large→slim, medium→modal, small→mobile) depends entirely on the
  `screen-resize` event this class dispatches; `app.load()` instantiates it internally, but a
  consumer mounting `SidebarLayout` standalone through `/react` (without `app.load()`) had no
  public way to drive that behavior.

## [0.17.0] - 2026-08-11

### Added

- **`/react` subpath**, wrapping `SidebarLayout` and `Wizard` with `@lit/react`'s
  `createComponent`. `Wizard` is the only component that dispatches a custom event
  (`step-change`) — a raw custom element in JSX maps an `onStepChange` prop to a listener
  for a literal `"StepChange"` DOM event, which `Wizard` never fires, so the event never
  reaches a consumer without this wrapper. Both components also carry object/array
  properties (`config`, `steps`) that a raw custom element handles correctly under React 19
  (which assigns matching properties directly) but not under React 18 (where non-primitive
  JSX attributes stringify) — the wrapper keeps that working on both. Every component in
  this package (not just these two) also inherits an object-typed `styles` property from its
  base class for part-level style overrides; on React 18 that still needs a ref without a
  wrapper.

## [0.16.0] - 2026-08-11

### Changed

- **`SidebarLayout`'s main content area now ships a default padding**
  (`var(--u-space-3xl, 32px)`) instead of none. Every consumer previously had to add this
  themselves to keep route content off the viewport/sidebar edge. Full-bleed layouts (e.g. a
  dashboard whose table should reach the panel edge) can still opt back to `0` via
  `styles.main`. This is a visible rendering change for any consumer that never set
  `styles.main` — hence the minor bump rather than a patch.

## [0.15.0] - 2026-08-11

### Added

- **`u-info-field` accepts `size` (`'default' | 'lg'`), `trend` (`'up' | 'down' | 'flat'`),
  `trendLabel`, and `tone` (`'positive' | 'negative' | 'neutral'`).** `size="lg"` renders the
  value at title type-scale for dashboard KPI tiles, composed inside the existing
  `u-info-section` grid — no new component. `tone` resolves from `trend` when unset
  (`up→positive`, `down→negative`, `flat→neutral`) but an explicit `tone` always wins, since some
  metrics invert the usual direction-to-sentiment mapping. `trendLabel` wording is the consumer's
  responsibility. New `trend` part.
- **`u-master-detail-layout`** — a responsive master›detail split-pane shell (default slot =
  master, `slot="detail"` = detail; appears when filled, disappears when emptied). Below
  `overlayBreakpoint` (self width, default 760px) the detail pane becomes a full overlay with a
  close button that fires `detail-close`. `masterSize` sets the fixed master-pane width. Parts:
  `master`, `divider`, `detail`, `detail-close`.
- **`u-wizard`** — a step indicator + panel + Back/Next for multi-step flows. `steps`/
  `active`(controlled)/`orientation`/`linear` props; cancelable `step-change` event
  (`{from, to}`) for validation gating; validation and save/resume stay outside the component.
  Keyboard-operable end to end, focus moves to the panel on every step change, and an
  `aria-live` region announces each transition. Parts: `indicator`, `step`, `panel`, `actions`.

## [0.14.0] - 2026-08-10

### Added

- **`SidebarButtonConfig`, `SidebarLinkConfig`, and `SidebarGroupConfig` accept `lib?: string`.**
  When set, `icon` resolves through `@iyulab/components`' `IconRegistry.resolve(lib, name)`
  (a named, registered icon library) instead of only the default URL-fetch fallback path.
  Existing usage without `lib` is unaffected.

### Fixed

- **`SidebarLink` selected-state icon color no longer gets overridden by a consumer-set
  icon tint.** Adds a `--link-icon-color` custom property and a `:host([selected]) u-icon`
  rule so the selected state's contrast wins regardless of an inherited or inline icon
  color.

## [0.13.0] - 2026-08-08

### Added

- **`u-info-field` accepts `format` (`'number' | 'currency' | 'date'`) and `currency`.**
  When set, the value renders through `@iyulab/components`' `formatNumber`/`formatCurrency`/
  `formatDate` instead of a plain `String(value)`, and `format="number"`/`"currency"` implies
  the existing `numeric` (right-aligned, tabular-nums) styling automatically. `currency` has
  no default — omitting it while `format="currency"` degrades to plain number formatting
  rather than throwing. Existing usage without `format` is unaffected.

### Changed

- **`@iyulab/components` dependency floor raised to `^1.27.0`** (the feature above needs
  `formatNumber`/`formatCurrency`/`formatDate`, added in that release).

## [0.12.0] - 2026-08-07

### Added

- **`u-info-field` now accepts `value` as a plain HTML attribute**, not just a property binding.
  `value` was declared `attribute: false`, so `<u-info-field value="42">` was silently ignored —
  no error, no warning, the field just stayed blank. Property binding (`.value=${x}`) is
  unaffected and still accepts any type (numbers, dates); the attribute converter only applies
  when the value arrives as a string attribute.

- **Sidebar links can point outside the app.** `SidebarLinkConfig` accepted only `href` and could
  not say whether that link was a SPA route. `SidebarLink` rendered a `<u-link>` without passing
  `target` either, so even the one escape the lower layer offered was unreachable from config.
  A same-origin help site placed in the menu had its click intercepted by the router and fell
  through to not-found.

  Real menus are not all SPA screens: a documentation site, a report endpoint, an admin console
  and a legacy page sit in the same list. `navigate: 'document'` hands the click to the browser;
  `target` is passed through for new-tab links.

  ```ts
  { type: 'link', icon: 'help', label: 'Help', href: '/help/', navigate: 'document' }
  ```

  The entry stays an anchor, which is the point — the alternative was a `type: 'button'` with an
  imperative navigation, which loses middle-click and Ctrl+click, address copying, the link role
  for screen readers, and `pattern`-based highlighting, and cannot sit inside a section or group.

### Changed

- **`@iyulab/router` requirement raised to `^0.11.0`.** The sidebar `navigate: 'document'` support
  above needs `<u-link navigate="document">`, added in that release; `^0.10.2` does not resolve to
  it (a 0.x range's minor segment behaves like a major boundary under semver).

### Fixed

- **`sideEffects` omitted the source-resolved entry barrel.** The allowlist covered the component
  and layout modules but not the barrel that `exports["."]` resolves to. The published artifacts
  were unaffected — the shipped allowlist already covered them — but a consumer resolving this
  package from source (a workspace sibling) could have the barrel elided, dropping the element
  registrations it pulls in. The failure is silent: no error, and unregistered custom elements
  render nothing. The source-form entry points are now declared alongside the artifact ones.

## [0.11.1] - 2026-08-04

### Fixed

- 🔴**`@iyulab/components` 의존 범위가 실제로 필요한 것보다 느슨했다** — `^1.21.0` 이었으나
  `0.11.0` 의 **내비 아이콘 폴백은 `u-icon[fallback]`(1.24.0)** 을 쓴다. 범위가 그것을
  «요구»하지 않으므로, components 를 `1.22.x` 에 고정한 소비자에게는 폴백이 **조용히
  동작하지 않는다** — 아이콘 없는 그룹 항목이 접힌 사이드바에서 다시 빈 버튼이 된다.
  ⇒ `^1.24.0` 으로 좁혔다.

  ★**이것을 드러낸 것은 CI 였다** — `0.11.0` 태그 직전의 main 빌드가 아직 게시되지 않은
  `1.24.0` 대신 `1.23.0` 을 설치했고, 그 조합에서 폴백 회귀 7건이 실패했다.
  ***«범위가 담는다»와 «범위가 요구한다»는 다르다.***

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

  🔴**그리고 그 폴백이 호출부 셋 중 둘에만 걸려 있었다** — `u-sidebar-group` 은
  `?hidden` 으로 폴백을 무력화한 채였고, 접힌 상태에서는 라벨과 캐럿도 함께 숨으므로
  ***그룹 버튼이 통째로 비어 있었다.*** 세 종류를 한 목록으로 도는 회귀 7건을 신설했다
  (종전에는 이 축의 테스트가 **0건**이었고, 그래서 누락이 조용했다).

### Documentation

- 🔴**LOB 프리미티브 6종이 스킬 문서에 아예 없었다** — `u-page-header`·`u-group-box`·
  `u-info-section`·`u-info-field`·`u-empty-state`·`u-action-bar`. 여섯 다 `index.ts` 에서
  **공개**되고 화면이 그것으로 서는데, 스킬은 `app.load()` 설정만 설명하고 있었다.
  스킬은 소비자(그리고 에이전트)가 API 를 찾는 자리이므로 **거기 없으면 없는 것과 같다.**
  ⇒ `references/components/*.md` 여섯과 목차 절을 더했다.

### Changed

- **셸 크롬의 타이포가 디자인 토큰 스케일의 단을 읽는다**(`--u-text-*`).
  종전에는 사이드바 계열 5개 파일이 **20건 전부 리터럴**이었고, 같은 패키지의 콘텐츠
  프리미티브(`u-page-header`·`u-group-box`·`u-info-field`·`u-empty-state`)는 **23건 전부
  토큰**이었다 — 스케일이 있는데 셸에는 닿지 않는 상태였다.
  단 배정은 관측값 근사가 아니라 **용도**로 했다: 앱 제목 → `subtitle` · 섹션 제목 →
  `overline` · 섹션 부제 → `caption` · 내비 항목 → `label`.

  ⚠**소비자 영향 — 사이드바 글자가 바뀐다**: 내비 항목 `14px/500` → `13px/600`(작고 굵게),
  앱 제목 `18px/700` → `16px/600`, 섹션 제목 `12px` → `11px`.
  ★**배치는 바뀌지 않는다** — 내비 행 높이(라벨 줄 박스 19.5px가 20px 아이콘 아래에 들어간다)와
  헤더 제목 줄 박스(16 × 1.5 = 24px, 종전 `line-height` 와 동일)를 실측으로 고정했다.
  ⚠**아이콘 크기는 타이포가 아니다** — `u-icon`·`.caret`·`.logo`·`.toggler` 의 `font-size` 는
  도형 크기라 그대로 두었다.

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