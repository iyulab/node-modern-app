# @iyulab/modern-app

A client-side SPA framework built on [Lit Element](https://lit.dev/) by iyulab. It bundles routing, a responsive sidebar layout, theme management, toast notifications, and i18n into a single `app` singleton.

## Installation

```bash
npm install @iyulab/modern-app
```

## When to use it

| ✅ Good fit | ❌ Not a good fit |
|-------------|-----------------|
| Single Page Applications (SPA) | SSR frameworks (Next.js, Nuxt, SvelteKit) |
| Admin dashboards and internal tools | Static Site Generation (SSG) |
| Progressive Web Apps (PWA) | SEO-critical public-facing pages |

## Quick Start

```typescript
import { app } from '@iyulab/modern-app';
import { html } from 'lit';

await app.load({
  basepath: '/',
  layout: {
    type: 'sidebar',
    logo: { src: '/assets/logo.svg', alt: 'My App' },
    title: 'My App',
    main: [
      { type: 'link', icon: 'home',  lib: 'tabler', label: 'Home',  href: '/' },
      { type: 'link', icon: 'users', lib: 'tabler', label: 'Users', href: '/users' },
    ],
  },
  routes: [
    { index: true,       render: () => html`<home-page></home-page>` },
    { path: 'users',     render: () => html`<users-page></users-page>` },
    { path: 'users/:id', render: (ctx) => html`<user-detail .userId=${ctx.params.id}></user-detail>` },
  ],
  fallback: {
    render: (ctx) => html`<error-page .error=${ctx.error}></error-page>`,
  },
  theme: { default: 'system' },
});
```

### Icons

A menu item's `icon` is a name resolved by `<u-icon>` from `@iyulab/components`:

- **with `lib`** — from that library. `tabler`, `heroicons`, `lucide` and `bootstrap` are pre-registered
  and fetched from a CDN on first use (the example above uses `tabler`); register your own with
  `IconRegistry.register()`.
- **without `lib`** — from your own files at `/assets/icons/<name>.svg` (change the folder with
  `setDefaultBaseUrl()`).

A name that resolves to nothing is drawn as a neutral placeholder instead of an empty gap, so a
missing icon set shows up as every item having the same icon. The shell's own controls (menu and
sidebar toggles, close) use a bundled set and need no network. See the components
[icon guide](https://github.com/iyulab/node-components/blob/main/docs/icons.md).

## Skills Usage

AI agent skills for this package are located in `skills/modern-app/`. Install them with `npx skills`:

**From GitHub:**
```bash
npx skills add iyulab/node-modern-app
```

**From local `node_modules`:**
```bash
npx skills add ./node_modules/@iyulab/modern-app
```

## Core API

### Navigation

```typescript
app.navigate('/users/42');     // push a route
app.router?.go('/users/42');   // via router instance
app.router?.context;           // current RouteContext
```

Routes live in the path (`/users/42`) by default, which needs the server to answer every path with
the app. On a static host that serves one document (GitHub Pages, object storage), put the route
after `#` instead:

```typescript
await app.load({ routerMode: 'hash', /* … */ });   // https://example.com/#/users/42
```

Links and `app.navigate()` follow the mode, so the rest of the app is written the same way.

### Theme

```typescript
app.theme.get();         // 'system' | 'light' | 'dark' | undefined
app.theme.set('dark');
app.theme.isInitialized; // boolean
```

Rebranding the shell is one declaration — the sidebar's active menu follows it:

```css
:root { --u-primary-color: #7B1FA2; }
```

Shell surfaces can also be tuned on their own (`--app-sidebar-bg`, `--app-sidebar-width`, …).
See [theme.md](./docs/theme.md).

### Notifications

```typescript
await app.success('Saved!', { title: 'Done', duration: 4000, position: 'top-right' });
await app.error('Something went wrong');
await app.info('Info message');
await app.warning('Double-check this');
await app.notice('Neutral notice');
```

### Localization (i18next)

```typescript
// Pass i18next plugins and InitOptions
await app.load({
  // ...
  i18n: {
    plugins: [i18nextHttpBackend],
    lng: 'en',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  },
});

// Access i18next
app.i18n.t('common::greeting');
app.i18n.changeLanguage('ko');

// Reactive translations in Lit templates — and in shell labels
import { translate } from '@iyulab/modern-app';
html`<p>${translate('common::greeting')}</p>`;
```

### Built-in strings

The package's own strings — the page header's back link, empty-state copy, the shell's toggle and
close labels, the wizard's buttons and step announcement — live in the `modern-app` namespace of
`@iyulab/components`' `Locale`. English and Korean are built in, English being the default; pick the
language once, with `Locale.set()` — the primitives and `@iyulab/flex-table` follow the same call.
Register other languages, or your own wording, in the same namespace:

```typescript
import { Locale } from '@iyulab/components';
import { modernAppLocale } from '@iyulab/modern-app';

Locale.set('ko');                       // built-in Korean — nothing to register

modernAppLocale.register('ja', {
  back: '戻る',
  toggleSidebar: 'サイドバーの切り替え',
  wizardStepAnnouncement: 'ステップ {index}/{total}: {label}',
});
```

A partial table is enough — untranslated keys fall back to English, and a registration for a
built-in language overrides only the keys it gives. An element's own `locale`
attribute overrides the active language for that element. `registerLocale`/`setDefaultLocale` still
work but are deprecated: a `setDefaultLocale()` call takes precedence over `Locale` until it is
called with `undefined`.

### 부팅 인증 게이트 (`auth`)

셸을 만들기 전에 세션을 판정한다. 소비앱이 `app.load()` 앞단에 손으로 짜던 "me 조회 → 미인증이면 로그인, 인증이면 앱 로드" 게이트를 표준화한다. 세션 조회/로그인 HTTP 는 `@iyulab/enterprise` 의 `createAuthClient` 가, 세션-중 401 은 `createODataService` 의 `onUnauthorized` 가 담당한다(프레임워크는 오케스트레이션만 소유).

```typescript
import { createAuthClient, setPermissions } from '@iyulab/enterprise';

const auth = createAuthClient<User, Cred>({ meUrl: '/api/auth/me', loginUrl: '/api/auth/login', logoutUrl: '/api/auth/logout' });

await app.load({
  layout: { type: 'sidebar', /* ... */ },
  auth: {
    me: async () => {
      const s = await auth.fetchMe();
      if (s.status === 'unknown') throw s.error;      // 모름(서버 다운·오프라인) → renderUnavailable
      return s.status === 'authenticated' ? s.user : null; // null → 미인증 → renderLogin
    },
    renderLogin: ({ root, onSuccess }) => renderLoginPage(root, auth, onSuccess),
    renderUnavailable: ({ root, retry }) => renderOfflinePage(root, retry),
    onAuthenticated: (user) => setPermissions((user as User).Permissions),
  },
  routes: [ /* ... */ ],
});

app.user; // 인증된 현재 사용자(미인증/미사용 시 undefined)
```

- `me()` 가 값을 반환하면 셸 로드, `null`/`undefined` 면 `renderLogin({ root, onSuccess })`.
- `me()` 가 **던지면** 세션을 «모름» 으로 보고 로그인 UI 를 그리지 않는다 — `renderUnavailable({ root, error, retry })` 를 그리고, 없으면 `app.load()` 가 그 오류로 실패한다. 서버가 잠깐 503 을 낸 것을 «미인증» 으로 돌려주면 로그인된 사용자가 로그인 화면으로 간다.
- 로그인 성공 시 `onSuccess()` 를 호출하면 앱이 재로드되어 셸이 나타나고 로그인 UI 는 정리된다.
- `auth` 미지정 시 완전히 하위호환(게이트 없이 기존대로 로드).

### 권한 기반 메뉴 필터

모든 사이드바 메뉴 항목에 `requirePermission`/`requireAnyPermission` 를 달고, 레이아웃에 `hasPermission` 판정 함수를 주면 권한 없는 항목이 숨겨진다. 항목이 모두 걸러진 section/group 은 통째로 숨는다. 소비앱이 손으로 짜던 `filterMenu` 를 대체한다.

```typescript
import { hasPermission } from '@iyulab/enterprise';

await app.load({
  layout: {
    type: 'sidebar',
    hasPermission,                                  // enterprise 권한 store 판정
    main: [
      { type: 'link', icon: 'house', label: '홈', href: '/' },
      { type: 'link', icon: 'gear', label: '설정', href: '/settings', requirePermission: 'admin.maintenance' },
      {
        type: 'section', title: '주문',
        items: [
          { type: 'link', label: '주문 목록', href: '/orders', requireAnyPermission: ['orders.read', 'orders.write'] },
        ],
      },
    ],
  },
  auth: { /* ... */ },
});
```

- `hasPermission` 미지정 시 필터링하지 않는다(모든 항목 표시 — 하위호환).
- 순수 헬퍼 `filterSidebarItems(items, hasPermission)` 를 직접 재사용할 수도 있다.

## React

A `@lit/react`-based wrapper for `SidebarLayout` and `Wizard` is available under `/react`.
Every other exported component works as a plain custom element in JSX; these two specifically
need the wrapper because `Wizard` dispatches a `step-change` custom event (a raw element maps
`onStepChange` to a literal `"StepChange"` DOM event it never fires) and both carry object/array
properties that a raw element only handles correctly under React 19.

`@lit/react` and `react` are optional peer dependencies — install them to use this subpath:

```bash
npm install @iyulab/modern-app @lit/react react
```

The JSX types for using the content primitives as plain tags (`<u-info-field>`, `<u-page-header>`, …)
live in this subpath too, so a non-React app never needs React's types. Importing anything from
`@iyulab/modern-app/react` brings them in; a React app that only uses the plain tags adds one line:

```ts
import type {} from '@iyulab/modern-app/react';
```

```tsx
import { SidebarLayout, Wizard, type SidebarItem, type WizardStep } from '@iyulab/modern-app/react';

const main: SidebarItem[] = [{ type: 'link', label: 'Home', href: '/' }];
const steps: WizardStep[] = [{ id: 'info', label: 'Info' }, { id: 'review', label: 'Review' }];

export function App() {
  return (
    <SidebarLayout config={{ type: 'sidebar', title: 'My App', main }}>
      <Wizard steps={steps} active={0} onStepChange={(e) => console.log(e.detail)}>
        <section>Info panel</section>
        <section>Review panel</section>
      </Wizard>
    </SidebarLayout>
  );
}
```

### The content primitives

The LOB content primitives are wrapped too. Everything React lives in the one barrel above —
the shell, the sidebar configuration types and every content primitive — so a single specifier is
enough:

```tsx
import { PageHeader, InfoSection, InfoField } from '@iyulab/modern-app/react';
```

Each wrapper is also published on its own subpath, for importing one at a time:

```tsx
import { PageHeader } from '@iyulab/modern-app/react/PageHeader.js';
import { InfoSection } from '@iyulab/modern-app/react/InfoSection.js';
import { InfoField } from '@iyulab/modern-app/react/InfoField.js';

export function OrderSummary({ order }: { order: Order }) {
  return (
    <>
      <PageHeader title="Order" subtitle={order.no} />
      <InfoSection min={200}>
        <InfoField label="Total" format="currency" currency="KRW" value={order.total} />
        <InfoField label="Ordered at" format="date" value={order.orderedAt} />
      </InfoSection>
    </>
  );
}
```

Available: `PageHeader`, `InfoSection`, `InfoField`, `GroupBox`, `EmptyState`, `ActionBar`,
`MasterDetailLayout`, `SidebarButton`. They are generated from the elements themselves, so their
props and events follow the element rather than a second hand-written description of it. `InfoField`
keeps `value` as `unknown`, so `null`, numbers and strings all type-check.

## Accessibility

The baseline is **WCAG 2.2**. The table lists what this package **measures in tests** — it is not a
conformance claim for the success criteria it does not list.

| Success criterion | Guarantee | Measured by |
|---|---|---|
| SC 2.5.8 Target Size (Minimum) | Every pointer target this package renders itself — sidebar links, buttons and group headers (expanded and compact), the sidebar logo and toggle, wizard steps, the page header's back link — is at least 24×24 CSS px or meets the spacing exception (24px between centers), and is actually hit at that position | `tests/browser/target-size.browser.test.ts` (real Chromium) |
| SC 2.1.1 Keyboard (pointer-cursor check) | Nothing this package renders shows a pointer cursor without being an interactive element — the sidebar logo is a link | `tests/browser/target-size.browser.test.ts` |
| SC 2.4.1 Bypass Blocks | The sidebar layout's first Tab stop is a «Skip to main content» link, visible when focused and at least 24px tall; it moves focus to the screen's `[autofocus]` element or to the route area, which is the page's single `<main>` landmark | `tests/browser/sidebar-layout-skip-link.browser.test.ts` |
| SC 3.2.5 Change on Request (new tabs) | A sidebar link with `target: '_blank'` ends its accessible name with a localized, visually hidden "(opens in a new tab)" — expanded and collapsed | `tests/browser/sidebar-link-new-tab-name.browser.test.ts` |

Buttons placed through slots or rendered as `u-button` without size overrides (wizard back/next, the
master-detail close button) follow `@iyulab/components`, which measures them in its own gate. Color
contrast likewise comes from that package's tokens.

For **KWCAG 2.2** (the Korean web accessibility standard), the `@iyulab/components` README has a table of all 33 check items — which are guaranteed by a test across the sibling packages, which are shared with the app, and which do not apply: [KWCAG 2.2 대응표](https://github.com/iyulab/node-components#kwcag-22-대응표).

## Documentation

| Guide | Description |
|-------|-------------|
| [getting-started.md](./docs/getting-started.md) | Bootstrap, architecture, entry point setup |
| [routing.md](./docs/routing.md) | Route config, URL params, async routes, progress, auth guards |
| [layout.md](./docs/layout.md) | Sidebar layout, all menu item types, responsive behaviour |
| [theme.md](./docs/theme.md) | Theme init, runtime switching, token layers, shell surface tokens |
| [notifications.md](./docs/notifications.md) | Toast methods and options |
| [i18n.md](./docs/i18n.md) | i18next setup, plugins, the `translate()` directive |
| [configuration.md](./docs/configuration.md) | Full TypeScript interface reference |

## License

MIT
