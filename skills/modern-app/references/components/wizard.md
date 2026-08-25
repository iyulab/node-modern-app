# u-wizard

**Tag:** `u-wizard`

A step indicator + panel + Back/Next actions for multi-step flows.

Validation and save/resume are deliberately outside this component — that's domain state
management, the consumer's adapter layer owns it. `active` is a controlled prop (same pattern
as `u-expander`'s `open`): the component advances it itself when a transition isn't blocked,
but a consumer can also assign it directly to restore a saved step.

```html
<u-wizard .steps=${[
  { id: 'info', label: 'Basic info' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
]} active=${1}
  @step-change=${(e) => { if (!isValid()) e.preventDefault(); }}>
  <section>…info panel…</section>
  <section>…payment panel…</section>
  <section>…review panel…</section>
</u-wizard>
```

The default slot holds one child per step, matched to the `steps` array by **document order** —
only the active one is visible, the rest get the `hidden` attribute. `slot="actions"` fully
replaces the built-in Back/Next buttons — whether the last step says "Next" or "Submit" is
consumer wording, not something the library decides.

## `linear` reachability

With `linear` (default `true`), clicking a step in the indicator can't skip ahead past unvisited
steps — only steps you've already passed, or ones explicitly marked `state: 'done'`, are directly
reachable that way. `next()` can still always advance exactly one step forward regardless — linear
mode blocks *skipping*, not progression. Set `linear={false}` to let any non-`disabled'` step be
clicked directly (a non-linear/"editable" stepper).

## Accessibility

- Keyboard-operable end to end: indicator tabs use roving `tabindex` (arrow keys move focus among
  reachable steps, `Home`/`End` jump to the first/last reachable one; `Enter`/`Space` activate via
  native `<button>` semantics).
- Focus moves to the panel after every step change.
- An `aria-live="polite"` region announces `"Step N of M: <label>"` on every change.

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Step panels, one per `steps` entry, matched by document order |
| `actions` | Replaces the default Back/Next buttons entirely |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `steps` | `WizardStep[]` | `[]` | | `{ id, label, state? }[]`; `state` is `'done'\|'error'\|'disabled'` |
| `active` | `number` | `0` | ✓ | Current step index (controlled) |
| `orientation` | `'horizontal'\|'vertical'` | `'vertical'` | ✓ | Indicator layout |
| `linear` | `boolean` | `true` | ✓ | See "linear reachability" above |
| `locale` | `string` | `''` | | Language tag for default Back/Next labels and the live-region announcement |

## Methods

| Method | Description |
|--------|-------------|
| `next()` | Advance one step. No-op (returns `false`) on the last step or if `step-change` is canceled |
| `back()` | Go back one step. No-op on the first step |
| `goTo(i)` | Jump to step `i` if reachable and `step-change` isn't canceled |

## Events

| Event | Detail | Cancelable | Description |
|-------|--------|------------|--------------|
| `step-change` | `{ from: number, to: number }` | Yes | Fires before any transition (Back/Next, indicator click, or `goTo()`). `preventDefault()` blocks it — this is where validation runs |

## CSS Parts

| Part | Description |
|------|-------------|
| `indicator` | The step list (`role="tablist"`) |
| `step` | Each step button (`role="tab"`) |
| `panel` | Wrapper around the active step's slotted content (`role="tabpanel"`) |
| `actions` | Back/Next (or overridden) action row |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-space-xl` | Indicator-to-content gap |
| `--u-space-lg` | Gap between content rows |
| `--u-space-sm` | Indicator step gap, marker-to-label gap, actions row gap |
| `--u-space-2xs` | Step button vertical padding |
| `--u-txt-color-weak` | Step label color (default state) |
| `--u-txt-color-disabled` | Step label color (`disabled`) |
| `--u-border-color-strong` | Marker border (default state) |
| `--u-primary-color` | Marker border/text and label color (`active`, `state-done`) |
| `--u-danger-color` | Marker border/text and label color (`state-error`) |
| `--u-txt-color-inverse` | Marker text color (`state-done`) |
| `--u-text-caption-size` | Marker font size |
| `--u-text-label-weight` | Marker font weight |
| `--u-text-label-size` | Step label font size |
