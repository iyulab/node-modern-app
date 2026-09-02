# Sidebar Layout Reference — @iyulab/modern-app

## `SidebarLayoutConfig`

```typescript
interface SidebarLayoutConfig {
  type: 'sidebar';

  /** Icon name (string) | image ({ src, alt?, href? }) | custom render function. Click navigates to `/` by default, or `href` if given (image variant). */
  logo?: string | { src: string; alt?: string; href?: string } | ((state: SidebarState) => TemplateResult<1> | HTMLElement | string);

  /** Application title displayed beside the logo. */
  title?: string;

  /** Main (top) navigation items. */
  main?: SidebarItem[];

  /** Footer (bottom-pinned) items. */
  footer?: SidebarItem[];

  /** Accessible name for the main nav landmark (`<nav class="sidebar-main">`), reflected as `aria-label`. Unset by default. */
  mainAriaLabel?: string;

  /** Permission filter — hides items (and emptied section/groups) whose requirement fails. Unset shows everything. See "권한 기반 메뉴 필터" below. */
  hasPermission?: (code: string) => boolean;

  /** Per-part style overrides (CSS custom properties / inline styles). */
  styles?: StyleMap<SidebarParts>;
}
```

---

## `SidebarItem` union

`SidebarItem` is the union of all six item types below.

### `SidebarLinkConfig` — `type: 'link'`

A single navigation link. Highlights automatically when the current URL matches `href` (or `pattern`).

```typescript
interface SidebarLinkConfig {
  type: 'link';
  label: string | DirectiveResult;
  href: string;
  icon?: string;
  lib?: string;
  /** Override the URL matching pattern. Accepts a string or URLPattern. */
  pattern?: string | URLPattern;
  /** Let the browser navigate instead of the router. For same-origin, non-SPA paths. */
  navigate?: 'router' | 'document';
  /** Anchor target. Use for opening in a new tab. */
  target?: '_self' | '_blank';
  styles?: StyleMap<'host' | 'base' | 'icon' | 'label'>;
}
```

Example:

```typescript
{ type: 'link', icon: 'dashboard', label: 'Dashboard', href: '/' }
```

#### Linking outside the app

Not every entry in a real menu is a SPA screen. A help site, a report endpoint, an
admin console, a legacy page — these sit in the same list. Mark them so the router
leaves the click alone:

```typescript
{ type: 'link', icon: 'help', label: 'Help', href: '/help/', navigate: 'document' }
```

The entry stays an anchor, which is the point: middle-click and Ctrl+click still open
a tab, the address is copyable, screen readers announce a link, `pattern`-based
highlighting still works, and it can live inside a section or group. `target: '_blank'`
is available too, but it is not a substitute — it forces a new tab, so same-tab
navigation to another document needs `navigate`.

---

### `SidebarGroupConfig` — `type: 'group'`

Collapsible group that contains links.

```typescript
interface SidebarGroupConfig {
  type: 'group';
  icon: string;
  lib?: string;
  label: string | DirectiveResult;
  items: SidebarLinkConfig[];
  /** Start collapsed. Default: true */
  collapsed?: boolean;
  styles?: StyleMap<'host' | 'header' | 'icon' | 'label' | 'caret' | 'items'>;
}
```

Example:

```typescript
{
  type: 'group',
  icon: 'settings',
  label: 'Settings',
  collapsed: false,
  items: [
    { type: 'link', label: 'Profile',  href: '/settings/profile' },
    { type: 'link', label: 'Security', href: '/settings/security' },
  ],
}
```

---

### `SidebarSectionConfig` — `type: 'section'`

Labelled section that groups links and groups.

```typescript
interface SidebarSectionConfig {
  type: 'section';
  title: string | DirectiveResult;
  subTitle?: string | DirectiveResult;
  items: (SidebarGroupConfig | SidebarLinkConfig)[];
  styles?: StyleMap<'host' | 'header' | 'title' | 'subtitle' | 'items'>;
}
```

Example:

```typescript
{
  type: 'section',
  title: 'Administration',
  items: [
    { type: 'link', icon: 'users',    label: 'Users',    href: '/admin/users' },
    { type: 'link', icon: 'database', label: 'Database', href: '/admin/db' },
  ],
}
```

---

### `SidebarButtonConfig` — `type: 'button'`

Action button — triggers a callback instead of navigating.

```typescript
interface SidebarButtonConfig {
  type: 'button';
  id?: string;
  icon?: string;
  lib?: string;
  label: string | DirectiveResult;
  onClick: () => void;
  styles?: StyleMap<string>;
}
```

Example:

```typescript
{ type: 'button', icon: 'logout', label: 'Sign Out', onClick: () => auth.signOut() }
```

`id` is passed straight through to the rendered `<u-sidebar-button>` host. **It does not enable
anchoring a `u-popover` you place outside the layout** — the button lives inside
`<u-sidebar-layout>`'s own shadow root, and `querySelector`/`for="#id"` never crosses a shadow
boundary. If you need a popover anchored to a sidebar item, use `type: 'html'` and assemble both
inside the same template — see [popup-style submenus](#popup-style-submenus-u-popover) below.

---

### `SidebarHtmlConfig` — `type: 'html'`

Renders a custom Lit template or raw HTML element. The `render` function
receives the current sidebar state so you can adapt the content.

```typescript
interface SidebarHtmlConfig {
  type: 'html';
  render: (state: SidebarState) => TemplateResult<1> | HTMLElement | string;
}
```

`SidebarState` values: `'default'` | `'slim'` | `'modal'` | `'mobile'` | `'mobile-open'`

Example:

```typescript
{
  type: 'html',
  render: (state) => html`
    <div class="user-card" ?hidden=${state === 'slim'}>
      <img src="/avatar.png" />
      <span>John Doe</span>
    </div>
  `,
}
```

---

### Popup-style submenus (`u-popover`)

For a submenu that flies out from a sidebar item (rather than expanding in place like
`SidebarGroupConfig`), assemble a `u-popover` and its trigger together inside a single
`type: 'html'` item — both then live in the sidebar layout's own shadow root, which is required
for `for="#id"` anchoring to resolve (see the `id` note above).

```typescript
{
  type: 'html',
  render: (state) => html`
    <u-sidebar-button id="more-trigger" icon="three-dots" label="More"></u-sidebar-button>
    <u-popover for="#more-trigger" placement=${state.startsWith('mobile') ? 'bottom-start' : 'right-start'}>
      <u-menu>
        <u-menu-item @click=${doA}>Action A</u-menu-item>
        <u-menu-item @click=${doB}>Action B</u-menu-item>
      </u-menu>
    </u-popover>
  `,
}
```

⚠**Pick `placement` based on `state`, not a fixed value.** On `mobile`/`mobile-open`, the sidebar
itself widens to occupy nearly the full screen — a sideways placement (`right-start`, the natural
choice for a desktop flyout) then has no room on either side, and `flip()` correctly declines to
flip when the opposite side has none either. The popover renders off-screen and is invisible. A
vertical placement (`bottom-start`) has room regardless of sidebar width and works at every state.
Confirmed empirically in `tests/browser/sidebar-popover-submenu.browser.test.ts` — this is not a
`strategy="absolute"` vs `"fixed"` distinction, switching strategy does not change the outcome.

---

## Sidebar parts

Parts available for `styles` overrides on the root layout:

| Part | Element |
|------|---------|
| `host` | Outer layout shell |
| `mobile-header` | Top bar shown on mobile |
| `sidebar` | Sidebar panel |
| `sidebar-header` | Logo + title area |
| `sidebar-main` | Scrollable main nav area |
| `sidebar-footer` | Pinned footer area |
| `main` | Main content area |
| `progress` | Top progress bar |

---

## Responsive behaviour

| Screen width | Sidebar state |
|--------------|--------------|
| < breakpoints[0] | `mobile` / `mobile-open` |
| breakpoints[0] – breakpoints[1] | `slim` (icons only) |
| > breakpoints[1] | `default` (full labels) |

Default breakpoints: `[768, 1024]` px.
Override per app:

```typescript
layout: {
  type: 'sidebar',
  breakpoints: [640, 1280],
  // ...
}
```
