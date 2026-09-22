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

  /** Shell chrome icon source and names. Only the keys you set replace the defaults. */
  icons?: SidebarIconsConfig;

  /** Per-part CSS style overrides. */
  styles?: StyleMap<SidebarParts>;
}
```

### `icons` — where the shell's own chrome icons come from

The shell draws three chrome icons of its own: the mobile menu toggle, the sidebar collapse toggle,
and the overlay close button. They resolve from the `internal` bundle, which `@iyulab/components`
bakes in at build time, so **the shell never reaches the network to draw itself** — an app deployed
without internet access still gets its toggles.

```typescript
export interface SidebarIconsConfig {
  /** Library the names below resolve from. Default `'internal'` (bundled, no network). */
  lib?: string;
  /** Mobile header, menu open. Default `'menu-2'`. */
  menu?: string;
  /** Mobile header, menu close. Default `'x'`. */
  close?: string;
  /** Sidebar collapse/expand toggle. Default `'layout-sidebar'`. */
  sidebarToggle?: string;
  /** Overlay close button. Default `'x'`. */
  overlayClose?: string;
}
```

Point the shell at your own icon set by giving the library **and** the names — the defaults are
`internal` bundle names, and another library is not guaranteed to have them:

```typescript
icons: { lib: 'app', menu: 'list', close: 'x-lg', sidebarToggle: 'layout-sidebar' }
```

> Before 0.24.0 the two toggles were hard-coded to `lib="bootstrap"`, which `@iyulab/components`
> resolves over a CDN. An app that baked its own icons into the bundle still could not reach those
> two — the shell did not route through its registration — so on a network-isolated deployment the
> toggles stayed blank and a failing request repeated on every render. The default moved to the
> bundled set, which also settles a smaller inconsistency: the shell used to draw two different
> close glyphs, a CDN one in the mobile header and a bundled one on the overlay.

### `logo` variants

Clicking the logo navigates to `/` by default (override with `href` on the image variant). An icon
name that fails to resolve (a 404 or an unknown name) draws the default navigation icon instead, so the
home target never collapses to nothing; leaving `logo` out draws no logo at all.

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
| `main` | Main content area (the scroll container) |
| `main-content` | Wrapper holding route content inside `main` — the shell puts `inert` here while the overlay is open |
| `progress` | Top linear progress bar |
| `overlay` | Route-independent overlay panel above `main` |
| `overlay-close` | The overlay's close button |

---

## Route-independent overlay

`<u-sidebar-layout>` has a second slot, `slot="overlay"`, that floats above `main` independently of
routing. Fill it to show a panel over whatever screen is active — without wrapping every route or
losing that screen's scroll position — and empty it to remove the panel.

```html
<u-sidebar-layout id="shell"></u-sidebar-layout>
<script>
  function openDetail(record) {
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.textContent = 'Order #' + record.id;
    shell.appendChild(panel);
  }
  shell.addEventListener('overlay-close', () => {
    shell.querySelector('[slot="overlay"]')?.remove();
  });
</script>
```

⚠ `hidden` / `display: none` on the slotted panel does **not** close the overlay — the slot has to be
emptied for the shell to see it as closed.

### What the shell owns, and what it does not

The overlay is a **layer**, not a modal dialog. Splitting that precisely is what keeps a consumer
from either re-implementing what the shell already does, or dropping what it does not.

| Concern | Owner | How |
|---|---|---|
| Placement, size and scrolling of the panel | shell | `part="overlay"` covers the main region and scrolls on its own |
| Painting above route content | shell | while the overlay is open, `part="main-content"` becomes its own stacking context, so a `z-index` in route content cannot paint through the panel |
| Making route content non-interactive | shell | `inert` on `part="main-content"`, which propagates through the slot into your route content |
| A close affordance | shell | `part="overlay-close"`, firing the non-cancelable `overlay-close` event |
| Keeping the route mounted underneath | shell | the overlay is independent of routing |
| **Moving focus into the panel when it opens** | **consumer** | focus the panel or its first control yourself |
| **Restoring focus when it closes** | **consumer** | remember the trigger and re-focus it |
| **Escape to close** | **consumer** | the shell binds no key; listen for it and empty the slot |
| **A backdrop / dimmed scrim** | **consumer** | the panel is opaque and full-bleed by design; add a scrim inside your panel if you want one |
| **Announcing the panel to assistive tech** | **consumer** | put `role`/`aria-label` (or `aria-modal`, if you have made it modal) on *your* panel — the shell does not know what it holds |

⚠ **`inert` is applied to `part="main-content"`, not to `part="main"`.** `part="main"` is the scroll
container and stays interactive so it can keep scrolling; the wrapper inside it is what goes inert.
Reading `inert` off `part="main"` reports `false` and says nothing about whether the shell applied it.
There is also no reliable way to check it by enumeration — `querySelectorAll` still returns focusable
elements inside an inert subtree. Inertness shows up when something tries to *take* focus, not when
you count what is there.

⚠ **Page-level scroll is not locked**, deliberately. In the shell model `part="main"` is the scroller
and the overlay covers it, so there is nothing behind it to scroll. If your app instead lets the
document itself scroll, locking that is yours.

The skill pack's [`layout.md`](../skills/modern-app/references/layout.md) carries the same contract
alongside the rest of the sidebar reference.
