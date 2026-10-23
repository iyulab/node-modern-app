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

**It folds by its own width, without a size container.** Below 480px the header actions move under
the title and fill the row. The threshold is the title's `flex-basis`, not a container query, so
the card sizes to its content like any block, and unnamed `@container` queries in your slotted
content do not resolve to the card — lay slotted content out intrinsically (the house-style grids
do).

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
| `description` | `string` | — | | One line under the title — what the box holds or what its numbers are based on. Caption size, weak color. Opens the header on its own |
| `divider` | `boolean` | `false` | | Rule between header and body. Off by default — many rules make a screen noisy |
| `flush` | `boolean` | `false` | | Remove body padding, for tables and lists that draw their own edges |
| `level` | `2\|3\|4\|5\|6` | — | ✓ | Heading level of the title in the document outline. Unset: `2` for a box in no other `u-group-box` (directly under `u-page-header`, the page's `h1`), one deeper than the nearest enclosing box otherwise. Set it when the box sits under a heading of your own. Semantics only — the title looks the same at every level |

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | The card's box — surface, border, corner and shadow are drawn here rather than on the host |
| `header` · `title` · `actions` | Header row |
| `meta` | Secondary text inside the title |
| `description` | One-line description under the title |
| `body` | Body wrapper |

The host only takes its place in the layout. Padding, borders and spacing live on `base` inside the shadow root, so a document-wide reset such as Tailwind's preflight (`* { padding: 0; border: 0 }`) cannot strip them — document rules beat `:host` rules whatever their specificity. Restyle the box with `::part(base)`.

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-text-subtitle-size` | Title font size |
| `--u-text-subtitle-weight` | Title font weight |
| `--u-text-subtitle-leading` | Title line height |
| `--u-text-subtitle-tracking` | Title letter spacing |
| `--u-text-body-size` / `--u-text-body-weight` / `--u-txt-color-weak` | `meta` size, weight and color |
| `--u-text-caption-size` / `-weight` / `-leading` | `description` typography |
| `--u-bg-color-raised` | Surface background |
| `--u-border-color-weak` | Border and header divider color |
| `--u-radius-2xl` | Corner radius |
| `--u-shadow-sm` | Drop shadow |
| `--u-space-sm` / `--u-space-md` / `--u-space-xl` | Header/body spacing |
