# u-page-header

**Tag:** `u-page-header`

The same skeleton at the top of every LOB screen: optional back link, title, subtitle,
a status slot, and an actions slot.

Hand-rolling this per screen is where a product stops looking like one product — title sizes
drift, action alignment goes slightly off, and the narrow-viewport rule gets forgotten on the
screens nobody opens.

```html
<u-page-header title="Order G-2026-I-0629" subtitle="Received 2026-02-24" back="/orders">
  <span slot="status"><u-tag color="success">Confirmed</u-tag></span>
  <span slot="actions"><u-button>Edit</u-button></span>
</u-page-header>
```

## Slots

| Name | Description |
|------|-------------|
| `status` | Badge or tag beside the title |
| `actions` | Buttons on the trailing edge |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `title` | `string` | `''` | | Page title |
| `subtitle` | `string` | — | | Secondary line under the title |
| `back` | `string` | — | | Back-link href; renders a back affordance before the title |
| `backLabel` | `string` | `''` | | Back-link text (`back-label`). Empty falls back to the locale registry, then English |
| `locale` | `string` | `''` | | Locale tag override for built-in strings |

## CSS Parts

| Part | Description |
|------|-------------|
| `back` | Back link |
| `heading` | Title + subtitle wrapper |
| `title` · `subtitle` | Text elements |
| `status` · `actions` | Slot wrappers |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-text-display-size` / `-weight` / `-leading` / `-tracking` | Title typography |
| `--u-txt-color` | Title color |
| `--u-text-caption-size` / `-weight` / `-leading` | Subtitle typography |
| `--u-txt-color-weak` | Subtitle color |
| `--u-link-txt-color` | Back-link color |
| `--u-text-label-size` / `-weight` | Back-link typography |
| `--u-space-2xl` | Host bottom margin |
| `--u-space-md` | Row gap (heading vs. actions) |
| `--u-space-sm` | Title-row and actions internal gap |
| `--u-space-2xs` | Title-to-subtitle spacing |
| `--u-space-3xs` | Back-arrow-to-label spacing |

⚠ Built-in strings default to **English** — this package is a generic layer and cannot pick a
language. Register others with `registerLocale('ko', { back: '뒤로' })`.
