# Changelog

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