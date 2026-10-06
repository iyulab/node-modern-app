import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/SidebarGroup.js';
import '../../src/components/SidebarLink.js';

/**
 * 사이드바 그룹 머리가 셸 토큰을 따른다.
 *
 * - 그룹 아이콘이 `--app-sidebar-icon-size` 를 읽지 않아(고정 20px) 토큰을 16px 로 정한 테마에서 한 레일에 두 크기였다.
 * - «현재 포함» 글자색이 활성 **면** 에서 파생돼, 연한 면 테마에서 패널 위 1.6:1 로 묻혔다 —
 *   `--app-sidebar-group-active-fg`(패널 위 강조 글자)로 테마가 정한다. 정하지 않으면 종전 식 그대로.
 */
afterEach(() => document.body.replaceChildren());

async function group(style: string, selected = false) {
  const el = document.createElement('u-sidebar-group') as HTMLElement & { updateComplete: Promise<unknown>; items: unknown[] };
  el.setAttribute('label', 'Work');
  el.setAttribute('icon', 'gear');
  if (selected) el.setAttribute('selected', '');
  el.items = [];
  el.style.cssText = style;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const button = (el: HTMLElement) => el.shadowRoot!.querySelector('button') as HTMLElement;
const icon = (el: HTMLElement) => el.shadowRoot!.querySelector('.icon') as HTMLElement;
const rgb = (css: string) => {
  const probe = document.createElement('i');
  probe.style.color = css;
  document.body.appendChild(probe);
  const v = getComputedStyle(probe).color;
  probe.remove();
  return v;
};

describe('SidebarGroup 셸 토큰', () => {
  it('아이콘 크기는 --app-sidebar-icon-size', async () => {
    const el = await group('--app-sidebar-icon-size: 16px');
    expect(getComputedStyle(icon(el)).fontSize).toBe('16px');
  });

  it('NEGATIVE — 토큰이 없으면 종전 20px', async () => {
    const el = await group('');
    expect(getComputedStyle(icon(el)).fontSize).toBe('20px');
  });

  it('«현재 포함» 글자 = --app-sidebar-group-active-fg', async () => {
    const el = await group('--app-sidebar-active-bg: #EAEAE7; --app-sidebar-group-active-fg: #18191B', true);
    expect(getComputedStyle(button(el)).color).toBe(rgb('#18191B'));
  });

  it('NEGATIVE — 토큰이 없으면 활성 면 85% + 검정(종전 식)', async () => {
    const el = await group('--app-sidebar-active-bg: #1976D2', true);
    expect(getComputedStyle(button(el)).color).toBe(rgb('color-mix(in srgb, #1976D2 85%, black)'));
  });
});
