/// <reference types="@vitest/browser-playwright" />
import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * 사이드바 항목 축(`--app-sidebar-item-radius` · `-gap` · `-padding` · `--app-sidebar-icon-size`)은 «항목» 전체의 것이다.
 *
 * 종전에는 링크만 넷을 다 읽고, 그룹 머리는 아이콘 크기만, 버튼은 하나도 읽지 않았다 — 축을 정한 테마(16px 아이콘 · 8px 간격)에서
 * 한 사이드바의 글자 시작이 링크 44 · 그룹 48 · 버튼 52 로 세 벌이었다. 실제 셸로 조립해 렌더 기하를 잰다.
 */
afterEach(() => document.body.replaceChildren());

async function mount(style: string): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.style.cssText = style;
  el.config = {
    type: 'sidebar',
    title: 'App',
    main: [
      { type: 'link', icon: 'house', label: 'Home', href: '/' },
      { type: 'group', icon: 'folder', label: 'Resources', items: [{ type: 'link', label: 'Docs', href: '/docs' }] },
    ],
    footer: [{ type: 'button', icon: 'gear', label: 'Settings', onClick: () => {} }],
  } as unknown as SidebarLayoutConfig;
  document.body.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 50));
  return el;
}

interface Geometry { icon: number; labelStart: number; radius: string }

function measure(el: SidebarLayout): Record<'link' | 'group' | 'button', Geometry> {
  const root = el.shadowRoot!;
  const of = (host: Element, frame: Element, label: Element, icon: Element): Geometry => ({
    icon: Math.round(icon.getBoundingClientRect().width),
    labelStart: Math.round(label.getBoundingClientRect().left - frame.getBoundingClientRect().left),
    radius: getComputedStyle(host).borderRadius,
  });
  const link = root.querySelector('u-sidebar-link')!;
  const group = root.querySelector('u-sidebar-group')!;
  const button = root.querySelector('u-sidebar-button')!;
  const groupButton = group.shadowRoot!.querySelector('button')!;
  return {
    link: of(link, link, link.shadowRoot!.querySelector('[part~="label"]')!, link.shadowRoot!.querySelector('u-icon')!),
    group: {
      ...of(groupButton, groupButton, group.shadowRoot!.querySelector('.label')!, group.shadowRoot!.querySelector('.icon')!),
    },
    button: of(button, button, button.shadowRoot!.querySelector('[part~="label"]')!, button.shadowRoot!.querySelector('u-icon')!),
  };
}

describe('사이드바 항목 축', () => {
  it('🔴축을 정하면 링크 · 그룹 머리 · 버튼이 같은 아이콘 크기 · 글자 시작 · 모서리', async () => {
    const el = await mount('--app-sidebar-icon-size: 16px; --app-sidebar-item-gap: 8px; --app-sidebar-item-padding: 6px 12px; --app-sidebar-item-radius: 6px');
    const g = measure(el);
    for (const kind of ['link', 'group', 'button'] as const) {
      expect(g[kind], kind).toEqual({ icon: 16, labelStart: 12 + 16 + 8, radius: '6px' });
    }
  });

  it('NEGATIVE — 축을 정하지 않으면 셋 다 종전 기본(20px · 12px · 8px)', async () => {
    const el = await mount('');
    const g = measure(el);
    for (const kind of ['link', 'group', 'button'] as const) {
      expect(g[kind], kind).toEqual({ icon: 20, labelStart: 12 + 20 + 12, radius: '8px' });
    }
  });
});
