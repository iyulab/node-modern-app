# API Reference — @iyulab/modern-app

## `AppConfig`

```typescript
interface AppConfig {
  /** Root element to render into. Default: document.body */
  root?: Element;

  /** Base path for all routes. Default: '/' */
  basepath?: string;

  /** Base URL for icon assets. Default: '/assets/icons/' */
  iconBasepath?: string;

  /** Route definitions. */
  routes?: RouteConfig[];

  /** Fallback rendered on 404 or unhandled errors. */
  fallback?: FallbackRouteConfig;

  /** Layout configuration. Currently only 'sidebar' is supported. */
  layout: LayoutConfig;

  /** Theme initialization options. */
  theme?: ThemeInitOptions;

  /** i18next options plus optional plugins array. Omit to skip i18n. */
  i18n?: I18nInitOptions;
}
```

---

## `LayoutConfig`

```typescript
type LayoutConfig = SidebarLayoutConfig & {
  /** Responsive breakpoints [tablet-min, desktop-min] in px. Default: [768, 1024] */
  breakpoints?: [number, number];
};
```

---

## `ThemeInitOptions`

```typescript
interface ThemeInitOptions {
  /** Initial theme. Default: 'system' */
  default?: 'system' | 'light' | 'dark';

  /** Log theme decisions to console. */
  debug?: boolean;

  /**
   * Persist the user's preference.
   * Set to `false` to disable persistence.
   * Default: localStorage with no prefix.
   */
  store?: false | {
    type: 'cookie' | 'localStorage' | 'sessionStorage';
    prefix?: string;
  };

  /** Apply built-in CSS custom properties. Default: true */
  useBuiltIn?: boolean;
}
```

---

## `RouteConfig`

```typescript
interface RouteConfig {
  /** Matches the root path (equivalent to `path: ''`). */
  index?: boolean;

  /** Path string. Supports `:param` segments. */
  path?: string;

  /** Sets `document.title` when the route activates. */
  title?: string;

  /** Force a re-render even if the path did not change. */
  force?: boolean;

  /** Render function. May be async. */
  render: (context: RouteContext) => RenderResult | Promise<RenderResult>;
}
```

---

## `RouteContext`

```typescript
interface RouteContext {
  /** Full URL string. */
  href: string;

  /** Pathname portion of the URL. */
  pathname: string;

  /** Configured basepath. */
  basepath: string;

  /** Named URL parameters extracted from the path pattern. */
  params: Record<string, string>;

  /**
   * Report loading progress (0–100).
   * Drives the progress bar shown in the layout header.
   */
  progress: (value: number) => void;
}
```

---

## `FallbackRouteConfig`

```typescript
interface FallbackRouteConfig {
  render: (context: RouteContext) => RenderResult | Promise<RenderResult>;
}
```

The fallback `RouteContext` will include an `error` property when triggered by
a routing error.

---

## `I18nInitOptions`

```typescript
type I18nInitOptions = i18next.InitOptions & {
  /** i18next plugins to register via i18next.use() before init. */
  plugins?: (Module | NewableModule<Module> | Newable<Module>)[];
};
```

---

## `NotificationOptions`

```typescript
interface NotificationOptions {
  title?: string;
  duration?: number;   // milliseconds, default 3000
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
```

---

## `app` singleton methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `load` | `(config: AppConfig) => Promise<void>` | Initialize and mount the application |
| `unload` | `() => void` | Tear down layout, router, and observers |
| `navigate` | `(path: string) => void` | Push a new route |
| `notice` | `(msg, opts?) => Promise<void>` | Show a neutral toast |
| `info` | `(msg, opts?) => Promise<void>` | Show an info toast |
| `success` | `(msg, opts?) => Promise<void>` | Show a success toast |
| `warning` | `(msg, opts?) => Promise<void>` | Show a warning toast |
| `error` | `(msg, opts?) => Promise<void>` | Show an error toast |

### `app` singleton properties

| Property | Type | Description |
|----------|------|-------------|
| `config` | `AppConfig \| undefined` | Current config passed to `load()` |
| `router` | `Router \| undefined` | Underlying `@iyulab/router` instance |
| `screen` | `ScreenSize \| undefined` | Current responsive screen size |
| `theme` | `Theme` (static) | Theme utility (`get`, `set`, `isInitialized`) |
| `i18n` | `i18next` | Raw i18next instance |
