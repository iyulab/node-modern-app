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

  /** Called on `route-done` (before focus moves to the container) with the new route's `RouteContext` and the scroll container itself — implement reset/save/restore here. Unset does nothing (same default as Vue Router's unset `scrollBehavior`). Also reachable outside the hook via the element's `.mainElement` accessor. */
  scrollBehavior?: (context: RouteContext, main: HTMLElement) => void;

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

**A fixed `placement` is safe as of `@iyulab/components@1.37.1`.** On `mobile`/`mobile-open`
the sidebar widens to occupy nearly the full screen, so a sideways placement (`right-start`,
the natural desktop flyout) has room on neither side. `flip()` now falls back **across the**
**axis** in exactly that case, landing the popover vertically instead of off-screen.

⚠ Against an older `components` it did render off-screen and invisible — `flip()` only ever
considered the opposite side on the same axis, found no room there either, and gave up. If you
pin below `1.37.1`, keep choosing `placement` from `state` as the snippet above does.

Choosing from `state` is still reasonable when you want to *decide* the direction rather than
let `flip()` pick it. Either way this is not a `strategy="absolute"` vs `"fixed"` distinction —
switching strategy changes nothing. Both behaviours are pinned in
`tests/browser/sidebar-popover-submenu.browser.test.ts`.

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
| `overlay` | Route-independent overlay panel above `main` |
| `overlay-close` | Overlay's close button |

---

## Sizing

`<u-sidebar-layout>` is a shell: `:host` is `height: 100%` with `overflow: hidden`, so **its
height comes from the parent** — it never sizes itself. `app.load()` covers the default case: when
`root` is `document.body` it gives the body `margin: 0`, and on screen `width: 100vw; height: 100vh`.
These come from a document stylesheet at zero specificity, not inline styles — any `body { … }`
rule of your own wins.

⚠ **A custom `root` receives no styling.** Hand it a container with no height of its own and
`height: 100%` has nothing to resolve against: the shell renders at whatever its own chrome
resolves to (measured: about 133px) instead of filling the screen — with no error and nothing in
the console. Give that container a height — for screen only, so printing is not cut at one page:

```css
@media screen {
  #app { height: 100vh; }   /* or 100%, inside an already-constrained ancestor */
}
```

## Printing

On print media the shell drops its app chrome and lets the content flow across pages: the
`sidebar`, `mobile-header`, modal backdrop and `progress` bar are hidden, the host is no longer a
fixed-height box, and `main` stops being a scroll container and loses its screen padding (page
margins come from `@page`). Nothing to configure.

To keep a piece of chrome on paper, restore it through its part:

```css
@media print {
  u-sidebar-layout::part(sidebar) { display: flex; }
}
```

⚠ Heights or `overflow` set through `layout.styles` are inline styles and still apply when
printing — scope such values to the screen in your own CSS instead.

## Overlay content

`<u-sidebar-layout>` has a second slot, `slot="overlay"`, that floats above `main` — independent
of routing. Fill it to show a panel (e.g. a record's detail) over whatever screen is currently
active, without wrapping every route or losing that screen's scroll position; empty it to remove
the panel. The route content underneath becomes `inert` while the overlay has content, and a
built-in close button fires `overlay-close` (not cancelable) when clicked:

```html
<u-sidebar-layout id="shell">
  <!-- route content goes in the default slot, e.g. via app.load()'s <u-outlet> -->
</u-sidebar-layout>

<script>
  function openOrderDetail(order) {
    const panel = document.createElement('div');
    panel.slot = 'overlay';
    panel.textContent = `Order #${order.id}`;
    shell.appendChild(panel);
  }

  shell.addEventListener('overlay-close', () => {
    shell.querySelector('[slot="overlay"]')?.remove();
  });
</script>
```

⚠ `hidden`/`display: none` on the slotted panel does not close the overlay — the slot must
actually be emptied (removed or reassigned) for `slotHasContent` to see it as closed.

To keep the underlying route mounted while a URL parameter drives the overlay open/closed (so a
query-string change doesn't remount the whole screen), give the route a `key` that excludes that
parameter — see [`docs/routing.md`](../../../docs/routing.md) `RouteConfig.key`.

No `overlayBreakpoint`/responsive toggle exists here — unlike `u-master-detail-layout`, this
overlay is always an overlay, never a side-by-side pane. Use `u-master-detail-layout` instead
when you want the panel to sit *beside* content on wide screens.

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
