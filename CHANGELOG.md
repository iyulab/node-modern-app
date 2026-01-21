# Changelog

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