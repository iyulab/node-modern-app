# Changelog

## 0.3.1 (2026-03-05)

### Breaking Changes
- **Slot 기반 Outlet 구조**: `SidebarLayout` 내부의 `<u-outlet>`을 `<slot>`으로 변경하고, `App`에서 Light DOM에 `<u-outlet>`을 추가하는 방식으로 전환. 이를 통해 React 라우팅 시 외부 CSS가 정상적으로 적용됨

### Changes
- **BaseElement → UElement 마이그레이션**: 모든 컴포넌트의 기반 클래스를 `BaseElement`에서 `UElement`로 변경
- **SidebarLinkConfig**: `type` 속성을 optional에서 required로 변경
- **import 경로 수정**: `Theme.js`, `Notifier.js` 등 대소문자 교정

### Dependencies
- `@iyulab/components` ^0.2.0 → ^0.4.0
- `@iyulab/router` ^0.6.2 → ^0.7.2
- `i18next` ^25.8.0 → ^25.8.13
- `@types/node` ^25.0.9 → ^25.3.2

### Fixes
- `SidebarButton.styles.ts`에서 중복된 `color` 속성 제거
- `repeat` 디렉티브의 미사용 콜백 파라미터 정리

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