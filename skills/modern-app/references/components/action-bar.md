# u-action-bar

**Tag:** `u-action-bar`

The row of actions that closes a form or a detail screen: destructive actions at the leading edge, the main
actions at the trailing edge — the distance between them is the safeguard. Below 420px each group takes its own
line with the main actions on top, so a destructive action never sits under the thumb.

```html
<u-action-bar sticky>
  <u-button slot="danger" color="danger" appearance="plain">Delete</u-button>
  <span slot="summary">1 change · Order number</span>
  <u-button appearance="outlined">Cancel</u-button>
  <u-button>Save</u-button>
</u-action-bar>
```

A side sheet's footer runs to the sheet's edges — give it the sheet's inset with `--action-bar-padding-inline`
rather than negative margins (the bar cannot know its parent's padding).

## Slots

| Name | Description |
|------|-------------|
| *(default)* | Main actions, at the trailing edge |
| `danger` | Destructive actions, at the leading edge |
| `summary` | What the main action will do — «1 change · Order number». Follows the danger actions and fills the free width |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `sticky` | `boolean` | `false` | ✓ | Pin to the bottom of the scroll container |

## CSS Parts

| Part | Description |
|------|-------------|
| `main` | Main action group |
| `danger` | Destructive action group |
| `summary` | Summary text wrapper |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--u-bg-color` | Background when `sticky` |
| `--u-border-color-weak` | Top border when `sticky` |
| `--u-space-sm` | Gap between actions within a group |
| `--u-space-md` | Host and sticky-mode vertical padding |
| `--action-bar-padding-inline` | Inline padding (default `0`) — the sheet inset for a footer that runs edge to edge |

⚠ `sticky` adds **vertical** padding only. It deliberately does not stretch to the container
edges with negative margins — that would assume the parent has exactly that much horizontal
padding, and when the assumption is wrong the bar overflows and clips its own buttons.
