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
      { type: 'link', icon: 'home',  label: 'Home',  href: '/' },
      { type: 'link', icon: 'users', label: 'Users', href: '/users' },
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

### Theme

```typescript
app.theme.get();         // 'system' | 'light' | 'dark' | undefined
app.theme.set('dark');
app.theme.isInitialized; // boolean
```

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

// Reactive translations in Lit templates
import { translate } from 'lit-i18n';
html`<p>${translate('common::greeting')}</p>`;
```

### 부팅 인증 게이트 (`auth`)

셸을 만들기 전에 세션을 판정한다. 소비앱이 `app.load()` 앞단에 손으로 짜던 "me 조회 → 미인증이면 로그인, 인증이면 앱 로드" 게이트를 표준화한다. 세션 조회/로그인 HTTP 는 `@iyulab/enterprise` 의 `createAuthClient` 가, 세션-중 401 은 `createODataService` 의 `onUnauthorized` 가 담당한다(프레임워크는 오케스트레이션만 소유).

```typescript
import { createAuthClient, setPermissions } from '@iyulab/enterprise';

const auth = createAuthClient<User, Cred>({ meUrl: '/api/auth/me', loginUrl: '/api/auth/login', logoutUrl: '/api/auth/logout' });

await app.load({
  layout: { type: 'sidebar', /* ... */ },
  auth: {
    me: () => auth.fetchMe(),                         // null → 미인증 → renderLogin
    renderLogin: ({ root, onSuccess }) => renderLoginPage(root, auth, onSuccess),
    onAuthenticated: (user) => setPermissions((user as User).Permissions),
  },
  routes: [ /* ... */ ],
});

app.user; // 인증된 현재 사용자(미인증/미사용 시 undefined)
```

- `me()` 가 값을 반환하면 셸 로드, `null`/`undefined` 면 `renderLogin({ root, onSuccess })`.
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

## Documentation

| Guide | Description |
|-------|-------------|
| [getting-started.md](./docs/getting-started.md) | Bootstrap, architecture, entry point setup |
| [routing.md](./docs/routing.md) | Route config, URL params, async routes, progress, auth guards |
| [layout.md](./docs/layout.md) | Sidebar layout, all menu item types, responsive behaviour |
| [theme.md](./docs/theme.md) | Theme init, runtime switching, CSS tokens |
| [notifications.md](./docs/notifications.md) | Toast methods and options |
| [i18n.md](./docs/i18n.md) | i18next setup, plugins, lit-i18n usage |
| [configuration.md](./docs/configuration.md) | Full TypeScript interface reference |

## License

MIT
