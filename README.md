# Modern App

A modern web application framework by iyulab, built on React and Lit Element.

For complete examples and documentation, visit our demo site: [https://modern-app.iyulab.com](https://modern-app.iyulab.com)

## Installation

```bash
npm install @iyulab/modern-app
```

## Architecture

`@iyulab/modern-app` is a **client-side SPA framework** built on Lit Element. It is designed for:

✅ **Suitable for:**
- Single Page Applications (SPA)
- Admin dashboards and internal tools
- Progressive Web Apps (PWA)
- Projects where SEO is not a primary concern

❌ **Not suitable for:**
- Server-Side Rendering (SSR) frameworks (Next.js, Nuxt, SvelteKit, etc.)
- Static Site Generation (SSG)
- SEO-critical public-facing pages
- Projects requiring initial HTML content for search engines

This is by design — Lit components render on the client side. If you need SSR capabilities, consider using Lit's experimental SSR support separately or choose a framework designed for SSR from the start.

## Quick Start

```typescript
import { app } from '@iyulab/modern-app';

await app.load({
  basepath: '/',
  layout: {
    type: 'sidebar',
    // ...layout configuration
  },
  routes: [
    { index: true, render: () => html`<home-page></home-page>` },
    { path: 'about', render: () => html`<about-page></about-page>` },
  ],
});
```

## API Reference

### Navigation

```typescript
// Navigate to a path
app.navigate('/path');

// Access router instance
app.router?.go('/path');
app.router?.basepath;   // Get base path
app.router?.routes;     // Get registered routes
app.router?.context;    // Get current route context
```

### Theme Management

```typescript
// Get current theme
app.theme.get();  // Returns: 'system' | 'light' | 'dark' | undefined

// Set theme
app.theme.set('dark');   // 'system' | 'light' | 'dark'

// Check initialization status
app.theme.isInitialized;
```

### Notifications

```typescript
// Display notifications (returns Promise<void>)
await app.notice('Notice message');
await app.info('Info message');
await app.success('Success message');
await app.warning('Warning message');
await app.error('Error message');

// With options
await app.success('Saved!', {
  title: 'Success',
  duration: 5000,  // milliseconds (default: 3000)
  position: 'top-right'  // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
});
```

### Localization

```typescript
// Access i18next instance
app.localizer;  // i18next instance

// Usage with lit-i18n
import { translate } from 'lit-i18n';
html`<p>${translate('namespace::key')}</p>`;
```

## Configuration

### AppConfig

```typescript
interface AppConfig {
  root?: Element;              // Root element (default: document.body)
  basepath?: string;           // Base path for routing (default: '/')
  routes: RouteConfig[];       // Route definitions
  fallback?: FallbackConfig;   // Error fallback route
  theme?: ThemeInitOptions;    // Theme configuration
  localization?: i18next.InitOptions;  // i18next options
  layout: LayoutConfig;        // Layout configuration
}
```

### Theme Options

```typescript
interface ThemeInitOptions {
  default?: 'system' | 'light' | 'dark';  // Default theme
  debug?: boolean;                         // Enable debug logging
  store?: false | {                        // Persist theme preference
    type: 'cookie' | 'localStorage' | 'sessionStorage';
    prefix?: string;
  };
  useBuiltIn?: boolean;  // Use built-in styles (default: true)
}
```

### Layout Configuration (Sidebar)

```typescript
interface SidebarLayoutConfig {
  type: 'sidebar';
  breakpoints?: [number, number];  // [small, medium] (default: [768, 1024])
  logo?: {
    type: 'icon' | 'image';
    icon?: string;
    src?: string;
    label?: string;
    onClick?: () => void;
  };
  menu?: MenuItem[];     // Navigation menu items
  footer?: FooterItem[]; // Footer buttons/items
}
```

### Route Configuration

```typescript
interface RouteConfig {
  index?: boolean;           // Index route
  path?: string;             // Route path (supports :param patterns)
  title?: string;            // Document title
  force?: boolean;           // Force re-render
  render: (context: RouteContext) => RenderResult | Promise<RenderResult>;
}

interface RouteContext {
  href: string;              // Full URL
  pathname: string;          // Path portion
  basepath: string;          // Base path
  params: Record<string, string>;  // URL parameters
  progress: (value: number) => void;  // Progress callback (0-100)
}
```

## License

MIT
