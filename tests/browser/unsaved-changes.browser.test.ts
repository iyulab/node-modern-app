import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { LitElement, html } from 'lit';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';
import { app } from '../../src/App.js';
import {
  trackUnsavedChanges,
  hasUnsavedChanges,
  UnsavedChangesController,
} from '../../src/unsaved.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { useUnsavedChanges } from '../../src/react.js';

/**
 * **저장 안 한 변경은 말없이 사라지지 않는다.** 화면이 판정 하나를 등록하면 셸이 라우터 이동 앞에서 «변경을 버릴까요?» 를
 * 묻고(앱 안 대화상자 — 버리기 / 계속 편집), 문서 이탈에는 `beforeunload` 확인이 걸린다. 깨끗하면 아무것도 묻지 않는다.
 * hash 모드 — 경로 라우팅은 시험 iframe 의 문서를 잃는다.
 */
const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 40));
};
const until = async (fn: () => boolean, what: string) => {
  for (let i = 0; i < 80; i++) {
    if (fn()) return;
    await settle();
  }
  throw new Error(`기다렸지만 일어나지 않았다: ${what}`);
};
const quiet = async () => {
  for (let i = 0; i < 6; i++) await settle();
};
const page = (name: string) => () => {
  const s = document.createElement('section');
  s.setAttribute('data-screen', name);
  return s;
};
const startPath = window.location.pathname + window.location.search;

let root: HTMLElement | undefined;
let releases: Array<() => void> = [];
let dirty = false;

beforeEach(() => {
  Locale.set('en');
  dirty = false;
});
afterEach(() => {
  for (const release of releases) release();
  releases = [];
  for (const d of document.querySelectorAll('u-dialog')) d.remove();
  app.unload();
  root?.remove();
  history.replaceState(null, '', startPath);
});

async function load(extra: Record<string, unknown> = {}) {
  history.replaceState(null, '', startPath);
  root = document.createElement('div');
  root.style.height = '400px';
  document.body.appendChild(root);
  await app.load({
    root,
    routerMode: 'hash',
    initialLoad: false,
    layout: { type: 'sidebar' },
    routes: [{ path: '/a', render: page('a') }, { path: '/b', render: page('b') }],
    ...extra,
  } as Parameters<typeof app.load>[0]);
  const layout = root.querySelector('u-sidebar-layout') as SidebarLayout;
  await layout.updateComplete;
  return layout;
}
const screen = () => root?.querySelector('[data-screen]')?.getAttribute('data-screen');
const dialog = () => document.querySelector('u-dialog');
const button = (label: string) =>
  Array.from(document.querySelectorAll<HTMLElement>('u-dialog u-button')).find((b) => b.textContent?.trim() === label);
const track = () => releases.push(trackUnsavedChanges(() => dirty));

describe('app.load — 저장 안 한 변경이 있는 화면을 떠날 때', () => {
  it('깨끗하면 묻지 않는다', async () => {
    await load();
    track();
    await app.router!.go('/a');
    await app.router!.go('/b');
    expect(screen()).toBe('b');
    expect(dialog()).toBeNull();
  });

  it('바꾼 것이 있으면 묻는다 — «계속 편집» 이면 머물고, «버리기» 면 떠난다', async () => {
    await load();
    track();
    await app.router!.go('/a');
    dirty = true;
    void app.router!.go('/b');
    await until(() => !!button('Keep editing'), '대화상자');
    expect(dialog()!.textContent).toContain('Changes on this screen have not been saved.');
    expect(dialog()!.querySelector('[slot="header"]')?.textContent).toContain('Discard unsaved changes?');
    button('Keep editing')!.click();
    await quiet();
    expect(screen()).toBe('a');
    expect(location.hash).toBe('#/a');

    void app.router!.go('/b');
    await until(() => !!button('Discard'), '두 번째 대화상자');
    button('Discard')!.click();
    await until(() => screen() === 'b', '버리고 떠남');
  });

  it('뒤로 가기도 묻는다 — 묻는 동안 주소는 떠나던 화면이다', async () => {
    await load();
    track();
    await app.router!.go('/a');
    await app.router!.go('/b');
    dirty = true;
    history.back();
    await until(() => !!button('Keep editing'), '대화상자');
    await until(() => location.hash === '#/b', '되돌림');
    button('Keep editing')!.click();
    await quiet();
    expect(screen()).toBe('b');
    expect(location.hash).toBe('#/b');
  });

  it('앱의 `leave` 가 먼저 — 그것이 막으면 대화상자도 없다', async () => {
    await load({ leave: () => false });
    track();
    dirty = true;
    await app.router!.go('/a');
    await app.router!.go('/b');
    await quiet();
    expect(screen()).toBe('a');
    expect(dialog()).toBeNull();
  });

  it('한국어 셸이면 한국어로 묻는다', async () => {
    Locale.set('ko');
    await load();
    track();
    await app.router!.go('/a');
    dirty = true;
    void app.router!.go('/b');
    await until(() => !!button('계속 편집'), '대화상자');
    expect(button('버리기')).toBeTruthy();
    expect(dialog()!.textContent).toContain('저장되지 않았습니다');
    button('계속 편집')!.click();
    await quiet();
  });
});

describe('문서 이탈 — beforeunload', () => {
  const fire = () => {
    const event = new Event('beforeunload', { cancelable: true });
    window.dispatchEvent(event);
    return event.defaultPrevented;
  };

  it('등록된 판정이 «바꾼 것 있음» 일 때만 확인을 건다 · 해제하면 걸지 않는다', () => {
    const release = trackUnsavedChanges(() => dirty);
    expect(fire()).toBe(false);
    dirty = true;
    expect(fire()).toBe(true);
    release();
    expect(fire()).toBe(false);
  });

  it('던지는 판정은 «바꾼 것 있음» 으로 본다', () => {
    const release = trackUnsavedChanges(() => { throw new Error('boom'); });
    expect(hasUnsavedChanges()).toBe(true);
    release();
    expect(hasUnsavedChanges()).toBe(false);
  });
});

describe('UnsavedChangesController', () => {
  it('붙어 있는 동안만 등록된다', async () => {
    class DraftView extends LitElement {
      draft = '';
      unsaved = new UnsavedChangesController(this, () => this.draft !== '');
      render() { return html`<span>${this.draft}</span>`; }
    }
    customElements.define('x-unsaved-draft', DraftView);
    const el = document.createElement('x-unsaved-draft') as DraftView;
    document.body.appendChild(el);
    expect(hasUnsavedChanges()).toBe(false);
    el.draft = 'typed';
    expect(hasUnsavedChanges()).toBe(true);
    el.remove();
    expect(hasUnsavedChanges()).toBe(false);
  });
});

describe('useUnsavedChanges (React)', () => {
  it('마운트된 동안 매 렌더의 값을 판정으로 쓴다 · 언마운트하면 해제한다', () => {
    function Form({ dirty }: { dirty: boolean }) {
      useUnsavedChanges(dirty);
      return null;
    }
    const container = document.body.appendChild(document.createElement('div'));
    const r = createRoot(container);
    flushSync(() => r.render(React.createElement(Form, { dirty: false })));
    expect(hasUnsavedChanges()).toBe(false);
    flushSync(() => r.render(React.createElement(Form, { dirty: true })));
    expect(hasUnsavedChanges()).toBe(true);
    flushSync(() => r.unmount());
    expect(hasUnsavedChanges()).toBe(false);
    container.remove();
  });
});
