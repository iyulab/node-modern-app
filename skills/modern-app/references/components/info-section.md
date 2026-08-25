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

## Slots

| Name | Description |
|------|-------------|
| *(default)* | `u-info-field` elements |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `min` | `number` | `160` | | Minimum column width in px. Raise it for domains with long labels |

## CSS Parts

| Part | Description |
|------|-------------|
| `grid` | Grid container |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-space-lg` / `--u-space-xl` | Grid gap (row / column) |

⚠ Column width is set via the `min` property, not a custom property — it's applied as an inline
style per instance, so a `--info-min` override in a stylesheet would lose to it.
