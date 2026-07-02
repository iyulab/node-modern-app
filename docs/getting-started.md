# Getting Started

## Installation

```bash
npm install @iyulab/modern-app
```

---

## Architecture

`@iyulab/modern-app` is a **client-side SPA framework** built on [Lit Element](https://lit.dev/). It wires together:

- **Client-side routing** — via `@iyulab/router`
- **Sidebar layout** — responsive shell with navigation
- **Theme management** — light / dark / system via `@iyulab/components`
- **Toast notifications** — via `@iyulab/components`
- **Localization** — via `i18next`

### When to use it

| ✅ Good fit | ❌ Not a good fit |
|-------------|-----------------|
| Single Page Applications (SPA) | Server-Side Rendering (Next.js, Nuxt, etc.) |
| Admin dashboards and internal tools | Static Site Generation (SSG) |
| Progressive Web Apps (PWA) | SEO-critical public-facing pages |

---

## Bootstrap

Call `app.load()` once at your application entry point. It mounts the layout, starts the router, and initializes all subsystems.

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
      { type: 'link', icon: 'home',     label: 'Home',     href: '/' },
      { type: 'link', icon: 'users',    label: 'Users',    href: '/users' },
      { type: 'link', icon: 'settings', label: 'Settings', href: '/settings' },
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

To tear everything down cleanly (e.g. in tests or hot-module-replacement):

```typescript
app.unload();
```

---

## Next steps

| Topic | Guide |
|-------|-------|
| Route definitions, params, progress | [routing.md](./routing.md) |
| Sidebar layout and menu items | [layout.md](./layout.md) |
| Theme setup and switching | [theme.md](./theme.md) |
| Toast notifications | [notifications.md](./notifications.md) |
| i18next localization | [i18n.md](./i18n.md) |
| Full TypeScript reference | [configuration.md](./configuration.md) |
