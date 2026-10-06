# u-timeline

**Tags:** `u-timeline` · `u-timeline-item`

A status or activity history on a detail screen — "what happened, and when" (an order moving
through its states, a ticket's activity, an approval chain). Each entry is a marker on a rail, a
heading, a time and an optional body.

```html
<u-timeline>
  <u-timeline-item heading="Paid" datetime="2026-10-06T09:30" color="success" icon="check">
    Bank transfer received.
  </u-timeline-item>
  <u-timeline-item heading="Shipped" datetime="2026-10-06T15:10" color="primary"></u-timeline-item>
  <u-timeline-item heading="Ordered" datetime="2026-10-05"></u-timeline-item>
</u-timeline>
```

Entries are shown in DOM order — put the newest first or last, as your screen reads. `u-timeline` is
a list and each entry a list item, so assistive technology announces the count.

⚠ **Colour is never the only carrier.** Say the status in `heading` ("Rejected"), not only with
`color="danger"` (WCAG 1.4.1). The marker is decorative to assistive technology.

## `u-timeline-item` — Slots

| Name | Description |
|------|-------------|
| (default) | Body — detail under the heading (who, a note, a link) |
| `heading` | Replaces the `heading` text with richer content |
| `time` | Replaces the formatted time text (e.g. a relative "2 hours ago"); `datetime` still annotates it |

## `u-timeline-item` — Properties

| Property | Type | Default | Reflect | Description |
|----------|------|---------|---------|-------------|
| `heading` | `string` | `''` | | What happened |
| `datetime` | `string` | `''` | | ISO `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]`. Rendered as `<time datetime>`, formatted for the active locale — a date alone as a date (never shifted by a time zone), a date-time with its time |
| `color` | `'neutral'\|'primary'\|'info'\|'success'\|'warning'\|'danger'` | `'neutral'` | ✓ | Marker colour — the role colours of `u-tag`/`u-badge` |
| `icon` | `string` | — | | Icon drawn inside the marker (the marker grows to hold it) |
| `lib` | `string` | — | | Icon library for `icon` |

## CSS Parts

| Part | Description |
|------|-------------|
| `list` | `u-timeline`: the column the entries stack in |
| `rail` · `marker` · `line` | Entry: the rail column, its marker, and the line down to the next entry |
| `content` · `header` · `heading` · `time` · `body` | Entry: the text column — header row (heading and time) and body |

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--app-timeline-rail-width` | Rail column width; also the marker size when it holds an icon (default 24px) |
| `--app-timeline-marker-size` | Plain marker size (default 12px) |
| `--u-{role}-color` / `-txt-color` / `-color-strong` | Marker fill, the icon colour on it, and its edge |
| `--u-text-label-*` · `--u-text-caption-*` · `--u-text-body-*` | Heading, time and body typography |
