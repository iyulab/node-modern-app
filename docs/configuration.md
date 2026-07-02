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
   * Layout configuration.
   * Only 'sidebar' type is currently supported.
   */
  layout: LayoutConfig;

  /** Theme initialization options. See theme.md. */
  theme?: ThemeInitOptions;

  /** i18next options. Omit to skip i18next initialization. See i18n.md. */
  i18n?: I18nInitOptions;
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
  styles?: StyleMap<SidebarParts>;
}
```

See [layout.md](./layout.md) for all `SidebarItem` variants.

---

## `ThemeInitOptions`

```typescript
interface ThemeInitOptions {
  default?: 'system' | 'light' | 'dark';
  debug?: boolean;
  store?: false | {
    type: 'cookie' | 'localStorage' | 'sessionStorage';
    prefix?: string;
  };
  useBuiltIn?: boolean;
}
```

---

## `RouteConfig`

```typescript
interface RouteConfig {
  index?: boolean;
  path?: string;
  title?: string;
  force?: boolean;
  render: (context: RouteContext) => TemplateResult | Promise<TemplateResult>;
}
```

---

## `RouteContext`

```typescript
interface RouteContext {
  href: string;
  pathname: string;
  basepath: string;
  params: Record<string, string>;
  progress: (value: number) => void;
}
```

---

## `FallbackRouteConfig`

```typescript
interface FallbackRouteConfig {
  render: (context: RouteContext) => TemplateResult | Promise<TemplateResult>;
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
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
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
| `theme` | `Theme` | Theme utility (`get`, `set`, `isInitialized`) |
| `i18n` | `i18next` | Raw i18next instance |
