---
name: modern-app
description: Client-side SPA framework built on Lit Element. Bootstraps an application with sidebar layout, client-side routing, theme management, toast notifications, and i18n (i18next). Use when working with the @iyulab/modern-app package — setting up a new app, configuring routes, adding navigation menu items, managing theme, showing toasts, or wiring up localization.
license: MIT
metadata:
  author: iyulab
  version: "0.3.4"
compatibility: Designed for Lit Element / TypeScript projects. Requires @iyulab/modern-app.
---

# @iyulab/modern-app

A client-side SPA framework built on Lit Element. Provides a single `app` singleton that wires together routing, layout, theme, notifications, and i18n.

> **Suitable for:** SPAs, admin dashboards, internal tools, PWAs.  
> **Not suitable for:** SSR (Next.js, Nuxt, SvelteKit), SSG, SEO-critical pages.

## Installation

```bash
npm install @iyulab/modern-app
```

---

## Bootstrap

Call `app.load()` once at the entry point. All options are in [`AppConfig`](./references/api.md#appconfig).

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
      { type: 'link', icon: 'home', label: 'Home',     href: '/' },
      { type: 'link', icon: 'users', label: 'Users',   href: '/users' },
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
});
```

To tear down the app:

```typescript
app.unload();
```

---

## Navigation

```typescript
app.navigate('/users/42');       // push route
app.router?.go('/users/42');     // same via router instance
app.router?.basepath;            // base path string
app.router?.context;             // current RouteContext
app.router?.routes;              // registered routes
```

---

## Theme

```typescript
app.theme.get();          // 'system' | 'light' | 'dark' | undefined
app.theme.set('dark');    // 'system' | 'light' | 'dark'
app.theme.isInitialized;  // boolean
```

Theme `store` options persist the preference across sessions:

```typescript
theme: {
  default: 'system',
  store: { type: 'localStorage', prefix: 'myapp' },
  useBuiltIn: true,
}
```

---

## Notifications (Toast)

All methods return `Promise<void>`.

```typescript
await app.notice('A general notice');
await app.info('Loaded successfully');
await app.success('Saved!', { title: 'Done', duration: 4000, position: 'top-right' });
await app.warning('Check your input');
await app.error('Something went wrong');
```

`position` values: `'top-right'` | `'top-left'` | `'bottom-right'` | `'bottom-left'`  
`duration` default: `3000` ms

---

## Localization (i18next)

Pass standard i18next `InitOptions` plus an optional `plugins` array.

```typescript
import i18nextHttpBackend from 'i18next-http-backend';

await app.load({
  // ...
  i18n: {
    plugins: [i18nextHttpBackend],
    lng: 'en',
    fallbackLng: 'en',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
  },
});

// Access i18next instance
app.i18n.t('namespace::key');
```

Use in Lit templates with `lit-i18n`:

```typescript
import { translate } from 'lit-i18n';
html`<p>${translate('namespace::greeting')}</p>`;
```

---

## Sidebar Layout

Full configuration reference: [references/layout.md](./references/layout.md)

### Menu item types

| type | Description |
|------|-------------|
| `'link'` | Single navigation link with optional icon |
| `'group'` | Collapsible group of links |
| `'section'` | Labelled section grouping links and groups |
| `'button'` | Action button (non-navigation) |
| `'html'` | Custom Lit template rendered inline |

```typescript
layout: {
  type: 'sidebar',
  logo: { src: '/logo.svg', alt: 'App Name' },
  title: 'App Name',
  main: [
    {
      type: 'section',
      title: 'Management',
      items: [
        { type: 'link',  icon: 'users', label: 'Users',    href: '/users' },
        {
          type: 'group', icon: 'settings', label: 'Settings',
          items: [
            { type: 'link', label: 'Profile',  href: '/settings/profile' },
            { type: 'link', label: 'Security', href: '/settings/security' },
          ],
        },
      ],
    },
  ],
  footer: [
    { type: 'button', icon: 'logout', label: 'Logout', onClick: () => signOut() },
  ],
}
```

### Responsive breakpoints

```typescript
layout: {
  type: 'sidebar',
  breakpoints: [768, 1024], // [tablet-min-px, desktop-min-px]
  // ...
}
```

Sidebar states: `'default'` | `'slim'` | `'modal'` | `'mobile'` | `'mobile-open'`

---

## Routes with progress

```typescript
{
  path: 'dashboard',
  title: 'Dashboard',
  render: async (ctx) => {
    ctx.progress(30);
    const data = await fetchData();
    ctx.progress(100);
    return html`<dashboard-page .data=${data}></dashboard-page>`;
  },
}
```

`RouteContext` fields: `href`, `pathname`, `basepath`, `params`, `progress`

---

## LOB primitives

Screen-building components this package registers. They exist so the same skeleton is not
re-assembled per screen — that is where a product stops looking like one product.

- [`u-page-header`](./references/components/page-header.md) — Screen header: back link, title, subtitle, status and action slots
- [`u-group-box`](./references/components/group-box.md) — Titled card with trailing header actions; the unit detail screens are built from
- [`u-info-section`](./references/components/info-section.md) — Responsive grid for label/value pairs; container width picks the column count
- [`u-info-field`](./references/components/info-field.md) — Read-only label/value pair that keeps "not set" and "zero" distinct
- [`u-empty-state`](./references/components/empty-state.md) — Empty list or empty search, worded differently because they are different facts
- [`u-action-bar`](./references/components/action-bar.md) — Closing action row with a separated destructive group

---

## Full `AppConfig` reference

See [references/api.md](./references/api.md) for all TypeScript interfaces.
