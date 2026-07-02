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

## Documentation

| Guide | Description |
|-------|-------------|
| [getting-started.md](./docs/getting-started.md) | Bootstrap, architecture, entry point setup |
| [routing.md](./docs/routing.md) | Route config, URL params, async routes, progress |
| [layout.md](./docs/layout.md) | Sidebar layout, all menu item types, responsive behaviour |
| [theme.md](./docs/theme.md) | Theme init, runtime switching, CSS tokens |
| [notifications.md](./docs/notifications.md) | Toast methods and options |
| [i18n.md](./docs/i18n.md) | i18next setup, plugins, lit-i18n usage |
| [configuration.md](./docs/configuration.md) | Full TypeScript interface reference |

## License

MIT
