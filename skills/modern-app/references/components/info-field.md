# u-info-field

**Tag:** `u-info-field`

A read-only label/value pair.

🔴 **"not set yet" and "zero" are different facts.**

```
null · undefined · ''      →  blank placeholder (—)
0 · false · '0'            →  rendered as-is
```

Leaving that rule to whoever writes the screen guarantees it drifts. It has: an order with
*quantity 0* and an order whose *quantity had not been decided* rendered identically as `—`,
and those are different states of the business. So the component owns the rule.

```html
<u-info-field label="Quantity" .value=${order.quantity} numeric></u-info-field>
<u-info-field label="Customer">Acme Printing</u-info-field>  <!-- slot wins over value -->
```

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Value content; takes precedence over `value` |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `label` | `string` | `''` | | Field label |
| `value` | `unknown` | — | | Value; property only (`attribute: false`) |
| `blank` | `string` | `'—'` | | Placeholder for null/undefined/empty — **not** for `0` or `false` |
| `numeric` | `boolean` | `false` | | Right-align with tabular figures so digits line up vertically |
| `format` | `'number'\|'currency'\|'date'` | — | | Renders `value` through `@iyulab/components`' `formatNumber`/`formatCurrency`/`formatDate`; unset falls back to plain `String(value)` |
| `currency` | `string` | — | | Currency code for `format="currency"` (e.g. `'KRW'`); omitted degrades to plain number formatting, does not throw |
| `size` | `'default'\|'lg'` | `'default'` | ✓ | `'lg'` renders the value at the `title` type-scale step — for dashboard KPI tiles composed inside `u-info-section` |
| `trend` | `'up'\|'down'\|'flat'` | — | | Trend direction; renders a trend indicator when set, alongside `trendLabel`; pair with trendLabel for an accessible name — trend alone conveys direction by color only |
| `trendLabel` | `string` | — | | Trend copy, e.g. `"+12% vs last month"` — wording is the consumer's responsibility |
| `tone` | `'positive'\|'negative'\|'neutral'` | — | | Explicit tone override; resolves from `trend` when unset (`up→positive`, `down→negative`, `flat`/unset→`neutral`) but always wins over inference. Colors the value text itself, independent of `trend` — a static figure (e.g. a balance due) can be toned `negative` with no trend arrow |

⚠ `numeric` earns its keep in **tables**, where columns of figures are compared by eye. On a
lone field it just pushes the value away from its label.

```html
<u-info-field label="Total" format="currency" currency="KRW" .value=${order.total}></u-info-field>
```

## CSS Parts

| Part | Description |
|------|-------------|
| `label` · `value` · `trend` | The label, the value, and the (optional) trend indicator |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-text-caption-size` / `-weight` / `-leading` | Label typography |
| `--u-txt-color-weak` | Label color, and blank-value (`—`) color |
| `--u-space-3xs` | Label-to-value spacing |
| `--u-text-body-size` / `-leading` | Value typography at default `size` |
| `--u-text-label-weight` | Value font weight at default `size` |
| `--u-text-body-weight` | Value font weight when `blank` |
| `--u-txt-color` | Value color |
| `--u-text-title-size` / `-weight` | Value typography when `size="lg"` |
| `--u-success-color-strong` | `tone="positive"` color (value and trend) |
| `--u-danger-color-strong` | `tone="negative"` color (value and trend) |
