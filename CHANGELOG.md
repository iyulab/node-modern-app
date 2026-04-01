# Changelog

## 0.3.4 (2026-04-01)

### Features
- Progress bar now fades in/out with CSS transition on route begin/done
- Progress bar shows error state (red) on `route-error` and auto-dismisses

### Documentation
- Added `docs/` topic guides and `skills/modern-app/` agent skill package
- Rewrote `README.md` with accurate API and links to docs/skills

## 0.3.3 (2026-04-01)

### Fixes
- Fixed missing `u-` prefix in `customElement` registration for `SidebarButton`, `SidebarGroup`, `SidebarLink`, and `SidebarSection` — components were referenced as `u-sidebar-*` in the template but registered as `sidebar-*`, causing them not to render

## 0.3.2 (2026-04-01)

### Breaking Changes
- **`@iyulab/components` major upgrade**: `^0.4.0` → `^1.0.0`
  - `Notifier` → `Toast` API migration
  - `AlertType` → `AlertStatus`, `ScreenPosition` → `ToastPosition` type rename
  - `IconRegistry` import path: `utilities/IconRegistry.js` → `utilities/icons.js`
  - Component import style: `.component.js` → side-effect import (`UIcon.js`, `UButton.js`, etc.)

### Refactor
- **Component registration migration**: Removed `static dependencies` pattern → `@customElement` decorator + side-effect import
- **Simplified Toast API**: Removed `private notify()` method from `App` class, each notification method now calls `Toast.notice()`, etc. directly

### Fixes
- Changed `updated()` → `willUpdate()` in `SidebarLayout` to resolve update-in-update anti-pattern
- Switched `SidebarLayout` icon library from inline `sidebar-app` to `bootstrap`, removed inline SVG registration code

### Dependencies
- `@iyulab/components` ^0.4.0 → ^1.0.0
- `i18next` ^25.8.13 → ^25.10.10
- `vite` ^7.3.1 → ^8.0.3
- `@types/node` ^25.3.2 → ^25.5.0

## 0.3.1 (2026-03-05)

### Breaking Changes
- **Slot-based Outlet structure**: Replaced `<u-outlet>` inside `SidebarLayout` with `<slot>`, and moved `<u-outlet>` to Light DOM in `App`. This allows external CSS to apply correctly during React routing

### Changes
- **BaseElement → UElement migration**: Changed base class of all components from `BaseElement` to `UElement`
- **SidebarLinkConfig**: Changed `type` property from optional to required
- **Fixed import paths**: Corrected casing for `Theme.js`, `Notifier.js`, etc.

### Fixes
- Removed duplicate `color` property in `SidebarButton.styles.ts`
- Cleaned up unused callback parameters in `repeat` directive

### Dependencies
- `@iyulab/components` ^0.2.0 → ^0.4.0
- `@iyulab/router` ^0.6.2 → ^0.7.2
- `i18next` ^25.8.0 → ^25.8.13
- `@types/node` ^25.0.9 → ^25.3.2

## 0.3.0 (2026-01-21)

### Breaking Changes
- **Configuration Updates**:
  - Renamed `localization` to `i18n`
  - Renamed `layout.menu` to `layout.main` 
  - Changed `logo` type to string (icon name)
  - Added `title` property for app title
  - Added `iconBasepath` option
- **Mobile layout support**: New mobile states (`mobile`, `mobile-open`) with dedicated mobile header

### Removals
- Removed `SidebarLogo` component: Logo is now rendered using `u-icon` component
- Removed `observables.ts`: Replaced MobX observables with native `ScreenObserver` class
- Removed `AppTypes.ts`: Type definitions moved to their respective modules

### Improvements
- Improved responsive behavior with screen size observer
- Added route context tracking and active link highlighting
- Improved color scheme and typography
- Enhanced transition animations
- Cleaner layout spacing and gaps
- Improved event handling for route changes and screen resizing
- Enhanced pattern matching for active link detection

## 0.2.5 (2026-01-06)
- Updated `@iyulab/components` to v0.1.11

## 0.2.4 (2025-12-19)
- fix import path, modified correct case-sensitive paths

## 0.2.3 (2025-12-19)
- added `root` option in `AppConfig` type to set application root element
- update `@iyulab/components` to v0.1.10

## 0.2.2 (2025-11-17)
- added `fallback` config in `AppConfig` type
- improved route-progress handling in layout component

## 0.2.1 (2025-11-13)
- Fixed few component and sidebar styles
- removed `theme` setter property in `app` instance
- changed `progress` property to function in `app` instance
- changed name `locales` option to `localization` option in `AppConfig` type

## 0.2.0 (2025-11-12)
- Initial library version release