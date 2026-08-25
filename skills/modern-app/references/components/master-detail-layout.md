# u-master-detail-layout

**Tag:** `u-master-detail-layout`

A responsive master›detail split-pane shell. Modeled on Vaadin's `MasterDetailLayout`, with a
deliberately smaller surface — no draggable splitter (`masterSize` is a fixed prop, not a v1
feature).

The default slot is the master area. `slot="detail"` is the detail area, and it **appears when
filled and disappears when emptied** — the same contract as Vaadin's. Selection state (what to
show in the detail pane) is not this component's job — it's a shell, not a design decision.
Swap the `detail` slot's content when the selection changes:

```html
<u-master-detail-layout>
  <u-rich-table @selection-change=${e => (detail = renderRecord(e.detail.selected))}>
    …
  </u-rich-table>
  <div slot="detail">${detail}</div>
</u-master-detail-layout>
```

On a narrow container (self width, not viewport — see below) the detail pane switches to a
full overlay above the master pane, with a small close button that fires `detail-close`.
Clearing the detail slot yourself (in response to the event) is what actually dismisses it —
the component does not own the detail content, so it does not clear it for you.

## Why `ResizeObserver`, not `@container`

Every other primitive in this package (`u-page-header`, `u-group-box`, `u-action-bar`) folds at
a **fixed** self-width breakpoint via CSS `@container`. This component's breakpoint
(`overlayBreakpoint`) is a per-instance **prop** instead, because two panels sharing a screen
need more room than either alone — the right threshold depends on what the consumer puts in
each pane. CSS container-query conditions cannot read a runtime custom property, so honoring a
configurable breakpoint means measuring the host's own width in JavaScript and reflecting an
`overlay` attribute — same self-width philosophy, different mechanism, for a fixed reason.

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Master area |
| `detail` | Detail area — present ⇒ shown, empty ⇒ hidden |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `masterSize` | `string` | `'22rem'` | | Fixed width of the master pane, a CSS length (`master-size`) |
| `overlayBreakpoint` | `number` | `760` | | Below this self width in px, detail becomes a full overlay (`overlay-breakpoint`) |
| `locale` | `string` | `''` | | Language tag for the close button's accessible label |

## Events

| Event | Detail | Cancelable | Description |
|-------|--------|------------|--------------|
| `detail-close` | — | No | Overlay-mode close button clicked. Clear the `detail` slot's content in response — the component does not do this for you |

## CSS Parts

| Part | Description |
|------|-------------|
| `master` | Master pane |
| `divider` | Hairline between panes — hidden when there's no detail, or in overlay mode |
| `detail` | Detail pane |
| `detail-close` | Overlay-mode close button — hidden outside overlay mode |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-border-color-weak` | Divider color |
| `--u-panel-bg-color` | Detail pane background in overlay mode |
| `--u-shadow-lg` | Detail pane shadow in overlay mode |
| `--u-space-sm` | Close-button offset from the overlay edge |

⚠ The master pane's fixed width comes from the `masterSize` property (a CSS length, applied as
an inline style), not a custom property.
