# Configuration Reference

Complete TypeScript interface reference for `@iyulab/modern-app`.

---

## `AppConfig`

```typescript
interface AppConfig {
  /**
   * Root element the layout is mounted into.
   * @default document.body
   */
  root?: Element;

  /**
   * Base path prefix for all routes.
   * @default '/'
   */
  basepath?: string;

  /**
   * Where the route lives in the address — forwarded to @iyulab/router's `mode`.
   * 'history': the path (needs a server fallback for refreshes and deep links).
   * 'hash': after `#` (`/app/#/orders/7`) — works on a static host with no server configuration.
   * @default 'history'
   */
  routerMode?: 'history' | 'hash';

  /**
   * Base URL for icon assets, forwarded to @iyulab/components icon loader.
   * @default '/assets/icons/'
   */
  iconBasepath?: string;

  /** Route definitions. See routing.md. */
  routes?: RouteConfig[];

  /** Rendered when no route matches or an error occurs. */
  fallback?: FallbackRouteConfig;

  /**
   * Global auth/authorization guard, called before every navigation.
   * `string` = redirect, `false` = cancel (403), `true`/undefined = proceed.
   * See [routing.md](./routing.md#authentication--guards).
   */
  enter?: (ctx: RouteContext) => Promise<string | boolean> | string | boolean;

  /**
   * Whether to auto-navigate to the current URL on load.
   * @default true
   */
  initialLoad?: boolean;

  /**
   * Whether to intercept `<a>` tag clicks for client-side routing.
   * @default true
   */
  useIntercept?: boolean;

  /**
   * Layout configuration.
   * Only 'sidebar' type is currently supported.
   */
  layout: LayoutConfig;

  /** Theme initialization options. See theme.md. */
  theme?: ThemeInitOptions;

  /** i18next options. Omit to skip i18next initialization. See i18n.md. */
  i18n?: I18nInitOptions;

  /**
   * Boot-time auth gate. When set, resolves the session via `me()` before the app
   * shell is built — `authenticated` shows the shell, `anonymous` renders
   * `renderLogin`'s UI instead, and `unknown` (or `me()` throwing) renders
   * `renderUnavailable`. Omit for full backward compatibility (no gate).
   * See the README's "부팅 인증 게이트" section for a worked example.
   */
  auth?: AuthGateConfig;
}
```

---

## `AuthGateConfig` / `AuthGateContext`

The framework owns only the orchestration (check → branch → reload) — session lookup/login itself
(HTTP), the user/permission shape, and mid-session 401 handling belong to the app (or
`@iyulab/enterprise`'s `createAuthClient`/`createODataService`).

```typescript
/**
 * A session lookup's answer. "Signed out" and "could not tell" are different answers — treating a
 * brief 503 as signed out sends a signed-in user to the login screen. `@iyulab/enterprise`'s
 * `createAuthClient().fetchMe()` returns exactly this shape: `me: () => auth.fetchMe()`.
 */
type AuthSession<TUser = unknown> =
  | { status: 'authenticated'; user: TUser }   // shell loads; app.user = user
  | { status: 'anonymous' }                    // renderLogin
  | { status: 'unknown'; error: unknown };     // renderUnavailable

interface AuthGateConfig {
  /**
   * Resolve the current session — sync or async. Throwing counts as `unknown`. An answer whose
   * `status` is not one of the three makes `app.load()` reject with a `TypeError`: a user object
   * or `null` is never guessed to mean "signed in".
   */
  me: () => AuthSession | Promise<AuthSession>;

  /**
   * Renders login UI into `context.root` when unauthenticated. Call `context.onSuccess()` on
   * success. Return a cleanup function to have it called on app load/`unload`.
   */
  renderLogin: (context: AuthGateContext) => (() => void) | void;

  /**
   * Renders a "can't reach the server" view into `context.root` when the session is `unknown`
   * (or `me()` throws). Call
   * `context.retry()` to check again (a retry button, the `online` event). Return a cleanup
   * function to have it called on app load/`unload`. Without it, `app.load()` rejects with
   * that error.
   */
  renderUnavailable?: (context: AuthGateUnavailableContext) => (() => void) | void;

  /** Called once authenticated, right before the app shell is built. */
  onAuthenticated?: (user: unknown) => void | Promise<void>;
}

interface AuthGateContext {
  /** Root element to render the login UI into (same as `AppConfig.root`, default `document.body`). */
  root: Element;
  /** Call on successful login — the app (re)loads and the shell appears. */
  onSuccess: () => void;
}

interface AuthGateUnavailableContext {
  /** Root element to render into (same as `AppConfig.root`, default `document.body`). */
  root: Element;
  /** The `unknown` answer's `error`, or what `me()` threw. */
  error: unknown;
  /** Check again — the app (re)loads and calls `me()` again. */
  retry: () => void;
}
```

---

## `LayoutConfig`

```typescript
type LayoutConfig = SidebarLayoutConfig & {
  /**
   * Responsive breakpoints [tablet-min-px, desktop-min-px].
   * @default [768, 1024]
   */
  breakpoints?: [number, number];
};
```

---

## `SidebarLayoutConfig`

```typescript
interface SidebarLayoutConfig {
  type: 'sidebar';
  logo?: string | { src: string; alt?: string; href?: string } | ((state: SidebarState) => TemplateResult<1> | HTMLElement | string);
  title?: string;
  main?: SidebarItem[];
  footer?: SidebarItem[];

  /** Accessible name for the main nav landmark, reflected as `aria-label`. Unset by default. */
  mainAriaLabel?: string;

  /** Accessible name for the app-level notice stack (`slot="notice"`) — makes it a `role="region"` landmark. Unset by default. */
  noticesAriaLabel?: string;

  /** Permission filter — hides items whose requirement fails. Unset shows everything. */
  hasPermission?: (code: string) => boolean;

  /**
   * Called on `route-done`, just before the shell places focus on the new screen.
   * Receives the new route's `RouteContext` and the container itself (same element as
   * `SidebarLayout.mainElement`) — implement scroll reset/save/restore here. Unset
   * (default) does nothing, matching Vue Router's unset `scrollBehavior`.
   */
  scrollBehavior?: (context: RouteContext, main: HTMLElement) => void;

  /**
   * Shell chrome icon source and names — only the keys you set replace the defaults.
   * Defaults resolve from the bundled `internal` set, so the shell draws itself without
   * reaching the network. See `docs/layout.md` § `icons`.
   */
  icons?: SidebarIconsConfig;

  styles?: StyleMap<SidebarParts>;
}
```

See [layout.md](./layout.md) for all `SidebarItem` variants, the `hasPermission` filter, and
`scrollBehavior`/`mainElement`.

---

## `ThemeInitOptions`

```typescript
interface ThemeInitOptions {
  default?: 'system' | 'light' | 'dark';
  debug?: boolean;
  /** `type: 'cookie'` also accepts path/domain/expires/sameSite/partitioned -- see
   * @iyulab/components's BrowserStorage reference. No 'sessionStorage' backend exists. */
  store?: false | { type: 'localStorage'; prefix?: string } | { type: 'cookie'; prefix?: string };
  useBuiltIn?: boolean;
}
```

---

## `RouteConfig`

Re-exported unchanged from `@iyulab/router`. `children` nests routes under a shared layout —
see [routing.md](./routing.md#nested-routes).

```typescript
interface RouteConfig {
  /** Identifier used internally by the router (auto-generated if omitted). */
  id?: string;

  index?: boolean;
  path?: string | URLPattern;
  title?: string;
  key?: (context: RouteContext) => string;

  /** Case-insensitive path matching. Default: false */
  ignoreCase?: boolean;

  metadata?: Record<string, unknown>;
  enter?: (context: RouteContext) => Promise<string | boolean> | string | boolean;

  /** Child routes, matched relative to this route's path. */
  children?: RouteConfig[];

  render: (context: RouteContext) => TemplateResult | Promise<TemplateResult>;
}
```

---

## `RouteContext`

```typescript
interface RouteContext {
  href: string;

  /** Domain name portion of the URL (e.g. `https://example.com`). */
  origin: string;

  basepath: string;

  /** Full path including query string and hash (e.g. `/users/1?tab=info#top`). */
  path: string;

  pathname: string;
  params: Record<string, string | undefined>;
  query: URLSearchParams;

  /** Hash portion of the URL, if present (e.g. `#top`). */
  hash?: string;

  metadata: Record<string, unknown>;
  progress: (value: number) => void;
}
```

---

## `FallbackRouteConfig`

`context` is a `RouteContext` plus `error: RouteError` (`code`/`original`/`timestamp` alongside the
inherited `message`). `RouteError` and its subclasses — `AccessDeniedError` (an `enter` guard returned
`false`, code 403) · `NotFoundError` (404) · `ContentLoadError` · `ContentRenderError` ·
`OutletMissingError` — are exported from `@iyulab/modern-app`, so `ctx.error instanceof AccessDeniedError`
works without a direct router dependency. A blocked screen is not an outage: render it with
`<u-empty-state variant="no-access">`, not `variant="error"`.

Leave `fallback` out and the app draws these states itself: 403 → `<u-empty-state variant="no-access">` ·
404 → `variant="not-found"` · any other failure → `variant="error"` with the title "Couldn’t open this page"
and the error message as its description. A `fallback` you give replaces that default entirely.

That default is exported as `defaultFallback`. An app that builds its own `Router` instead of calling
`app.load()` passes it to get the same screens and tab titles, and keeps getting the package's fixes to them:

```typescript
import { Router } from '@iyulab/router';
import { defaultFallback } from '@iyulab/modern-app';

new Router({ root, routes, fallback: defaultFallback });
// Change one part and keep the rest: { ...defaultFallback, render: (ctx) => … }
```

```typescript
interface FallbackRouteConfig {
  /**
   * Sets `document.title` when the fallback renders. A function is called with each failure — use it when the
   * title depends on the error. Returning nothing (or an empty string) falls back to the error message.
   */
  title?: string | ((context: RouteContext & { error: RouteError }) => string | undefined);

  render?: (context: RouteContext & { error: RouteError }) => unknown;
}
```

---

## `I18nInitOptions`

```typescript
type I18nInitOptions = i18next.InitOptions & {
  plugins?: (Module | NewableModule<Module> | Newable<Module>)[];
};
```

---

## `NotificationOptions`

```typescript
interface NotificationOptions {
  title?: string;
  duration?: number;   // ms, default 3000
  position?: 'top-left' | 'top-center' | 'top-right'
    | 'middle-left' | 'middle-center' | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';
}
```

---

## `app` singleton — methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `load` | `(config: AppConfig) => Promise<void>` | Initialize and mount the application |
| `unload` | `() => void` | Tear down layout, router, and screen observer |
| `navigate` | `(path: string) => void` | Push a new client-side route |
| `notice` | `(msg: string, opts?: NotificationOptions) => Promise<void>` | Neutral toast |
| `info` | `(msg: string, opts?: NotificationOptions) => Promise<void>` | Info toast |
| `success` | `(msg: string, opts?: NotificationOptions) => Promise<void>` | Success toast |
| `warning` | `(msg: string, opts?: NotificationOptions) => Promise<void>` | Warning toast |
| `error` | `(msg: string, opts?: NotificationOptions) => Promise<void>` | Error toast |

## `app` singleton — properties

| Property | Type | Description |
|----------|------|-------------|
| `config` | `AppConfig \| undefined` | Current configuration passed to `load()` |
| `router` | `Router \| undefined` | Underlying `@iyulab/router` instance |
| `screen` | `'small' \| 'medium' \| 'large' \| undefined` | Current breakpoint category |
| `user` | `unknown` | Authenticated user when the `auth` boot gate is used; `undefined` if unauthenticated or unused |
| `theme` | `Theme` | Theme utility (`get`, `set`, `isInitialized`) |
| `i18n` | `i18next` | Raw i18next instance |
