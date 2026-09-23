# u-group-box

**Tag:** `u-group-box`

A titled card — the unit LOB detail screens are built from.

`u-card` gives you a surface. What actually repeats on these screens is *surface + title +
trailing actions*, and assembling that by hand is how title sizes, padding, and dividers end
up different on every screen.

```html
<u-group-box title="Receivables" meta="3 items">
  <a slot="actions" href="/receivables">Payments</a>
  …body…
</u-group-box>
```

The body is a flex column with token spacing, so block children get vertical rhythm and share
a left edge without any consumer CSS.

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Body content |
| `actions` | Trailing controls in the header |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `title` | `string` | `''` | | Header title |
| `meta` | `string` | — | | Secondary text after the title — a count, progress or short status (`3 items`, `2/5 done`), one step below the title: body size and weight, weak color, tabular figures. It sits inside the heading, so the heading's accessible name includes it. Not drawn without `title` |
| `divider` | `boolean` | `false` | | Rule between header and body. Off by default — many rules make a screen noisy |
| `flush` | `boolean` | `false` | | Remove body padding, for tables and lists that draw their own edges |
| `level` | `2|3|4|5|6` | `3` | ✓ | Heading level of the title in the document outline. Set `2` for a box directly under `u-page-header` (the page's `h1`), so the outline does not skip a level. Semantics only — the title looks the same at every level |

## CSS Parts

| Part | Description |
|------|-------------|
| `header` · `title` · `actions` | Header row |
| `meta` | Secondary text inside the title |
| `body` | Body wrapper |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-text-subtitle-size` | Title font size |
| `--u-text-subtitle-weight` | Title font weight |
| `--u-text-subtitle-leading` | Title line height |
| `--u-text-subtitle-tracking` | Title letter spacing |
| `--u-text-body-size` / `--u-text-body-weight` / `--u-txt-color-weak` | `meta` size, weight and color |
| `--u-bg-color-raised` | Surface background |
| `--u-border-color-weak` | Border and header divider color |
| `--u-radius-2xl` | Corner radius |
| `--u-shadow-sm` | Drop shadow |
| `--u-space-sm` / `--u-space-md` / `--u-space-xl` | Header/body spacing |
