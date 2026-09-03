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
   * shell is built — authenticated shows the shell, unauthenticated renders
   * `renderLogin`'s UI instead. Omit for full backward compatibility (no gate).
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
interface AuthGateConfig {
  /** Resolve the current session. Return a value for authenticated, `null`/`undefined` for not. */
  me: () => Promise<unknown | null | undefined> | unknown | null | undefined;

  /**
   * Renders login UI into `context.root` when unauthenticated. Call `context.onSuccess()` on
   * success. Return a cleanup function to have it called on app load/`unload`.
   */
  renderLogin: (context: AuthGateContext) => (() => void) | void;

  /** Called once authenticated, right before the app shell is built. */
  onAuthenticated?: (user: unknown) => void | Promise<void>;
}

interface AuthGateContext {
  /** Root element to render the login UI into (same as `AppConfig.root`, default `document.body`). */
  root: Element;
  /** Call on successful login — the app (re)loads and the shell appears. */
  onSuccess: () => void;
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

  /** Permission filter — hides items whose requirement fails. Unset shows everything. */
  hasPermission?: (code: string) => boolean;

  styles?: StyleMap<SidebarParts>;
}
```

See [layout.md](./layout.md) for all `SidebarItem` variants and the `hasPermission` filter.

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
  force?: boolean;

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

`context` is a `RouteContext` plus `error: RouteError` (`RouteError` — importable from
`@iyulab/router`, `code`/`original`/`timestamp` alongside the inherited `message`).

```typescript
interface FallbackRouteConfig {
  /** Sets `document.title` when the fallback renders. */
  title?: string;

  render: (context: RouteContext & { error: RouteError }) => TemplateResult | Promise<TemplateResult>;
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
