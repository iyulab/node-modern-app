# u-stage-flow

**Tag:** `u-stage-flow`

How many records sit at each step of a fixed process, as bars on one scale — the first row of a
screen where work moves through stages in order (orders, work orders, approvals). Laying the stages
out as separate KPI tiles loses two things: the **order** between them and their **relative size**,
so finding the stuck stage means comparing numbers one by one. This element shows both as shape:
each bar is that stage's share of the largest stage, and a flow mark sits between stages.

`u-steps` is "how far has *this* record got". `u-stage-flow` is "how many records wait at each stage".

```html
<u-stage-flow label="Order flow" unit="orders" numbered .items=${[
  { label: 'Received', count: 403, description: '$626k', href: '/orders?stage=0' },
  { label: 'Proof sent', count: 0, description: 'none waiting', href: '/orders?stage=1' },
  { label: 'Billing', count: 669, description: '$187k', tone: 'negative', note: '2.1× usual', href: '/orders?stage=5' },
  { label: 'Paid', count: 399, description: '$433k' },
]}></u-stage-flow>
```

A stage with `href` is a single link — its name is the label, count, description and note — and the
app router follows it like any other in-app link. A stage without `href` is plain content.

⚠ **Colour is never the only carrier.** When you tone a stage, say why in `note` ("bottleneck",
"2.1× usual"); the note is drawn as a pill and is part of the link's name.

Narrow containers wrap the stages onto more rows; each stage keeps at least
`--stage-flow-min-width`.

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `items` | `StageFlowItem[]` | `[]` | | The stages, in flow order. Property only |
| `unit` | `string` | `''` | | Unit after each count (e.g. `'orders'`, `'건'`) |
| `label` | `string` | `''` | | Accessible name of the list (e.g. `'Order flow'`) |
| `numbered` | `boolean` | `false` | ✓ | Puts a sequence number (01, 02 …) before each label — when the order itself is information. The number is not part of the accessible name |
| `max` | `number` | — | | Value the bars are scaled against; unset uses the largest stage. Set it to put several flows on one scale |

### `StageFlowItem`

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Stage name |
| `count` | `number` | Records at this stage — sets the bar height. Formatted for the active locale |
| `description` | `string` | Supporting line under the count (the amount tied up at the stage) |
| `href` | `string` | Where the stage leads — makes the whole stage a link |
| `tone` | `'neutral'\|'warning'\|'negative'` | `warning` for a stage starting to back up, `negative` for a blocked one. Colours the bar, baseline, count and note |
| `note` | `string` | Why the stage is toned — a pill under the stage, read with it |

## CSS custom properties

| Property | Default | Description |
|----------|---------|-------------|
| `--stage-flow-bar-height` | `6.5rem` | Height of the bar well |
| `--stage-flow-min-width` | `7rem` | Narrowest a stage gets before the stages wrap |

## CSS parts

| Part | Description |
|------|-------------|
| `base` | The stage list (`<ol>`) |
| `stage` | One stage — an `<a>` when it has `href`, otherwise a `<div>` |
| `count` | The count |
| `bar` | The relative-size bar |
| `label` | The stage name, with its number |
| `description` | The supporting line |
| `note` | The pill that says why a stage is toned |
