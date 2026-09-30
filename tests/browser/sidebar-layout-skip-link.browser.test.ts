import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { LitElement, html } from 'lit';
import '@iyulab/components/styles/tokens.css';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * 셸의 본문 랜드마크와 «본문 바로가기»(WCAG 2.4.1 Bypass Blocks · KWCAG 2.2 «반복 영역 건너뛰기»).
 *
 * 사이드바 메뉴는 화면마다 반복된다. 키보드 사용자가 매 화면에서 메뉴 전체를 Tab 으로 지나지 않도록
 * 첫 Tab 에 바로가기 링크가 있어야 하고, 스크린 리더가 본문으로 건너뛸 `main` 랜드마크가 있어야 한다.
 * 링크가 옮기는 포커스는 라우트 완료 때와 같은 규칙이다(`#517`) — 화면의 `[autofocus]`, 없으면 본문.
 */
let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement('div');
  host.style.height = '400px';
  document.body.appendChild(host);
});
afterEach(() => { host.remove(); Locale.set('en'); });

class FormScreen extends LitElement {
  render() { return html`<label>Code <input id="code" autofocus></label>`; }
}
customElements.define('test-skip-form-screen', FormScreen);

async function mount(content?: Element): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }, { type: 'link', label: 'Orders', href: '/orders' }] } as never;
  if (content) el.appendChild(content);
  host.appendChild(el);
  await el.updateComplete;
  await new Promise((r) => setTimeout(r, 50));
  return el;
}

/** 셸 바로 앞의 포커스 지점에서 Tab 한 번 — 셸의 첫 Tab 정지점으로 간다. */
async function tabIntoShell(): Promise<void> {
  const before = document.createElement('button');
  before.textContent = 'before';
  host.prepend(before);
  before.focus();
  await userEvent.tab();
}

function deepActive(): Element | null {
  let a: Element | null = document.activeElement;
  while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
  return a;
}

describe('SidebarLayout — main 랜드마크와 본문 바로가기', () => {
  it('본문은 main 랜드마크다(하나)', async () => {
    const el = await mount();
    const mains = el.shadowRoot!.querySelectorAll('main, [role="main"]');
    expect(mains.length).toBe(1);
    expect(mains[0].getAttribute('part')).toBe('main');
  });

  it('첫 Tab 은 바로가기 링크이고, 포커스되면 보이며 24px 이상이다', async () => {
    const el = await mount();
    await tabIntoShell();
    const link = deepActive() as HTMLElement;
    expect(link?.getAttribute('part')).toBe('skip-link');
    expect(link.textContent?.trim()).toBe('Skip to main content');
    const box = link.getBoundingClientRect();
    expect(box.width).toBeGreaterThanOrEqual(24);
    expect(box.height).toBeGreaterThanOrEqual(24);
    expect(box.top).toBeGreaterThanOrEqual(0); // 화면 안에 보인다
    // 포커스가 없을 때는 보이지 않는다(자리도 차지하지 않는다)
    link.blur();
    await el.updateComplete;
    const hidden = link.getBoundingClientRect();
    expect(hidden.width <= 1 || hidden.bottom <= 0).toBe(true);
  });

  it('누르면 본문으로 간다 — 화면이 선언한 [autofocus] 가 있으면 그것', async () => {
    await mount(document.createElement('test-skip-form-screen'));
    await tabIntoShell();
    await userEvent.keyboard('{Enter}');
    await new Promise((r) => setTimeout(r, 50));
    expect((deepActive() as HTMLElement)?.id).toBe('code');
  });

  it('선언이 없으면 본문(main) 자체로 간다', async () => {
    const el = await mount();
    await tabIntoShell();
    await userEvent.keyboard('{Enter}');
    await new Promise((r) => setTimeout(r, 50));
    expect(deepActive()?.getAttribute('part')).toBe('main');
    expect(el.shadowRoot!.activeElement?.localName).toBe('main');
  });

  it('문구는 로케일을 따른다', async () => {
    Locale.set('ko');
    const el = await mount();
    const link = el.shadowRoot!.querySelector('[part="skip-link"]')!;
    expect(link.textContent?.trim()).toBe('본문으로 건너뛰기');
  });
});
