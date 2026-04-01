# Sidebar Layout Reference — @iyulab/modern-app

## `SidebarLayoutConfig`

```typescript
interface SidebarLayoutConfig {
  type: 'sidebar';

  /** URL or path to the logo image. */
  logo?: string;

  /** Application title displayed beside the logo. */
  title?: string;

  /** Main (top) navigation items. */
  main?: SidebarItem[];

  /** Footer (bottom-pinned) items. */
  footer?: SidebarItem[];

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
  /** Override the URL matching pattern. Accepts a string or URLPattern. */
  pattern?: string | URLPattern;
  styles?: StyleMap<'host' | 'base' | 'icon' | 'label'>;
}
```

Example:

```typescript
{ type: 'link', icon: 'dashboard', label: 'Dashboard', href: '/' }
```

---

### `SidebarGroupConfig` — `type: 'group'`

Collapsible group that contains links.

```typescript
interface SidebarGroupConfig {
  type: 'group';
  icon: string;
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
  icon?: string;
  label: string | DirectiveResult;
  onClick: () => void;
  styles?: StyleMap<string>;
}
```

Example:

```typescript
{ type: 'button', icon: 'logout', label: 'Sign Out', onClick: () => auth.signOut() }
```

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
