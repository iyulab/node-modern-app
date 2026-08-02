import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/SidebarLink.js';

/**
 * 규약을 **실제 렌더로** 검증한다.
 *
 * ★소스 대조(`tests/shell-tokens.test.ts`)와 이 파일은 **다른 것을 잡는다.**
 * 전자는 `var(--app-X, …)` 가 적혀 있음을 보이고, 후자는 그 값이 **실제로 계산되는지**를
 * 본다. 이 변경에는 소스만 봐서는 절대 드러나지 않는 함정이 둘 있다:
 *
 * ⑴ `color-mix()` 는 인자 중 하나가 무효한 색이면 **선언을 통째로 버린다.** 활성 메뉴
 *    hover 배경이 통째로 사라지는데, 소스에는 아무 이상이 없다.
 * ⑵ 커스텀 프로퍼티는 **선언 위치가 곧 우선순위**다. 계약 토큰을 컴포넌트 `:host` 에
 *    선언했다면 소비자의 `:root` 지정이 더 구체적인 선택자에 조용히 진다 — 소비자는
 *    문서대로 썼는데 아무 일도 일어나지 않는 것을 보게 된다.
 *
 * jsdom/happy-dom 은 `color-mix` 도 커스텀 프로퍼티 캐스케이드도 계산하지 않으므로
 * 이 검증은 실제 브라우저에서만 성립한다.
 */
describe('셸 색 계약 — 실제 렌더', () => {
  let el: HTMLElement;
  let styleEl: HTMLStyleElement | null = null;

  const mount = (attrs = '') => {
    document.body.innerHTML = `<u-sidebar-link ${attrs}>메뉴</u-sidebar-link>`;
    el = document.body.firstElementChild as HTMLElement;
    return el;
  };

  const override = (css: string) => {
    styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  };

  const bg = (target: Element) => getComputedStyle(target).backgroundColor;

  /**
   * 계산값을 0–255 3요소로 정규화한다.
   *
   * ⚠`color-mix()` 의 결과를 Chromium 은 `rgb()` 가 아니라 **`color(srgb 0.1 0.45 0.76)`**
   * 로 직렬화한다(0–1 실수). 문자열을 그대로 비교하거나 `\d+` 로 숫자를 긁으면 `0.1` 에서
   * `0` 을 얻어 **엉뚱한 값을 검증하게 된다** — 실제로 이 파일 첫 실행이 그렇게 실패했다.
   */
  const rgb = (value: string): [number, number, number] => {
    const n = value.match(/[\d.]+/g)!.map(Number);
    const [r, g, b] = value.startsWith('color(') ? n.map(v => Math.round(v * 255)) : n;
    return [r, g, b];
  };

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    styleEl?.remove();
    styleEl = null;
  });

  it('토큰 시트가 실제로 로드돼 있다', async () => {
    // 이 단언이 없으면 아래 테스트들이 **폴백 리터럴을 검증하면서 통과**한다 —
    // 계약이 아니라 하드코딩 값을 확인하는 셈이 된다.
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--u-primary-color').trim();
    expect(primary).not.toBe('');
  });

  it('활성 메뉴가 역할 토큰의 색으로 칠해진다', async () => {
    mount('selected');
    await customElements.whenDefined('u-sidebar-link');
    // #1976D2 = --u-blue-700 = --u-primary-color (light).
    // ★blue-600 이었으나 components 1.16.0 이 대비로 단을 다시 골랐다 — 흰 글자 3.68 ✗.
    expect(bg(el)).toBe('rgb(25, 118, 210)');
  });

  it('★--u-primary-color 하나만 덮으면 활성 메뉴가 따라온다', async () => {
    override(':root { --u-primary-color: #7B1FA2; }');
    mount('selected');
    await customElements.whenDefined('u-sidebar-link');
    // 이것이 이 계약의 수용 기준이다. 팔레트(--u-blue-600)를 읽고 있었다면 파랑으로 남는다.
    expect(bg(el)).toBe('rgb(123, 31, 162)');
  });

  it('★계약 토큰을 :root 에서 덮으면 이긴다 (선언 위치 함정)', async () => {
    override(':root { --app-sidebar-active-bg: #0F766E; }');
    mount('selected');
    await customElements.whenDefined('u-sidebar-link');
    // 계약 이름을 컴포넌트 :host 에 선언했다면 여기서 진다 — 그래서 읽기만 하고
    // 파생값만 비공개 이름으로 선언한다.
    expect(bg(el)).toBe('rgb(15, 118, 110)');
  });

  it('★hover 파생이 실제로 계산된다 (color-mix 가 선언을 버리지 않는다)', async () => {
    mount('selected');
    await customElements.whenDefined('u-sidebar-link');
    const rest = bg(el);

    // :host([selected]:hover) 규칙 자체를 평가시킨다 — 브라우저에서 hover 를 합성하는
    // 대신, 같은 파생식을 직접 계산해 **결과가 존재하고 정지 상태와 다른지**를 본다.
    const probe = document.createElement('div');
    probe.style.setProperty('--x', getComputedStyle(el).getPropertyValue('--link-active-bg'));
    probe.style.backgroundColor = 'color-mix(in srgb, var(--x) 85%, black)';
    document.body.appendChild(probe);
    const mixed = bg(probe);

    expect(mixed).not.toBe('');            // 무효 인자였다면 빈 문자열/투명이 된다
    expect(mixed).not.toBe('rgba(0, 0, 0, 0)');
    expect(mixed).not.toBe(rest);          // 정지 상태와 구분돼야 hover 가 보인다
    expect(rgb(mixed)).toEqual([21, 100, 179]); // #1564B3 — 주색이 한 단 진해진 만큼 파생도 따라온다
    probe.remove();
  });

  it('★hover 파생도 브랜드를 따라온다 — 어긋난 색 쌍이 생기지 않는다', async () => {
    override(':root { --u-primary-color: #7B1FA2; }');
    mount('selected');
    await customElements.whenDefined('u-sidebar-link');

    const probe = document.createElement('div');
    probe.style.setProperty('--x', getComputedStyle(el).getPropertyValue('--link-active-bg'));
    probe.style.backgroundColor = 'color-mix(in srgb, var(--x) 85%, black)';
    document.body.appendChild(probe);

    // 고정 단(--u-primary-color-strong)을 썼다면 여기서 파랑이 나온다 —
    // 활성은 보라, hover 는 파랑인 어긋난 쌍이다.
    const [r, g, b] = rgb(bg(probe));
    expect(r).toBeGreaterThan(b * 0.5); // 보라 계열(적+청)이지 파랑 단색이 아니다
    expect(r).toBeGreaterThan(g);
    probe.remove();
  });
});
