# u-side-panel

**Tag:** `u-side-panel`

The right-hand side panel for an edit form or the detail of a selected item, drawn over the page. It is
`u-drawer` with two defaults changed: it comes in from the right (`placement="right"`) and has a close button
at the top right of its header (`closable`). Below 640px it covers the whole screen, kept off a notch or home
indicator by the safe-area insets. Opening and closing (`open`, `show()`, `hide()`), the slots, the parts and the
events are `u-drawer`'s.

```html
<u-side-panel id="edit">
  <span slot="header">Edit order</span>
  <u-input label="Customer"></u-input>
  <u-action-bar slot="footer">
    <u-button appearance="outlined" @click=${() => panel.hide()}>Cancel</u-button>
    <u-button>Save</u-button>
  </u-action-bar>
</u-side-panel>
```

**Side panel or `u-master-detail-layout`?** When the detail has to stay beside the list — you scan the list and
the detail follows — use `u-master-detail-layout`. When the detail or the form is something you open, work in and
close, with the page staying behind it, use a side panel.

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Body — scrolls on its own |
| `header` | Title, at the start of the header row; the close button sits at its end |
| `footer` | Actions — `u-action-bar` |

The panel draws the footer's padding and its top divider itself (`::part(footer)`). Put a plain `u-action-bar` there — without `sticky`, which would add a second divider and its own vertical padding. The bar fills the footer's width; below 420px of its own width the summary and the actions each take a line (the narrow layout of `u-action-bar`).

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `open` | `boolean` | `false` | ✓ | Whether the panel is shown (`show()` / `hide()` also work) |
| `closable` | `boolean` | `true` | ✓ | Close button at the top right. Being `true` by default, turn it off with the property (`.closable=${false}`) |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | ✓ | Edge the panel comes in from |

The overlay attributes of `u-drawer` — `contained`, `mode` (`'modal'` · `'non-modal'`) and `close-on` — work the same way.

## CSS Parts

| Part | Description |
|------|-------------|
| `panel` | The panel |
| `header` | Header row |
| `body` | Body |
| `footer` | Footer padding and divider — not drawn when nothing is slotted |
| `close-btn` | Close button |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--drawer-size` | Panel width (default `28rem`; full width below 640px) |
