# u-attention-list

**Tag:** `u-attention-list`

One line per thing that could not move on by itself and is waiting on a person — an urgency rail,
what it is and why, how many, and the action that goes to it. The "needs a person" block of a work
home: late orders, things due in three days, records that do not reconcile. Built by hand, the tag,
text, number and button land in different columns on every screen; this element fixes the line.

```html
<u-attention-list label="Needs a person" .items=${[
  { title: 'Late', description: 'Past the promised date — oldest 39 days', count: 14, tone: 'negative', href: '/orders?view=late', action: 'Open' },
  { title: 'Due in 3 days', description: 'Ship today or it is late', count: 8, tone: 'warning', href: '/orders?view=soon', action: 'Open' },
  { title: 'Quantity mismatch', count: 31, tone: 'info', href: '/shipments/check', action: 'Reconcile' },
  { title: 'Partner requests', description: 'Nothing new', count: 0 },
]}></u-attention-list>
```

The lines share one grid, so the counts and the action buttons stand in the same columns whatever
the length of each action's name. An action is a `u-button` link to `href`; the app router follows
it like any in-app link. A line whose `count` is `0` stays — "nothing waiting" is a fact — but its
rail goes neutral, its text steps back, and it has no action.

⚠ **Colour is never the only carrier.** The rail's colour repeats what `title` says ("Late",
"Due in 3 days"); write the urgency into the title.

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `items` | `AttentionItem[]` | `[]` | | The lines, most urgent first. Property only |
| `label` | `string` | `''` | | Accessible name of the list |

### `AttentionItem`

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | What it is ("Late") |
| `description` | `string` | Why, or the rule ("Past the promised date — oldest 39 days") |
| `count` | `number` | How many. Formatted for the active locale. `0` makes the line idle |
| `tone` | `'negative'\|'warning'\|'info'\|'neutral'` | `negative` already wrong (late) · `warning` about to be · `info` to check · `neutral` for reference |
| `href` | `string` | Where the action goes |
| `action` | `string` | The action's name ("Open", "Reconcile"); with `href`, draws the button |

## CSS parts

| Part | Description |
|------|-------------|
| `base` | The list (`<ul>`) |
| `item` | One line |
| `rail` | The urgency rail |
| `title` | What it is |
| `description` | Why |
| `count` | How many |
| `action` | The action button (`u-button`) |
