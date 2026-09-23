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
| `numeric` | `boolean` | `false` | | Tabular figures, so digits keep their width as the value changes; implied by `format="number"`/`"currency"`. Does **not** change alignment |
| `format` | `'number'\|'currency'\|'date'` | — | | Renders `value` through `@iyulab/components`' `formatNumber`/`formatCurrency`/`formatDate`; unset falls back to plain `String(value)` |
| `currency` | `string` | — | | Currency code for `format="currency"` (e.g. `'KRW'`); omitted degrades to plain number formatting, does not throw |
| `unit` | `string` | — | | Unit after the value (e.g. `'건'`, `'%'`, `'h'`), drawn one step below it — label size, body weight, weak color. Hidden while the value is blank. Also follows slotted value content |
| `size` | `'default'\|'lg'` | `'default'` | ✓ | `'lg'` renders the value at the `title` type-scale step — for dashboard KPI tiles composed inside `u-info-section` |
| `trend` | `'up'\|'down'\|'flat'` | — | | Trend direction; renders a trend indicator when set, alongside `trendLabel`; pair with trendLabel for an accessible name — trend alone conveys direction by color only |
| `trendLabel` | `string` | — | | Trend copy, e.g. `"+12% vs last month"` — wording is the consumer's responsibility |
| `tone` | `'positive'\|'negative'\|'neutral'` | — | | Explicit tone override; resolves from `trend` when unset (`up→positive`, `down→negative`, `flat`/unset→`neutral`) but always wins over inference. Colors the value text itself, independent of `trend` — a static figure (e.g. a balance due) can be toned `negative` with no trend arrow |

⚠ `numeric` no longer right-aligns (it did before 0.25.0). A field is a label/value pair that owns
one grid cell, with no neighbouring figures to line up, so right-aligning only pushed the value
to the far side of the cell from its label — most visibly in `size="lg"` KPI tiles, and
inconsistently, because `format="currency"` implied it while a plain count did not. If a layout
genuinely needs right-aligned figures, style the part: `u-info-field::part(value) { text-align: end; }`.

```html
<u-info-field label="Total" format="currency" currency="KRW" .value=${order.total}></u-info-field>
```

### Units and KPI tiles

A KPI figure almost always carries a unit. Put it in `unit` rather than in the value: the value
is drawn at the `title` step in `size="lg"`, and a unit written into the value (or the slot) is
drawn that large and that bold too — undoing it by hand means restating size, weight and color at
every tile.

```html
<u-info-field label="Open work orders" size="lg" .value=${openCount} unit="건"></u-info-field>
<u-info-field label="Availability" size="lg" format="number" .value=${98.2} unit="%"></u-info-field>
```

At `size="lg"` a blank value is drawn at body size, not the title step, so `blank` can carry a
short reason when a figure cannot be computed — the row keeps its height, so tiles in one strip
stay level:

```html
<u-info-field label="MTTR" size="lg" .value=${mttr} unit="h"
  blank="No downtime recorded for the failures"></u-info-field>
```

`tone` colors a blank value too, so a reason that needs attention takes `tone="negative"`. Set it
conditionally (`tone=${mttr == null ? 'negative' : undefined}`) — otherwise the value is toned
as well once it exists.

## CSS Parts

| Part | Description |
|------|-------------|
| `label` · `value` · `trend` | The label, the value, and the (optional) trend indicator |
| `unit` | The unit, inside `value` (only when `unit` is set and the value is not blank) |

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
| `--u-text-label-size` | Unit size |
| `--u-success-color-strong` | `tone="positive"` color (value and trend) |
| `--u-danger-color-strong` | `tone="negative"` color (value and trend) |
