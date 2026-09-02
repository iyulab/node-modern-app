# Notifications

`@iyulab/modern-app` exposes five toast notification methods on the `app` singleton. All methods are `async` and return `Promise<void>`.

---

## Methods

```typescript
await app.notice('A neutral message');
await app.info('Operation completed');
await app.success('Saved successfully');
await app.warning('This action cannot be undone');
await app.error('An unexpected error occurred');
```

---

## `NotificationOptions`

All methods accept an optional second argument:

```typescript
interface NotificationOptions {
  /** Title shown above the message. */
  title?: string;

  /** Duration in milliseconds before auto-dismiss. Default: 3000 */
  duration?: number;

  /** Screen position where the toast appears. Default: 'top-right' */
  position?: 'top-left' | 'top-center' | 'top-right'
    | 'middle-left' | 'middle-center' | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';
}
```

Example:

```typescript
await app.success('Your profile has been updated.', {
  title: 'Saved',
  duration: 5000,
  position: 'bottom-right',
});
```

---

## Displaying errors from `catch` blocks

```typescript
try {
  await submitForm(data);
  await app.success('Form submitted!');
} catch (err) {
  await app.error(err instanceof Error ? err.message : 'Submission failed');
}
```
