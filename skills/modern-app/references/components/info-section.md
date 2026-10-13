# u-info-section

**Tag:** `u-info-section`

Responsive grid for `u-info-field` pairs.

**You do not count the columns.** Hand-built label/value grids usually hardcode a column count
per screen, which then breaks only at tablet width — on a screen nobody opens, so it stays
broken. Here the **container width** decides (`auto-fit`, not media queries), so the same
markup works inside a side panel.

```html
<u-info-section>
  <u-info-field label="Part" value="Standard"></u-info-field>
  <u-info-field label="Quantity" .value=${0} numeric></u-info-field>
</u-info-section>
```

A stat strip — the totals above a list, as cells rather than a sentence:

```html
<u-info-section layout="strip">
  <u-info-field label="Orders" value="962" unit="orders" description="1,764,211 units" size="lg"></u-info-field>
  <u-info-field label="Due in 7 days" value="14" tone="warning" description="3 not started" size="lg"></u-info-field>
  <u-info-field label="Overdue" value="₩0" tone="negative" description="0 orders" size="lg"></u-info-field>
</u-info-section>
```

## Slots

| Name | Description |
|------|-------------|
| *(default)* | `u-info-field` elements |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `min` | `number` | `160` | | Minimum column width in px. Raise it for domains with long labels. Not used by `layout="strip"` |
| `layout` | `'grid'\|'strip'` | `'grid'` | ✓ | `grid` — label-value cells in a responsive grid · `strip` — a stat strip: cells on one bordered surface split by 1px dividers, all side by side or all stacked once the strip is narrower than 640px (never a ragged row) |

## CSS Parts

| Part | Description |
|------|-------------|
| `grid` | Grid container |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-space-lg` / `--u-space-xl` | Grid gap (row / column) |
| `--u-border-color` · `--u-radius-xl` · `--u-bg-color` | Strip surface, dividers and corner; cell background |
| `--u-space-md` / `--u-space-lg` | Strip cell padding (block / inline) |

⚠ Column width is set via the `min` property, not a custom property — it's applied as an inline
style per instance, so a `--info-min` override in a stylesheet would lose to it.
