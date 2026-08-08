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

⚠ `numeric` earns its keep in **tables**, where columns of figures are compared by eye. On a
lone field it just pushes the value away from its label.

```html
<u-info-field label="Total" format="currency" currency="KRW" .value=${order.total}></u-info-field>
```

## CSS Parts

| Part | Description |
|------|-------------|
| `label` · `value` | The two elements |
