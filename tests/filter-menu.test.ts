import { describe, it, expect } from 'vitest';
import { filterSidebarItems } from '../src/layouts/filterSidebarItems';
import type { SidebarItem } from '../src/layouts/SidebarLayout.types';

const perms = new Set(['orders.read', 'reports.view']);
const has = (code: string) => perms.has(code);

describe('filterSidebarItems', () => {
  it('returns items unchanged when no hasPermission is given', () => {
    const items: SidebarItem[] = [
      { type: 'link', label: 'A', href: '/a', requirePermission: 'nope' },
    ];
    expect(filterSidebarItems(items, undefined)).toBe(items);
  });

  it('drops items whose requirePermission is not held', () => {
    const items: SidebarItem[] = [
      { type: 'link', label: 'Orders', href: '/orders', requirePermission: 'orders.read' },
      { type: 'link', label: 'Admin', href: '/admin', requirePermission: 'admin.maintenance' },
      { type: 'link', label: 'Public', href: '/public' },
    ];
    const out = filterSidebarItems(items, has);
    expect(out.map((i) => (i as { label: string }).label)).toEqual(['Orders', 'Public']);
  });

  it('requireAnyPermission passes if any code is held (empty = no constraint)', () => {
    const items: SidebarItem[] = [
      { type: 'link', label: 'X', href: '/x', requireAnyPermission: ['a', 'reports.view'] },
      { type: 'link', label: 'Y', href: '/y', requireAnyPermission: ['a', 'b'] },
      { type: 'link', label: 'Z', href: '/z', requireAnyPermission: [] },
    ];
    const out = filterSidebarItems(items, has);
    expect(out.map((i) => (i as { label: string }).label)).toEqual(['X', 'Z']);
  });

  it('recursively filters section items and hides sections left empty', () => {
    const items: SidebarItem[] = [
      {
        type: 'section',
        title: 'Visible',
        items: [
          { type: 'link', label: 'Orders', href: '/orders', requirePermission: 'orders.read' },
          { type: 'link', label: 'Admin', href: '/admin', requirePermission: 'admin.x' },
        ],
      },
      {
        type: 'section',
        title: 'Empty',
        items: [{ type: 'link', label: 'Secret', href: '/s', requirePermission: 'admin.x' }],
      },
    ];
    const out = filterSidebarItems(items, has);
    expect(out).toHaveLength(1);
    const section = out[0] as { title: string; items: { label: string }[] };
    expect(section.title).toBe('Visible');
    expect(section.items.map((i) => i.label)).toEqual(['Orders']);
  });

  it('hides a group when all its links are filtered out', () => {
    const items: SidebarItem[] = [
      {
        type: 'group',
        icon: 'x',
        label: 'G',
        items: [{ type: 'link', label: 'Secret', href: '/s', requirePermission: 'admin.x' }],
      },
    ];
    expect(filterSidebarItems(items, has)).toHaveLength(0);
  });

  it('does not mutate the original items', () => {
    const items: SidebarItem[] = [
      {
        type: 'section',
        title: 'S',
        items: [
          { type: 'link', label: 'Orders', href: '/orders' },
          { type: 'link', label: 'Admin', href: '/admin', requirePermission: 'admin.x' },
        ],
      },
    ];
    filterSidebarItems(items, has);
    expect((items[0] as { items: unknown[] }).items).toHaveLength(2); // 원본 보존
  });
});
