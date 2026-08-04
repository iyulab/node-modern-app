# u-action-bar

**Tag:** `u-action-bar`

The row of actions that closes a form or a detail screen: primary actions on the leading edge,
destructive ones separated on the trailing edge.

```html
<u-action-bar sticky>
  <u-button variant="solid">Save</u-button>
  <u-button variant="outline">Cancel</u-button>
  <u-button slot="danger" color="danger">Delete</u-button>
</u-action-bar>
```

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Primary actions |
| `danger` | Destructive actions, pushed to the trailing edge |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `sticky` | `boolean` | `false` | ✓ | Pin to the bottom of the scroll container |

## CSS Parts

| Part | Description |
|------|-------------|
| `main` | Primary action group |
| `danger` | Destructive action group |

⚠ `sticky` adds **vertical** padding only. It deliberately does not stretch to the container
edges with negative margins — that would assume the parent has exactly that much horizontal
padding, and when the assumption is wrong the bar overflows and clips its own buttons.
