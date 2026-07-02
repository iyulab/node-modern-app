# Routing

`@iyulab/modern-app` uses `@iyulab/router` under the hood. Routes are declared as plain objects passed to `app.load()`.

---

## `RouteConfig`

```typescript
interface RouteConfig {
  /** Match the root path — equivalent to `path: ''`. */
  index?: boolean;

  /**
   * Path string. Segments starting with `:` are captured as named params.
   * Example: `'users/:id'`, `'org/:orgId/repo/:repoId'`
   */
  path?: string;

  /** Set `document.title` when the route activates. */
  title?: string;

  /** Force a re-render even when the path has not changed. */
  force?: boolean;

  /**
   * Metadata attached to this route. Merged parent → child and exposed
   * on `RouteContext.metadata`. Use it to carry authorization data
   * (roles, permission flags) that `enter` guards can read.
   */
  metadata?: Record<string, unknown>;

  /**
   * Guard called before this route activates.
   * - Return a `string` to redirect.
   * - Return `false` to cancel navigation (renders a 403 error page).
   * - Return `true` (or nothing) to proceed.
   */
  enter?: (context: RouteContext) => Promise<string | boolean> | string | boolean;

  /** Render function. May be async. Must return a Lit `TemplateResult`. */
  render: (context: RouteContext) => TemplateResult | Promise<TemplateResult>;
}
```

---

## `RouteContext`

The `render` function receives a `RouteContext` on every navigation:

```typescript
interface RouteContext {
  /** Full URL string of the current page. */
  href: string;

  /** Pathname portion of the URL (after origin, before query string). */
  pathname: string;

  /** The `basepath` value configured in `AppConfig`. */
  basepath: string;

  /** Named URL parameters extracted from the path pattern. */
  params: Record<string, string>;

  /** Parsed query string. `query.get('key')` returns `string | null`. */
  query: URLSearchParams;

  /**
   * Report loading progress (0–100).
   * Drives the linear progress bar in the layout header.
   * Call with 100 (or any final value) to dismiss the bar.
   */
  progress: (value: number) => void;
}
```

---

## Examples

### Static route

```typescript
{ path: 'about', render: () => html`<about-page></about-page>` }
```

### Route with URL params

```typescript
{
  path: 'users/:id',
  render: (ctx) => html`<user-detail .userId=${ctx.params.id}></user-detail>`,
}
```

### Async route with progress

```typescript
{
  path: 'dashboard',
  title: 'Dashboard',
  render: async (ctx) => {
    ctx.progress(20);
    const stats = await fetchStats();
    ctx.progress(100);
    return html`<dashboard-page .stats=${stats}></dashboard-page>`;
  },
}
```

### Index route

```typescript
{ index: true, render: () => html`<home-page></home-page>` }
```

### Fallback (404 / error)

```typescript
fallback: {
  render: (ctx) => html`<error-page .error=${ctx.error}></error-page>`,
}
```

---

## Programmatic navigation

```typescript
// Preferred shorthand
app.navigate('/users/42');

// Direct router access
app.router?.go('/users/42');
app.router?.basepath;   // configured base path
app.router?.context;    // current RouteContext
app.router?.routes;     // registered RouteConfig array
```

---

## Authentication & Guards

`app.load({ enter })` runs before every navigation — including the initial one.
Use it as the single authentication gate instead of checking auth and
conditionally calling `app.load()` from your own bootstrap code.

### Global authentication gate

```typescript
await app.load({
  enter: (ctx) => isAuthenticated() || `/login?returnTo=${encodeURIComponent(ctx.pathname)}`,
  routes: [
    { path: '/login', render: (ctx) => html`<login-page returnTo=${ctx.query.get('returnTo')}></login-page>` },
    { path: '/dashboard', render: () => html`<dashboard-page></dashboard-page>` },
  ],
  // ...
});
```

### Role-based route guard

Combine per-route `metadata` with `enter` to gate individual routes:

```typescript
{
  path: '/admin',
  metadata: { role: 'admin' },
  enter: (ctx) => currentUser.role === ctx.metadata.role || '/forbidden',
  render: () => html`<admin-page></admin-page>`,
}
```

### Session expiry (401 mid-session)

A route guard only runs on navigation — it does not catch an API call
returning `401` while the user is already on a page. Handle that at the
HTTP layer instead, with [`@iyulab/http-client`](https://github.com/iyulab/http-client)'s
`onResponse` interceptor:

```typescript
import { HttpClient } from '@iyulab/http-client';
import { app } from '@iyulab/modern-app';

const client = new HttpClient({
  baseUrl: '/api',
  onResponse: (res) => {
    if (res.status === 401) app.navigate('/login');
  },
});
```

No dedicated `onUnauthorized` hook is needed — `app.navigate()` is the
same primitive used everywhere else.
