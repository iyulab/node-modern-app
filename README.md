# Modern App

A modern web application framework by iyulab, built on React and Lit Element.

## Installation

```bash
npm install @iyulab/modern-app
```

## Quick Start

```javascript
import { app } from '@iyulab/modern-app';

// Load your app configuration
await app.load({
  layout: {
    type: 'sidebar',
    // layout configuration
  },
  routes: [
    // your routes
  ],
  locales: {
    // locale configuration
  }
});
```

## Demo

For complete examples and documentation, visit our demo site: [https://modern-app.iyulab.com](https://modern-app.iyulab.com)

## License

MIT
