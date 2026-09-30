import { describe, it, expect, beforeEach } from 'vitest';
import { page } from 'vitest/browser';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';
import '../../src/components/SidebarLink.js';

/**
 * `target: '_blank'` 인 사이드바 링크는 새 창으로 연다는 사실을 미리 알려야 한다
 * (KWCAG 7.2.1 사용자 요구에 따른 실행). 접근성 이름 끝에 로케일 문구가 붙고, 화면에는 보이지
 * 않는다. 실제 접근성 트리(플레이라이트 역할 질의 — 섀도 경계를 넘는다)로 잰다.
 */
describe('u-sidebar-link — 새 창 링크의 접근성 이름', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    Locale.set('en');
  });

  async function mount(attrs: string) {
    document.body.innerHTML = `<u-sidebar-link href="https://example.com/help" label="Help" ${attrs}></u-sidebar-link>`;
    const el = document.querySelector('u-sidebar-link') as HTMLElement & { updateComplete: Promise<unknown> };
    await el.updateComplete;
    return el;
  }

  it('새 창 링크는 이름 끝에 알림이 붙는다', async () => {
    await mount('target="_blank"');
    await expect.element(page.getByRole('link', { name: 'Help (opens in a new tab)' })).toBeInTheDocument();
  });

  it('같은 창 링크에는 붙지 않는다', async () => {
    await mount('');
    await expect.element(page.getByRole('link', { name: 'Help', exact: true })).toBeInTheDocument();
  });

  it('접힌(compact) 상태에서도 이름에 남는다', async () => {
    await mount('target="_blank" compact');
    await expect.element(page.getByRole('link', { name: 'Help (opens in a new tab)' })).toBeInTheDocument();
  });

  it('로케일을 따른다', async () => {
    Locale.set('ko');
    await mount('target="_blank"');
    await expect.element(page.getByRole('link', { name: 'Help (새 창에서 열림)' })).toBeInTheDocument();
  });

  it('화면에는 보이지 않는다', async () => {
    const el = await mount('target="_blank"');
    const hint = el.shadowRoot!.querySelector('.new-tab-hint')!;
    const r = hint.getBoundingClientRect();
    expect(r.width <= 1 && r.height <= 1).toBe(true);
  });
});
