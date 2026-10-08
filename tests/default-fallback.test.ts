// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';
import type { EmptyState } from '../src/components/EmptyState.js';
import { variantOf } from '../src/internals/default-fallback.js';

/**
 * **`fallback` 을 주지 않은 앱의 라우팅 실패는 빈 상태로 그려진다.**
 *
 * | 실패 | 화면 |
 * |---|---|
 * | 가드 거부(403) | `no-access` — 경보 아님 |
 * | 없는 경로(404) | `not-found` |
 * | 그 밖(로드 · 렌더 실패) | `error` — 제목은 화면 단위, 설명은 오류 메시지 |
 * | 소비자 `fallback` | 그것이 그대로 이긴다 |
 *
 * 종전에는 router 의 `UErrorPage`(상태 코드 화면)가 그려졌다 — 앱 프레임워크의 기본 화면이 자기 어휘 밖이었다.
 */
async function load(extra: Record<string, unknown> = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  await app.load({
    root,
    layout: { type: 'sidebar' },
    initialLoad: false,
    enter: (ctx) => ctx.pathname !== '/admin',
    routes: [
      { path: '/home', render: () => document.createElement('section') },
      { path: '/admin', render: () => document.createElement('section') },
      { path: '/broken', render: () => { throw new Error('boom'); } },
    ],
    ...extra,
  });
  return root;
}

const shown = (root: HTMLElement) => root.querySelector('u-outlet')?.querySelector('u-empty-state') as EmptyState | null;

describe('기본 fallback', () => {
  afterEach(() => {
    app.unload();
    Locale.set('en');
    document.body.replaceChildren();
  });

  it('가드 거부(403)는 no-access', async () => {
    const root = await load();
    await app.router!.go('/admin');
    expect(shown(root)?.variant).toBe('no-access');
    expect(root.querySelector('u-error-page')).toBeNull();
  });

  it('없는 경로(404)는 not-found', async () => {
    const root = await load();
    await app.router!.go('/nowhere');
    expect(shown(root)?.variant).toBe('not-found');
  });

  it('그 밖의 실패는 error — 제목은 화면 단위(목록 문구 아님), 설명은 오류 메시지', async () => {
    const root = await load();
    await app.router!.go('/broken');
    const el = shown(root)!;
    expect(el.variant).toBe('error');
    expect(el.title).toBe('Couldn’t open this page');
    expect(el.description).toBeTruthy();
  });

  it('제목은 활성 로케일을 따른다', async () => {
    Locale.set('ko');
    const root = await load();
    await app.router!.go('/broken');
    expect(shown(root)!.title).toBe('화면을 열지 못했습니다');
  });

  it('소비자 fallback 이 있으면 그것이 이긴다', async () => {
    const root = await load({ fallback: { render: () => Object.assign(document.createElement('p'), { id: 'mine' }) } });
    await app.router!.go('/admin');
    expect(root.querySelector('#mine')).not.toBeNull();
    expect(shown(root)).toBeNull();
  });

  it('판정은 코드로 한다 — 라우트가 던진 상태도 같다', () => {
    expect(variantOf({ code: 403 })).toBe('no-access');
    expect(variantOf({ code: '404' })).toBe('not-found');
    expect(variantOf({ code: 'CONTENT_RENDER_FAILED' })).toBe('error');
    expect(variantOf({ code: 500 })).toBe('error');
  });
});
