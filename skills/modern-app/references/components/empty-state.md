# u-empty-state

**Tag:** `u-empty-state`

Shown when a list or a search comes back with nothing.

🔴 **"there is no data" and "no results matched" are different facts.** The first means
*nothing has been created yet* and the next action is **create**. The second means *nothing
matches these conditions* and the next action is **change the filter**. Show the same wording
for both and a user with a filter still applied reads it as *"my data disappeared"*.
The same holds for a screen this user may not see: it is neither empty nor broken, and its next
action is **asking for access**.

```html
<u-empty-state variant="no-data" title="No orders yet">
  <u-button slot="actions">New order</u-button>
</u-empty-state>

<u-empty-state variant="no-results"></u-empty-state>

<!-- The list could not be loaded — the next step is trying again. The title and the reason (description) are announced together (role="alert") — the reason decides what to do next. -->
<u-empty-state variant="error" description="Request failed (503)">
  <u-button slot="actions">Try again</u-button>
</u-empty-state>

<!-- A route guard said no (403) — not an outage, so it is not announced as an alert. -->
<u-empty-state variant="no-access"></u-empty-state>

<!-- The address points at nothing (404) — the next step is checking the address or going back. -->
<u-empty-state variant="not-found"></u-empty-state>
```

## Slots

| Name | Description |
|------|-------------|
| `icon` | Replaces the built-in icon |
| `actions` | Next-step buttons |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `variant` | `'no-data'\|'no-results'\|'error'\|'no-access'\|'not-found'` | `'no-data'` | ✓ | Which fact is being shown; changes the default wording. `error` (could not load) announces its title; `no-access` (this user may not see it) and `not-found` (nothing at this address) do not |
| `title` | `string` | `''` | | Override the default title |
| `description` | `string` | `''` | | Override the default description |
| `locale` | `string` | `''` | | Locale tag override for built-in strings |

## CSS Parts

| Part | Description |
|------|-------------|
| `icon` · `title` · `description` · `actions` | The four regions |
| `message` | Wraps `title` and `description` — the alert of `variant="error"` |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--empty-state-icon-size` | Icon slot font size |
| `--u-txt-color` | Title color |
| `--u-txt-color-weak` | Host and description text color |
| `--u-text-subtitle-size` / `-weight` / `-leading` | Title typography |
| `--u-text-caption-size` / `-leading` | Description typography |
| `--u-space-4xl` / `--u-space-xl` | Host padding (vertical / horizontal) |
| `--u-space-md` | Icon-to-title spacing |
| `--u-space-2xs` | Title-to-description spacing |
| `--u-space-lg` | Actions row top spacing |
| `--u-space-sm` | Gap between actions |

⚠ Default wording is **English**, with Korean built in — choose the language with `Locale.set()` of
`@iyulab/components`, register others with `modernAppLocale.register(lang, …)`, or pass
`title`/`description` per screen.

## Blocked and missing routes

**An app that gives `app.load()` no `fallback` gets this element by default**: a route `enter` guard
that returns `false` (`AccessDeniedError`, code 403) shows `no-access`, an address with no route
(`NotFoundError`, 404) shows `not-found`, and any other failure (the route could not be loaded or
rendered) shows `error` with the page-level title "Couldn’t open this page" and the error message as
its description. The screen is drawn inside the shell, so the sidebar stays.

```typescript
import { app } from '@iyulab/modern-app';
import { html } from 'lit';

const canAudit = () => false;   // your permission check

await app.load({
  layout: { type: 'sidebar' },
  routes: [{ path: '/audit', enter: canAudit, render: () => html`<audit-screen></audit-screen>` }],
  // no fallback — /audit shows <u-empty-state variant="no-access">
});
```

Give a `fallback` to draw something else — it replaces the default entirely. The error classes are
exported from `@iyulab/modern-app`, so it can tell a blocked screen from a missing one without
depending on the router directly:

```typescript
import { app, AccessDeniedError } from '@iyulab/modern-app';
import { html } from 'lit';

const canAudit = () => false;   // your permission check

await app.load({
  layout: { type: 'sidebar' },
  routes: [{ path: '/audit', enter: canAudit, render: () => html`<audit-screen></audit-screen>` }],
  fallback: {
    render: (ctx) => ctx.error instanceof AccessDeniedError
      ? html`<u-empty-state variant="no-access"></u-empty-state>`
      : html`<u-empty-state variant="error" .description=${ctx.error.message}></u-empty-state>`,
  },
});
```
