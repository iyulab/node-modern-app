import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/SidebarLink.js';
import '../../src/components/SidebarButton.js';
import '../../src/components/SidebarGroup.js';

/**
 * 규약: **접힌 사이드바에서 모든 내비 항목은 «누를 것»을 갖는다.**
 *
 * 이 결함은 «아이콘이 안 보인다»가 아니라 ***«선택할 수단이 없어진다»*** 다. 접힌 상태에서는
 * 라벨(과 그룹의 캐럿)이 숨으므로, 아이콘까지 없으면 버튼이 **빈 상자**가 된다.
 *
 * 🔴 이 파일이 뒤늦게 생긴 이유가 이 파일의 존재 이유다 — 폴백은 `u-icon` 의 해석 실패
 * 지점에 올바르게 걸렸지만(`DL-218-3`), **호출부 셋 중 둘만 고쳤다.** `SidebarGroup` 은
 * `?hidden=${!this.icon}` 으로 폴백을 무력화한 채 남아 있었고, 아무 테스트도 그것을 보지
 * 않았다. 세 종류를 **한 목록으로** 도는 것이 이 자의 설계다 — 항목 종류가 늘면 여기 더한다.
 */

const NAV_ITEMS = ['u-sidebar-link', 'u-sidebar-button', 'u-sidebar-group'] as const;

async function mount(tag: string, attrs: Record<string, string> = {}) {
  const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<unknown> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const pressable = (el: HTMLElement) =>
  el.shadowRoot!.querySelector('[part="base"], [part="header"], .container, button') as HTMLElement;

const visibleIcon = (el: HTMLElement) => {
  const icon = el.shadowRoot!.querySelector('[part="icon"]') as HTMLElement | null;
  if (!icon) return null;
  const box = icon.getBoundingClientRect();
  return box.width > 0 && box.height > 0 ? icon : null;
};

describe('접힌 사이드바 — 누를 것이 있다', () => {
  beforeAll(() => {
    expect(NAV_ITEMS.every(t => customElements.get(t)), '세 종류가 모두 등록됐다').toBe(true);
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  for (const tag of NAV_ITEMS) {
    it(`★${tag} — 아이콘 없이 접혀도 그릴 것이 남는다`, async () => {
      const el = await mount(tag, { label: '항목', compact: '' });
      const box = pressable(el).getBoundingClientRect();
      expect(box.width, '누를 면의 폭').toBeGreaterThan(0);
      expect(box.height, '누를 면의 높이').toBeGreaterThan(0);
      expect(visibleIcon(el), '접힌 상태에서 보이는 것은 아이콘뿐이다').not.toBeNull();
    });

    it(`${tag} — 이름이 해석되지 않아도(존재하지 않는 아이콘) 마찬가지다`, async () => {
      // 실측된 사례는 «아이콘을 안 줬을 때»가 아니라 **이름은 있는데 파일이 없는** 쪽이었다.
      // ⚠이 경로는 **비동기**다 — 이름을 URL 로 풀고 그 요청이 실패한 뒤에야 폴백이 그려진다.
      //   첫 판이 그 대기 없이 단언해 세 항목 모두에서 실패했다(결함이 아니라 시점 문제였다).
      const el = await mount(tag, { label: '항목', icon: 'no-such-icon-name', compact: '' });
      await expect.poll(() => visibleIcon(el) !== null, { timeout: 3000 }).toBe(true);
    });
  }

  it('NEGATIVE — 펼친 상태에서는 라벨도 함께 보인다 (접힘 규약이 라벨을 지우지 않는다)', async () => {
    for (const tag of NAV_ITEMS) {
      const el = await mount(tag, { label: '항목' });
      const label = el.shadowRoot!.querySelector('[part="label"]') as HTMLElement;
      expect(label.getBoundingClientRect().width, tag).toBeGreaterThan(0);
      el.remove();
    }
  });
});
