# u-empty-state

**Tag:** `u-empty-state`

Shown when a list or a search comes back with nothing.

🔴 **"there is no data" and "no results matched" are different facts.** The first means
*nothing has been created yet* and the next action is **create**. The second means *nothing
matches these conditions* and the next action is **change the filter**. Show the same wording
for both and a user with a filter still applied reads it as *"my data disappeared"*.

```html
<u-empty-state variant="no-data" title="No orders yet">
  <u-button slot="actions">New order</u-button>
</u-empty-state>

<u-empty-state variant="no-results"></u-empty-state>
```

## Slots

| Name | Description |
|------|-------------|
| `icon` | Replaces the built-in icon |
| `actions` | Next-step buttons |

## Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `variant` | `'no-data'\|'no-results'` | `'no-data'` | | Which fact is being shown; changes the default wording |
| `title` | `string` | `''` | | Override the default title |
| `description` | `string` | `''` | | Override the default description |
| `locale` | `string` | `''` | | Locale tag override for built-in strings |

## CSS Parts

| Part | Description |
|------|-------------|
| `icon` · `title` · `description` · `actions` | The four regions |

⚠ Default wording is **English** — register others with `registerLocale('ko', …)`, or pass
`title`/`description` per screen.
