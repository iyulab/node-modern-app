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
| *(default)* | Value content; takes precedence over `value`. An unnamed progress bar or meter here (`u-progress-bar`, `u-progress-ring`, `<progress>`, `<meter>`) is named by `label`; one that has its own `aria-label`/`aria-labelledby` keeps it |

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
| `size` | `'default'\|'lg'\|'xl'` | `'default'` | ✓ | `'lg'` renders the value at the `title` type-scale step — for dashboard KPI tiles composed inside `u-info-section`. `'xl'` is the figure read at a glance — the `display` step, or `--info-field-xl-size` |
| `appearance` | `'plain'\|'tile'` | `'plain'` | ✓ | `'tile'` draws a bordered surface (border · radius · padding · surface) for a grid of KPI tiles; with `tone` `warning`/`negative`/`positive` the whole tile takes that tone's soft face and border |
| `blankReason` | `string` | — | | Attribute `blank-reason`. Why the value is blank — on the line under the value, while the value line keeps `blank` (`—`) at figure size. Hidden once there is a value |
| `trend` | `'up'\|'down'\|'flat'` | — | | Trend direction; renders a trend indicator when set, alongside `trendLabel`; pair with trendLabel for an accessible name — trend alone conveys direction by color only |
| `trendLabel` | `string` | — | | Trend copy, e.g. `"+12% vs last month"` — wording is the consumer's responsibility |
| `description` | `string` | — | | A supporting line below the value — its basis, or the same amount in another unit (`"1,764,211 units"`). Trend copy belongs in `trendLabel` |
| `tone` | `'positive'\|'negative'\|'warning'\|'neutral'` | — | ✓ | Explicit tone override; resolves from `trend` when unset (`up→positive`, `down→negative`, `flat`/unset→`neutral`) but always wins over inference. Colors the value text itself, independent of `trend` — a static figure (e.g. a balance due) can be toned `negative` with no trend arrow. `warning` means "needs attention, not wrong" (a deadline coming up, a rate under target but within limits) and is never inferred |

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

`tone` colors a blank value too, so a reason that needs attention takes `tone="warning"`. Set it
conditionally (`tone=${mttr == null ? 'warning' : undefined}`) — otherwise the value is toned
as well once it exists.

To keep the dash and the reason apart — `—` on the value line at figure size, the reason on the
line under it — use `blank-reason` instead of a sentence in `blank`:

```html
<u-info-field appearance="tile" size="xl" label="MTTR" .value=${mttr} unit="h"
  blank-reason="No repairs in this period"></u-info-field>
```

### Tiles

`appearance="tile"` makes the field a tile of a KPI grid — the grid's gap is the container's. A
tile with `tone` takes that tone's face and border, so a figure that needs attention stands out
in the grid, not only by its text color. Put a status icon at the start of the trend line with
the `trend-icon` slot:

```html
<u-info-section min="190px">
  <u-info-field appearance="tile" size="xl" label="PM compliance" .value=${71} unit="%"
    tone="warning" .trendLabel=${'Below the 90% target'}>
    <u-icon slot="trend-icon" name="exclamation-triangle"></u-icon>
  </u-info-field>
  <u-info-field appearance="tile" size="xl" label="MTBF" .value=${412} unit="h"></u-info-field>
</u-info-section>
```

A small picture beside the figure — a trend sparkline, a progress ring — goes in the `visual` slot. It sits at the end
of the value line, aligned to the figure's baseline edge, and takes no room when empty. The field does not draw the
picture: it gives it a place. Mark a decorative picture `aria-hidden="true"`; give one that carries information its own
name (`role="img"` and `aria-label`) (`0.57.0~`):

```html
<u-info-field appearance="tile" size="xl" label="Received today" .value=${48} trend="up" .trendLabel=${'+6 vs yesterday'}>
  <svg slot="visual" aria-hidden="true" width="96" height="32" viewBox="0 0 96 32">
    <polyline points="0,24 19,20 38,22 57,14 76,16 95,8" fill="none" stroke="currentColor" stroke-width="2" />
  </svg>
</u-info-field>
```

## Slots

| Slot | Description |
|------|-------------|
| (default) | The value, in place of the string `value` (the slot wins) |
| `trend-icon` | A status mark at the start of the trend line, drawn when there is a trend line |
| `visual` | A small picture at the end of the value line (sparkline, ring) — empty takes no room |

## CSS Parts

| Part | Description |
|------|-------------|
| `base` | The field's box — a tile's surface, border and padding (and a strip cell's padding) are drawn here rather than on the host |
| `label` · `value` · `trend` | The label, the value, and the (optional) trend indicator |
| `unit` | The unit, inside `value` (only when `unit` is set and the value is not blank) |
| `description` | The supporting line (when `description` is set, or the value is blank and `blankReason` is set) |
| `visual` | The box holding the `visual` slot (not drawn when the slot is empty) |

The host only takes its place in the layout. Padding, borders and spacing live on `base` inside the shadow root, so a document-wide reset such as Tailwind's preflight (`* { padding: 0; border: 0 }`) cannot strip them — document rules beat `:host` rules whatever their specificity. Restyle the box with `::part(base)`.

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
| `--u-warning-color-strong` | `tone="warning"` color (value and trend) |
