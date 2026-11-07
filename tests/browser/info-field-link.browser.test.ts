import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import '../../src/components/InfoField.js';
import type { InfoField } from '../../src/components/InfoField.js';

/**
 * `u-info-field` 에 `href` 를 주면 칸 전체가 링크다 — «지표를 눌러 그 목록으로 간다».
 *
 * 소비자는 `role="link"` + `tabindex` + 클릭 · Enter · Space 처리 + 포커스 · hover 모양을 칸마다 손으로 달아야 했다.
 * `u-card` 가 이미 같은 말(`href` · `target` · `rel` · `download`)로 한다 — 바깥 상자(`part="base"`)가 진짜 `<a>` 가 되어
 * 포커스 · Enter · 새 탭 · 컨텍스트 메뉴를 브라우저가 준다.
 */

const mount = async (html: string): Promise<InfoField> => {
  document.body.innerHTML = html;
  const el = document.querySelector('u-info-field') as InfoField;
  await el.updateComplete;
  return el;
};
const base = (el: InfoField) => el.shadowRoot!.querySelector('[part="base"]') as HTMLElement;

afterEach(() => { document.body.innerHTML = ''; window.location.hash = ''; });

describe('u-info-field — href', () => {
  it('🔴with href the base box is a real link with the given target, rel and download', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" href="#orders" target="_blank" rel="noopener"></u-info-field>`);
    const a = base(el);
    expect(a.localName).toBe('a');
    expect(a.getAttribute('href')).toBe('#orders');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
  });

  it('without href nothing changes — the base is a plain box, no link role', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12"></u-info-field>`);
    expect(base(el).localName).toBe('div');
    expect(el.shadowRoot!.querySelector('a')).toBeNull();
  });

  it('🔴a real press on the tile navigates (the browser, not a handler)', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" href="#orders"></u-info-field>`);
    await userEvent.click(base(el));
    expect(window.location.hash).toBe('#orders');
  });

  it('🔴the link is in the tab order and Enter on it follows it', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" href="#by-key"></u-info-field>`);
    // Tab 으로 링크에 서는가는 엔진 기본 설정이다(Safari 는 기본으로 링크에 서지 않는다) — 순서에 «들어 있는가» 와 포커스 뒤 Enter 를 잰다.
    expect((base(el) as HTMLAnchorElement).tabIndex, '탭 순서에 든다(−1 이 아니다)').toBe(0);
    base(el).focus();
    expect(el.shadowRoot!.activeElement).toBe(base(el));
    await userEvent.keyboard('{Enter}');
    expect(window.location.hash).toBe('#by-key');
  });

  it('the link is named by the label and the value, and reads as a link to assistive technology', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" unit="items" href="#orders"></u-info-field>`);
    const a = base(el);
    const text = a.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('Open orders');
    expect(text).toContain('12');
    expect(a.getAttribute('role'), '`<a href>` 는 이미 link 다 — 역할을 덧붙이지 않는다').toBeNull();
  });

  it('a link tile shows it can be pressed: pointer cursor, ink colour, no underline; the focus ring is drawn', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" href="#orders"></u-info-field>`);
    const s = getComputedStyle(base(el));
    expect(s.cursor).toBe('pointer');
    expect(s.textDecorationLine).toBe('none');
    expect(s.color, '링크 파랑이 아니라 칸의 글자색').toBe(getComputedStyle(el).color);
    base(el).focus({ focusVisible: true } as FocusOptions);
    const f = getComputedStyle(base(el));
    expect(parseFloat(f.outlineWidth), '키보드 포커스 링').toBeGreaterThan(0);
  });

  it('the tile keeps its surface when it is a link (border and padding live on the base)', async () => {
    const el = await mount(`<u-info-field appearance="tile" label="Open orders" value="12" href="#orders"></u-info-field>`);
    const s = getComputedStyle(base(el));
    expect(s.borderTopStyle).toBe('solid');
    expect(parseFloat(s.paddingTop)).toBeGreaterThan(0);
  });
});
