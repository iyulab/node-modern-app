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

All `@iyulab/components` elements respond to theme changes automatically via CSS custom properties. You can use the same tokens in your own styles:

```css
:root {
  background: var(--u-neutral-0);
  color: var(--u-neutral-1000);
}
```

Token naming: `--u-{color}-{shade}` (shades: 0, 100 … 1000).

Common semantic tokens:

| Token | Usage |
|-------|-------|
| `--u-neutral-0` | Background (lightest) |
| `--u-neutral-1000` | Foreground (darkest) |
| `--u-blue-500` | Primary accent |
| `--u-red-500` | Error / danger |
| `--u-green-500` | Success |
| `--u-yellow-500` | Warning |
