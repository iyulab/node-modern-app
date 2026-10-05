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

  /** Accessible name for the app-level notice stack (`slot="notice"`). When set, the stack is a `role="region"` landmark with this `aria-label`. Unset by default. */
  noticesAriaLabel?: string;

  /** Permission filter — hides items (and emptied section/groups) whose requirement fails. Unset shows everything. See "권한 기반 메뉴 필터" below. */
  hasPermission?: (code: string) => boolean;

  /** Called on `route-done` (before the shell places focus — see *Focus when a route finishes*) with the new route's `RouteContext` and the scroll container itself — implement reset/save/restore here. Unset does nothing (same default as Vue Router's unset `scrollBehavior`). Also reachable outside the hook via the element's `.mainElement` accessor. */
  scrollBehavior?: (context: RouteContext, main: HTMLElement) => void;

  /** Shell chrome icon source and names — `{ lib?, menu?, close?, sidebarToggle?, overlayClose? }`, only the keys you set replace the defaults. Defaults come from the bundled `internal` set, so the shell needs no network to draw its own toggles; give `lib` **and** the names to point it at your own set. */
  icons?: SidebarIconsConfig;

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
  /** Work waiting behind the item, shown at its end. Change it at runtime with app.setNavCount(href, n). */
  count?: number | string;
  styles?: StyleMap<'host' | 'base' | 'icon' | 'label' | 'count'>;
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

#### Counts — work waiting behind an item

A link can end with a count: items to review, unpaid invoices. Show numbers only where
they ask for action, or the sidebar turns into a dashboard.

```typescript
{ type: 'link', icon: 'inbox', label: 'Reviews', href: '/reviews', count: 12 }

// later, without rebuilding the layout — `undefined` clears it
app.setNavCount('/reviews', 3);
```

The count is `part="count"`; in the compact sidebar it stays in the link's accessible
name and is hidden visually.

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
| `skip-link` | «Skip to main content» link — the shell's first Tab stop, shown only while focused |
| `mobile-header` | Top bar shown on mobile |
| `sidebar` | Sidebar panel |
| `sidebar-header` | Logo + title area |
| `sidebar-main` | Scrollable main nav area |
| `sidebar-footer` | Pinned footer area |
| `main` | Main content area (the scroll container) |
| `main-content` | Wrapper holding route content inside `main` — creates no box, so route content sits directly in `main` (see [Route content area](#route-content-area)); the shell puts `inert` here while the overlay is open, and gives it a box then as the overlay's stacking boundary |
| `progress` | Top progress bar |
| `overlay` | Route-independent overlay panel above `main` |
| `overlay-close` | Overlay's close button |
| `notices` | Stack of app-level notices at the top of the route content (`slot="notice"`) |

---

## Sizing

`<u-sidebar-layout>` is a shell: `:host` is `height: 100%` with `overflow: hidden`, so **its
height comes from the parent** — it never sizes itself. It is also capped at `max-height: 100dvh`:
whatever the parent does, the shell is never taller than the viewport, so the route content always
scrolls inside `part="main"` and the sidebar (navigation and footer) stays on screen. A parent
shorter than the viewport still wins. `app.load()` covers the default case: when
`root` is `document.body` it gives the body `margin: 0`, and on screen `width: 100vw; height: 100vh`.
These come from a document stylesheet at zero specificity, not inline styles — any `body { … }`
rule of your own wins.

⚠ **A custom `root` receives no styling.** Hand it a container with no height of its own and
`height: 100%` has nothing to resolve against: the shell renders at whatever its own chrome
resolves to (measured: about 133px) instead of filling the screen — no error, only a
development-mode console warning when it is shorter than 200px. (With a long screen the shell grows
to the viewport cap instead, so the symptom only shows on short screens.) Give that container a height — for screen only, so printing is not cut at one page:

```css
@media screen {
  #app { height: 100vh; }   /* or 100%, inside an already-constrained ancestor */
}
```

## Route content area

`part="main"` is the **scroll container** for route content, and it already has a **32px gutter**
(`padding: var(--u-space-3xl, 32px)`) on every side. **Route screens should not add their own outer
padding** to `:host` — the gutters add up (32 + 16 = 48px), and they start to differ from screen
to screen.

To change or remove the gutter, override `main` — either through `layout.styles` or the part:

```ts
layout: { type: 'sidebar', styles: { main: { padding: '0' } } }   // full-bleed
```

```css
u-sidebar-layout::part(main) { padding: 24px; }
```

⚠ `layout.styles` values are inline styles, so they also apply on print media (see [Printing](#printing));
use `::part(main)` inside `@media screen` if the change is for the screen only.

Inside it, the route content sits **directly** in that scroll container: neither
`part="main-content"` nor `<u-outlet>` creates a box (`display: contents`). That is what lets all
three kinds of screen work:

| Screen | Behaviour |
|---|---|
| **Fills the area** — `height: 100%`, or a layout such as `u-master-detail-layout` | gets the area minus its gutters |
| **Fills the area, more content than fits** — a toolbar plus a table with `flex: 1; min-height: 0` and more rows than the viewport | stays at the area's height; the table scrolls inside itself |
| **Flows** — a form or document taller than the area | `main` scrolls, and the bottom gutter stays at the end of the scroll |

Any box in between breaks one of them — a box pinned at `height: 100%` loses the bottom gutter on
flowing screens, and a grid box with `min-height: 100%` grows a filling screen to every row of its
table. So `::part(main-content)` accepts no box styling (`padding`, `background`, `border` do
nothing); style `::part(main)` or the screen instead.

⚠ **App notices push a filling screen down.** Notices (`slot="notice"`) sit at the top of the
content at their own height, and a screen's `height: 100%` does not know about them, so while a
notice shows, a filling screen overflows by the notice's height. The two kinds of screen cannot be
told apart in CSS; notices are rare and short-lived.

While the overlay is open, `part="main-content"` becomes a box at the area's height, because a
stacking context needs one — route content is inert and under the overlay then.

### Skip link and main landmark

The route area is a `<main>` landmark (`part="main"`), so a screen reader can jump to it. The shell's
first Tab stop is a **«Skip to main content»** link (`part="skip-link"`, localized — `skipToContent` in
`modernAppLocale`), visible only while it has focus. Activating it moves focus by the same rule as a
finished route (steps 2 and 3 below): your screen's `[autofocus]` element, else `main` itself — so a
keyboard user does not tab through the whole menu on every screen (WCAG 2.4.1 Bypass Blocks). Do not put
another `<main>` in your route screens; the shell already provides it.

### Focus when a route finishes

On every `route-done` the shell places focus so the keyboard works on the new screen without a
click — by the same rule as the overlay panel (see *What the shell owns, and what it does not*):

1. **If your screen already moved focus into the route content** (a `focus()` in `firstUpdated`,
   say), the shell leaves it there.
2. **Else an `[autofocus]` element in the route content** — found through shadow roots, so an input
   inside your page component's own template counts. The shell waits for the screen's first render
   before looking.
3. **Else `part="main"`**, the scroll container — arrow keys and Page Down scroll the new screen,
   and it marks where the new screen starts.

So a screen that must receive input on entry — a barcode scan field, a search box — only needs
`autofocus` on that control. The same holds for a React screen (`autoFocus` on a native input, or `autofocus`
on a component such as `UInput`) — `@iyulab/router` 0.16.1 and later report `route-done` only after
React has committed the screen. While the overlay is open the shell does none of this: the route
underneath is inert and focus stays in the panel.

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
| Moving focus into the panel when it opens | shell | an `[autofocus]` element in your panel, else its first input control, else `part="overlay-close"` — searched through shadow roots, after the panel's first render, so a panel that is itself a component works the same. If you already moved focus into the panel, the shell leaves it there |
| Restoring focus when it closes | shell | back to the control that held focus when the panel opened — only if focus fell to `<body>`; if you moved it somewhere on purpose, that stands. With no such control (opened from code), focus goes to `part="main"` |
| Escape to close | shell | Escape inside the panel fires the same `overlay-close` as the button — you still empty the slot. The panel is a layer in `@iyulab/components`' layer stack: layers stack in the order they opened and one Escape closes the topmost, so a list, popover, drawer or dialog opened inside the panel closes first. The Escape that closes the panel is marked consumed (`defaultPrevented`); an Escape pressed outside the panel is left alone. For an app surface of your own, `OverlayManager.openLayer` joins the same order |
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

No `overlayBreakpoint`/responsive toggle exists here — unlike `u-master-detail-layout`, this
overlay is always an overlay, never a side-by-side pane. Use `u-master-detail-layout` instead
when you want the panel to sit *beside* content on wide screens.


## App-level notices

App-level notices — the server is unreachable, a new version is ready — belong to the shell, not to
one screen: a screen that places its own fixed banner collides with the next notice someone adds.
Put them in `slot="notice"`; the shell stacks them at the top of the route content.

```html
<u-sidebar-layout>
  <u-alert slot="notice" status="warning" open>Server unreachable — retrying.</u-alert>
  <u-alert slot="notice" status="info" open closable>A new version is ready.</u-alert>
</u-sidebar-layout>
```

- **In flow, above the route content.** Notices scroll away with the content rather than holding a
  strip of a small screen, and they never cover it. A banner's value is that it does not block;
  a permanently pinned stack would eat into that on a phone.
- **Full width.** Each notice takes the width of the content box, whatever its text length.
- **Empty takes no space** — the stack has no margin while nothing is slotted.
- **Inert with the route content** while the overlay is open.
- **A named landmark on request.** Set `noticesAriaLabel` in the layout config and the stack
  becomes a `role="region"` with that name, so screen-reader users can jump back to the notices
  currently shown. Put the notices in the slot directly — wrapping them in your own named section
  puts the stack's spacing and width on the wrapper instead of on each notice.
- Which surface a notice is (toast, banner or modal) is decided by *who ends it* — a notice the time
  ends is a toast (`app.success`), not a slotted banner.

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
