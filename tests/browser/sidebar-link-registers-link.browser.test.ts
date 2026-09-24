import { it, expect } from 'vitest';
import '../../src/components/SidebarLink.js';

/** `u-sidebar-link` renders a `<u-link>` — importing it alone must define that element too. */
it('importing SidebarLink on its own defines u-link', () => {
  expect(customElements.get('u-link')).toBeDefined();
});
