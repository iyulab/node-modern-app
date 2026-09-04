# Sidebar Layout

The only layout type currently available is `'sidebar'`. It provides a responsive shell with:

- A collapsible sidebar (logo, main nav, footer)
- A main content area where routes render
- A progress bar in the header during async route loads

---

## `SidebarLayoutConfig`

```typescript
interface SidebarLayoutConfig {
  type: 'sidebar';

  /** Icon name (string) | image ({ src, alt?, href? }) | custom render function. */
  logo?: string | { src: string; alt?: string; href?: string } | ((state: SidebarState) => TemplateResult<1> | HTMLElement | string);

  /** Application title displayed beside the logo. */
  title?: string;

  /** Main (top) navigation items. */
  main?: SidebarItem[];

  /** Footer (bottom-pinned) items. */
  footer?: SidebarItem[];

  /**
   * Accessible name for the main nav landmark (`<nav class="sidebar-main">`), reflected as
   * `aria-label`. Unset by default (no landmark name) — not a breaking change to add later.
   * Independent of `title`, which is the brand text shown in the sidebar header.
   */
  mainAriaLabel?: string;

  /**
   * Permission filter. When set, items whose `requirePermission`/`requireAnyPermission` fail
   * are hidden — a section/group left with no visible items is hidden entirely. Unset shows
   * everything (no filtering). Typically `@iyulab/enterprise`'s `hasPermission` store getter.
   */
  hasPermission?: (code: string) => boolean;

  /**
   * Called on `route-done`, just before focus moves to the main scroll container.
   * Receives the new route's `RouteContext` and the container itself (same element
   * `mainElement` returns) — implement scroll reset/save/restore in here. Unset
   * (default) does nothing to the scroll position, matching Vue Router's unset
   * `scrollBehavior`.
   */
  scrollBehavior?: (context: RouteContext, main: HTMLElement) => void;

  /** Per-part CSS style overrides. */
  styles?: StyleMap<SidebarParts>;
}
```

### `logo` variants

Clicking the logo navigates to `/` by default (override with `href` on the image variant).

```typescript
logo: 'rocket',                                          // icon name (u-icon)
logo: { src: '/assets/logo.svg', alt: 'Acme' },           // image, click → home
logo: { src: '/assets/logo.svg', href: '/dashboard' },    // image, click → custom route
logo: (state) => html`<img src=${state === 'slim' ? '/mark.svg' : '/logo.svg'} />`, // custom render
```

Combined with the shared `breakpoints` option from `LayoutConfig`:

```typescript
layout: {
  type: 'sidebar',
  breakpoints: [768, 1024], // [tablet-min-px, desktop-min-px] — default
  // ...
}
```

---

### Scroll position on navigation

`SidebarLayout` doesn't reset or restore scroll on route change by default — the same
default as Vue Router's unset `scrollBehavior`. Two pieces give you full control:

- **`layout.scrollBehavior(context, main)`** — called on every `route-done`, before focus
  moves to the container. Reset to top, or restore a saved position:

  ```typescript
  const savedPositions = new Map<string, number>();

  layout: {
    type: 'sidebar',
    scrollBehavior(context, main) {
      const saved = savedPositions.get(context.pathname);
      main.scrollTop = saved ?? 0; // restore if known, else reset to top
    },
  }
  ```

- **`sidebarLayoutEl.mainElement`** — the `SidebarLayout` element's public accessor for the
  same scroll container, for reading `scrollTop` outside the hook (e.g. saving a position
  right before navigating away, in a `route-begin` listener).

Both refer to the same element — the shadow-DOM node also exposed via CSS `part="main"`,
which remains style-only (not a JS access contract).

---

## Menu item types

`main` and `footer` accept an array of `SidebarItem`, which is a union of six types:

### `link` — navigation link

Automatically highlights when the current URL matches `href`.

```typescript
{ type: 'link', icon: 'home', label: 'Home', href: '/' }
```

Full shape:

```typescript
{
  type: 'link';
  label: string;
  href: string;
  icon?: string;
  lib?: string;
  /** Custom URL match pattern (string or URLPattern). Default: exact match on href. */
  pattern?: string | URLPattern;
}
```

---

### `group` — collapsible group of links

```typescript
{
  type: 'group',
  icon: 'settings',
  label: 'Settings',
  collapsed: false,       // default: true
  items: [
    { type: 'link', label: 'Profile',  href: '/settings/profile' },
    { type: 'link', label: 'Security', href: '/settings/security' },
  ],
}
```

---

### `section` — labelled section header

Groups `link` and `group` items under a visible heading.

```typescript
{
  type: 'section',
  title: 'Administration',
  subTitle: 'Manage your workspace',  // optional
  items: [
    { type: 'link',  icon: 'users',    label: 'Users',    href: '/admin/users' },
    { type: 'group', icon: 'database', label: 'Database',
      items: [
        { type: 'link', label: 'Tables', href: '/admin/db/tables' },
        { type: 'link', label: 'Logs',   href: '/admin/db/logs' },
      ],
    },
  ],
}
```

---

### `button` — action button (non-navigation)

Does not navigate; fires a callback instead.

```typescript
{
  type: 'button',
  icon: 'logout',
  label: 'Sign Out',
  onClick: () => auth.signOut(),
}
```

---

### `html` — custom Lit template

Renders arbitrary content inside the sidebar. Receives the current `SidebarState` so you can adapt the template when the sidebar is collapsed.

```typescript
{
  type: 'html',
  render: (state) => html`
    <div class="user-card" ?hidden=${state === 'slim'}>
      <img src="/avatar.png" alt="avatar" />
      <span>John Doe</span>
    </div>
  `,
}
```

`SidebarState` values: `'default'` | `'slim'` | `'modal'` | `'mobile'` | `'mobile-open'`

---

## Responsive behaviour

| Viewport width | Sidebar state |
|----------------|--------------|
| < `breakpoints[0]` | `mobile` / `mobile-open` (overlay) |
| `breakpoints[0]` – `breakpoints[1]` | `slim` (icons only, no labels) |
| ≥ `breakpoints[1]` | `default` (full labels) |

The `screen-resize` custom event fires on `window` whenever the screen size category changes:

```typescript
window.addEventListener('screen-resize', (e) => {
  console.log(e.detail.size); // 'small' | 'medium' | 'large'
});
```

You can also read the current size at any time:

```typescript
app.screen; // 'small' | 'medium' | 'large' | undefined
```

---

## Styling with parts

`styles` accepts a `StyleMap` keyed by part names. This allows per-instance CSS overrides without subclassing.

```typescript
layout: {
  type: 'sidebar',
  styles: {
    sidebar: { background: 'var(--u-neutral-900)' },
    'sidebar-header': { padding: '1.5rem' },
  },
  // ...
}
```

Available parts:

| Part | Element |
|------|---------|
| `host` | Outer layout shell |
| `mobile-header` | Top bar shown on mobile |
| `sidebar` | Sidebar panel |
| `sidebar-header` | Logo + title area |
| `sidebar-main` | Scrollable main navigation area |
| `sidebar-footer` | Pinned footer area |
| `main` | Main content area |
| `progress` | Top linear progress bar |
