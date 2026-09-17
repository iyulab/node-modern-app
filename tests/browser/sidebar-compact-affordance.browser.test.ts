/// <reference types="@vitest/browser-playwright" />
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import i18next from 'i18next';
import { translate } from '../../src/translate.js';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/router'; // u-link — 실제 앱에서는 셸(App.js)이 등록한다
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

  /**
   * **접힘이 「누를 것」은 지키지만 「이름」은 지키지 못하고 있었다** (docket #109 실측 —
   * `SidebarButton`. 같은 파일 안 조사로 `SidebarLink`·`SidebarGroup`도 같은 결함을 겪고
   * 있음을 확인해 세 종류 전부 함께 고쳤다). `part="label"`이 `?hidden`으로 접근성 트리에서도
   * 빠지므로, 대체 이름(`aria-label`)이 없으면 스크린리더에는 **이름 없는 버튼**으로 남는다.
   * 위 목록과 같은 이유로 세 종류를 한 목록으로 돈다.
   */
  const accessibleNameHost = (tag: string, el: HTMLElement): HTMLElement =>
    (tag === 'u-sidebar-link' ? el.shadowRoot!.querySelector('u-link') : pressable(el)) as HTMLElement;

  // ⚠cycle-663 부터 이름은 `aria-label` 이 아니라 **시각적으로만 숨긴 라벨 내용**에서 온다 —
  //   속성 대신 계산된 이름을 잰다(역할 로케이터가 섀도 루트를 뚫고 계산한다).
  const roleOf = (tag: string) => (tag === 'u-sidebar-link' ? 'link' : 'button');

  for (const tag of NAV_ITEMS) {
    it(`★${tag} — 접힌 상태에서도 접근 가능한 이름이 남는다`, async () => {
      await mount(tag, { label: '항목', compact: '' });
      await expect.element(page.getByRole(roleOf(tag), { name: '항목' })).toBeInTheDocument();
    });

    it(`${tag} — 접힌 상태의 라벨은 보이지 않는다(시각 전용 숨김)`, async () => {
      const el = await mount(tag, { label: '항목', compact: '' });
      const label = el.shadowRoot!.querySelector('[part="label"]') as HTMLElement;
      const box = label.getBoundingClientRect();
      expect(box.width * box.height).toBeLessThanOrEqual(1);
    });
  }

  it('NEGATIVE — 펼친 상태에서는 aria-label을 강제하지 않는다 (보이는 라벨이 이미 이름이다)', async () => {
    for (const tag of NAV_ITEMS) {
      const el = await mount(tag, { label: '항목' });
      expect(accessibleNameHost(tag, el).hasAttribute('aria-label'), tag).toBe(false);
      el.remove();
    }
  });

  /**
   * 🔴**번역 라벨(디렉티브)도 접힌 상태에서 이름을 잃지 않는다** (cycle-663).
   *
   * 위 수정은 `label` 이 **문자열일 때만** `aria-label` 로 승격한다 — 디렉티브 결과는 평문화할 수 없어서다.
   * 그런데 라벨 자리는 번역 디렉티브를 받도록 설계됐고(`string | DirectiveResult`), 라벨 자체는
   * `?hidden` 으로 접근성 트리에서 빠졌다. ⇒ 번역한 사이드바를 접으면 **이름 없는 버튼**이었다.
   * 속성이 아니라 **계산된 접근성 이름**으로 잰다(역할 로케이터는 섀도 루트를 뚫고 이름을 계산한다).
   */
  for (const tag of NAV_ITEMS) {
    it(`🔴${tag} — 접힌 상태에서 번역 디렉티브 라벨도 접근 가능한 이름이 된다`, async () => {
      if (!i18next.isInitialized) {
        await i18next.init({ lng: 'en', resources: { en: { nav: { home: 'Dashboard' } } }, nsSeparator: '::' });
      }
      const el = document.createElement(tag) as HTMLElement & { label: unknown; compact: boolean; updateComplete: Promise<unknown> };
      el.label = translate('nav::home');
      el.compact = true;
      document.body.appendChild(el);
      await el.updateComplete;
      await expect.element(page.getByRole(roleOf(tag), { name: 'Dashboard' })).toBeInTheDocument();
    });
  }
});
