# Changelog

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