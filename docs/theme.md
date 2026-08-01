# Theme Management

`@iyulab/modern-app` delegates theme handling to the `Theme` utility from `@iyulab/components`. It supports `light`, `dark`, and `system` (follows `prefers-color-scheme`) modes.

---

## Initialization

Theme is initialized automatically when you call `app.load()`. Pass a `theme` option to customize behaviour:

```typescript
await app.load({
  // ...
  theme: {
    default: 'system',
    store: { type: 'localStorage', prefix: 'myapp' },
    useBuiltIn: true,
  },
});
```

### `ThemeInitOptions`

```typescript
interface ThemeInitOptions {
  /** Initial theme. Default: 'system' */
  default?: 'system' | 'light' | 'dark';

  /** Log theme decisions to console. Useful during development. */
  debug?: boolean;

  /**
   * Persist the user's preference across sessions.
   * Set to `false` to disable all persistence.
   * Omit to use localStorage with no prefix.
   */
  store?: false | {
    type: 'cookie' | 'localStorage' | 'sessionStorage';
    prefix?: string;
  };

  /**
   * Inject built-in CSS custom property definitions (light.css / dark.css).
   * Set to `false` when providing your own theme tokens.
   * Default: true
   */
  useBuiltIn?: boolean;
}
```

---

## Reading and changing the theme at runtime

Access the `Theme` utility through the `app.theme` property:

```typescript
// Read the current theme
app.theme.get();           // 'system' | 'light' | 'dark' | undefined

// Change the theme
app.theme.set('dark');     // 'system' | 'light' | 'dark'
app.theme.set('system');   // revert to OS preference

// Check if Theme.init() has run
app.theme.isInitialized;   // boolean
```

---

## Theme in components

All `@iyulab/components` elements respond to theme changes automatically via CSS custom
properties. Use the same tokens in your own styles — but pick the right **layer**.

### Three layers, and which one you should touch

| Layer | Example | Override it? |
|---|---|---|
| **Palette** | `--u-blue-600`, `--u-neutral-800` | ❌ **No.** A palette name is a promise about its value — redefining `--u-blue-600` to your brand colour also repaints every place that genuinely needs *blue* (info badges, charts, links). |
| **Role** | `--u-primary-color`, `--u-txt-color`, `--u-border-color` | ✅ **Yes.** This is the rebranding surface. Each role token resolves to a palette entry per theme. |
| **Shell contract** | `--app-sidebar-*`, `--app-header-*` | ✅ Yes, when the shell should differ from the rest of the app. |

Rebranding is therefore one declaration:

```css
:root { --u-primary-color: #7B1FA2; }   /* sidebar active menu follows automatically */
```

---

## Shell surface tokens

The app shell (sidebar / mobile header) reads the tokens below. **Every one of them is
optional** — when unset it derives from a role token, so an app that only sets
`--u-primary-color` still gets a coherent shell.

| Token | Default | Applies to |
|---|---|---|
| `--app-sidebar-bg` | `--u-panel-bg-color` | Sidebar background |
| `--app-sidebar-fg` | `--u-txt-color` | Sidebar text and icons |
| `--app-sidebar-active-bg` | `--u-primary-color` | Active menu background |
| `--app-sidebar-active-fg` | `--u-txt-color-inverse` | Active menu text |
| `--app-sidebar-width` | `260px` | Sidebar width (`default` / `modal` states) |
| `--app-sidebar-width-slim` | `64px` | Sidebar width (`slim` state) |
| `--app-header-bg` | `--u-panel-bg-color` | Mobile header background |
| `--app-header-fg` | `--u-txt-color` | Mobile header text |

```css
:root {
  --app-sidebar-bg: #0F172A;          /* dark rail beside a light content area */
  --app-sidebar-fg: #CBD5E1;
  --app-sidebar-active-bg: #38BDF8;
  --app-sidebar-width: 220px;
}
```

**Hover states are derived, not separate tokens.** The active-menu hover is
`color-mix(in srgb, var(--app-sidebar-active-bg) 85%, black)`, so overriding either
`--app-sidebar-active-bg` or `--u-primary-color` moves the hover with it. There is no
token to set the two out of step — that is deliberate: a mismatched pair is the defect
this contract exists to prevent, not a feature.
