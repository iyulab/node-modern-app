/// <reference types="@vitest/browser-playwright" />
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cdp } from 'vitest/browser';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import '../../src/components/MasterDetailLayout.js';
import { app } from '../../src/App.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * **셸은 인쇄 매체에서 자기 크롬을 접고 스크롤 컨테이너를 푼다.**
 *
 * 화면에서 셸은 뷰포트를 채우는 고정 높이 상자이고 본문은 그 안의 스크롤 컨테이너다. 그 모델을
 * 인쇄에 그대로 가져가면 ⑴사이드바가 종이에 찍히고 ⑵스크롤 컨테이너 밖 내용이 다음 쪽으로 흐르지
 * 않고 첫 쪽 높이에서 잘린다. 인쇄는 LOB 화면(청구서·명세서)의 일반 요구다.
 *
 * ## 왜 브라우저 + 매체 에뮬레이션인가
 *
 * 잘림은 계산된 레이아웃으로만 갈린다(jsdom 은 박스를 계산하지 않는다). 그리고 «`@media print`
 * 규칙이 시트에 있다» 는 것은 배치가 아니다 — 규칙이 실제로 이기는지(선언 순서 · 특이도 · 인라인
 * 스타일)는 매체를 print 로 바꾼 뒤 계산값으로만 확인된다. CDP `Emulation.setEmulatedMedia` 는
 * `page.pdf()` 가 쓰는 것과 같은 매체 판정을 켠다.
 */

const CONTENT = 1500;

async function setMedia(media: 'print' | '') {
  await cdp().send('Emulation.setEmulatedMedia', { media });
  await settle();
}

const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 60));
};

afterEach(async () => {
  await setMedia('');
});

describe('u-sidebar-layout — print media', () => {
  let host: HTMLDivElement;
  let el: SidebarLayout;

  beforeEach(async () => {
    host = document.createElement('div');
    host.style.cssText = 'width: 900px; height: 400px;';
    document.body.appendChild(host);
    el = document.createElement('u-sidebar-layout') as SidebarLayout;
    el.config = {
      type: 'sidebar',
      title: 'App',
      main: [{ type: 'link', label: 'Home', href: '/' }],
    } as SidebarLayoutConfig;
    const content = document.createElement('div');
    content.style.height = `${CONTENT}px`;
    content.textContent = 'invoice';
    el.appendChild(content);
    host.appendChild(el);
    await el.updateComplete;
    await settle();
  });
  afterEach(() => {
    document.body.replaceChildren();
  });

  const part = (name: string) => el.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement;

  it('screen: the shell is a fixed box with a scrolling main area (baseline)', () => {
    expect(getComputedStyle(part('sidebar')).display).not.toBe('none');
    expect(el.getBoundingClientRect().height).toBe(400);
    const main = part('main');
    expect(main.scrollHeight).toBeGreaterThan(main.clientHeight);
  });

  it('print: chrome is hidden and the main area grows to its content instead of clipping', async () => {
    await setMedia('print');

    expect(getComputedStyle(part('sidebar')).display).toBe('none');
    expect(getComputedStyle(part('mobile-header')).display).toBe('none');
    expect(getComputedStyle(part('progress')).display).toBe('none');

    const main = part('main');
    // 스크롤 컨테이너가 아니다 — 내용 전부가 흐름에 있다.
    expect(main.scrollHeight).toBeLessThanOrEqual(main.clientHeight + 1);
    expect(el.getBoundingClientRect().height).toBeGreaterThanOrEqual(CONTENT);
    // 본문이 사이드바 폭만큼 밀리지 않는다.
    expect(Math.round(main.getBoundingClientRect().left)).toBe(Math.round(host.getBoundingClientRect().left));
  });

  it('print: a master-detail screen inside the shell flows too (its panes stop clipping with the shell)', async () => {
    // master-detail 의 두 판은 자기 스크롤 컨테이너(overflow: auto)지만 높이를 부모에서 받는다 —
    // 셸이 인쇄에서 높이를 풀면 `height: 100%` 가 auto 로 풀려 판도 내용만큼 자란다. 추정이 아니라 잰다.
    el.replaceChildren();
    const md = document.createElement('u-master-detail-layout');
    const master = document.createElement('div');
    master.style.height = `${CONTENT}px`;
    const detail = document.createElement('div');
    detail.slot = 'detail';
    detail.style.height = `${CONTENT}px`;
    md.append(master, detail);
    el.appendChild(md);
    await settle();

    await setMedia('print');
    for (const name of ['.master', '.detail']) {
      const pane = md.shadowRoot!.querySelector(name) as HTMLElement;
      expect(pane.scrollHeight, name).toBeLessThanOrEqual(pane.clientHeight + 1);
    }
  });

  it('print: a narrow master-detail in overlay mode prints its detail in full, not clipped to the master height', async () => {
    host.style.width = '500px';
    el.replaceChildren();
    const md = document.createElement('u-master-detail-layout');
    const master = document.createElement('div');
    master.style.height = '300px';
    const detail = document.createElement('div');
    detail.slot = 'detail';
    detail.style.height = `${CONTENT}px`;
    md.append(master, detail);
    el.appendChild(md);
    await settle();
    await settle();
    expect(md.hasAttribute('overlay')).toBe(true);

    const shadow = md.shadowRoot!;
    const detailPane = shadow.querySelector('.detail') as HTMLElement;
    // Screen stays as it was: the detail covers the master.
    expect(getComputedStyle(detailPane).position).toBe('absolute');

    // 실측(수정 전): detail 은 master 높이 300 에 묶여 1500 중 1200 이 잘렸고 닫기 버튼이 찍혔다.
    await setMedia('print');
    expect(detailPane.scrollHeight).toBeLessThanOrEqual(detailPane.clientHeight + 1);
    expect(detailPane.getBoundingClientRect().height).toBeGreaterThanOrEqual(CONTENT);
    expect(getComputedStyle(shadow.querySelector('.detail-close')!).display).toBe('none');
    // What was on screen is what prints: the covered master is not printed.
    expect(getComputedStyle(shadow.querySelector('.master')!).display).toBe('none');
  });

  it('print: an overlay master-detail with no detail prints its master', async () => {
    host.style.width = '500px';
    el.replaceChildren();
    const md = document.createElement('u-master-detail-layout');
    const master = document.createElement('div');
    master.style.height = `${CONTENT}px`;
    md.append(master);
    el.appendChild(md);
    await settle();
    await settle();
    expect(md.hasAttribute('overlay')).toBe(true);

    await setMedia('print');
    const masterPane = md.shadowRoot!.querySelector('.master') as HTMLElement;
    expect(getComputedStyle(masterPane).display).not.toBe('none');
    expect(masterPane.scrollHeight).toBeLessThanOrEqual(masterPane.clientHeight + 1);
  });

  it('print: a consumer can bring the chrome back with ::part (escape hatch stays open)', async () => {
    const style = document.createElement('style');
    style.textContent = '@media print { u-sidebar-layout::part(sidebar) { display: flex; } }';
    document.head.appendChild(style);
    try {
      await setMedia('print');
      expect(getComputedStyle(part('sidebar')).display).toBe('flex');
    } finally {
      style.remove();
    }
  });
});

describe('app.load() — document.body sizing', () => {
  afterEach(() => {
    app.unload();
    document.body.replaceChildren();
  });

  it('sizes body to the viewport on screen without inline styles, and releases it for print', async () => {
    await app.load({
      layout: { type: 'sidebar', title: 'App' },
      routes: [{ path: '/', render: () => 'home' }],
    } as any);
    const filler = document.createElement('div');
    filler.style.height = `${CONTENT}px`;
    document.body.appendChild(filler);
    await settle();

    // 인라인이 아니므로 소비자의 문서 CSS 가 이길 수 있다.
    expect(document.body.style.height).toBe('');
    // ⚠화면 높이 단언만으로는 판별력이 없다 — 러너 페이지의 `body { min-height: 100vh }` 가 같은 값을
    //   낸다. 판별하는 것은 아래 인쇄 단언(종전 인라인 100vh 는 인쇄에서도 뷰포트 높이에 묶였다)이다.
    expect(Math.round(document.body.getBoundingClientRect().height)).toBe(window.innerHeight);

    await setMedia('print');
    expect(document.body.getBoundingClientRect().height).toBeGreaterThan(window.innerHeight);
  });

  it('a consumer body rule wins over the shell default (no inline precedence)', async () => {
    // ⚠높이로 재지 않는다 — 브라우저 러너의 테스트 페이지가 `body { min-height: 100vh }` 를 갖고 있어
    //   소비자 높이 규칙이 이겨도 계산 높이는 뷰포트에 머문다(탐침 실측). 폭은 그런 간섭이 없다.
    const style = document.createElement('style');
    style.textContent = 'body { width: 500px; }';
    document.head.appendChild(style);
    try {
      await app.load({ layout: { type: 'sidebar', title: 'App' }, routes: [{ path: '/', render: () => 'home' }] } as any);
      await settle();
      expect(Math.round(document.body.getBoundingClientRect().width)).toBe(500);
    } finally {
      style.remove();
    }
  });
});

/**
 * **픽스처가 실제 트리를 담아야 한다 — 셸과 화면 «사이»에 `<u-outlet>` 이 있다.**
 *
 * 위 스위트들은 내용을 셸에 **직접** 붙인다(`el.appendChild(content)`). 실제 앱은 그렇지 않다 —
 * `App.load()` 가 셸 안에 `<u-outlet>` 을 만들어 라이트 DOM 에 붙이고 라우트 화면은 그 **안**에
 * 들어간다(`App.ts`). 즉 위 스위트가 전부 초록인 동안에도 «셸 → 아웃렛 → 화면» 배치는 인쇄
 * 매체에서 **한 번도 측정된 적이 없었다**.
 *
 * 그 공백은 추상적인 것이 아니었다: 아웃렛은 스타일 없는 `HTMLElement` 라 UA 기본 `display:inline`
 * 을 그대로 갖고 있었고(router `#302`), 그 사실을 이 패키지의 인쇄 스위트는 볼 수 없었다.
 * 여기서는 라우팅을 태우지 않는다 — 재는 것은 라우트 매칭이 아니라 **상자 모델**이다.
 */
describe('u-sidebar-layout — 실제 트리(셸 → u-outlet → 화면)', () => {
  let outlet: HTMLElement;

  beforeEach(async () => {
    await app.load({
      layout: { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'Home', href: '/' }] },
      routes: [{ path: '/__never__', render: () => document.createElement('div') }],
    } as any);
    await settle();
    outlet = document.querySelector('u-outlet') as HTMLElement;
    const content = document.createElement('div');
    content.style.height = `${CONTENT}px`;
    content.textContent = 'invoice';
    outlet.replaceChildren(content);
    await settle();
  });

  afterEach(async () => {
    await setMedia('');
    document.body.replaceChildren();
  });

  it('아웃렛이 실제로 셸과 화면 사이에 있다 (픽스처 전제)', () => {
    expect(outlet).toBeTruthy();
    expect(outlet.closest('u-sidebar-layout')).not.toBeNull();
  });

  it('print: 아웃렛은 인라인 상자가 아니다 — 라우트 화면이 블록 흐름에 있다', async () => {
    await setMedia('print');
    // 커스텀 엘리먼트의 UA 기본값은 inline 이다. 라우터가 자기 컨테이너의 표시 방식을 선언하지
    // 않으면 라우트 화면(블록)이 인라인 상자에 담긴다 — router #302.
    // ⚠**여기가 재는 것은 「inline 이 아니다」뿐이다.** 어떤 블록 레벨 값인지는 `@iyulab/router`
    //   의 계약이고 그 패키지의 회귀가 고정한다 — 사본으로 값을 박으면 상류가 정당하게 바꿀 때
    //   소비자 스위트가 «결함처럼» 깨진다(실제로 cycle-645 의 `block` → `grid` 에서 깨졌다).
    expect(getComputedStyle(outlet).display).not.toBe('inline');
  });

  it('print: 내용이 아웃렛에서 잘리지 않고 아웃렛이 내용만큼 자란다', async () => {
    await setMedia('print');
    expect(outlet.scrollHeight).toBeLessThanOrEqual(outlet.clientHeight + 1);
    expect(outlet.getBoundingClientRect().height).toBeGreaterThanOrEqual(CONTENT);
  });

  it('screen: 화면에서도 아웃렛은 인라인 상자가 아니다', async () => {
    // 🔴종전 판은 여기서 «두 매체의 값이 같은가» 를 쟀다 — 그것도 상류 계약의 사본이었고, router
    //   0.15.1 이 인쇄에서만 `block` 으로 바꾸자(끝 블록 여백이 grid 에 갇혀 빈 꼬리 쪽이 생겼다 —
    //   router #302 3차) **정당한 변경에 «결함처럼» 깨졌다**(cycle-661). 바로 위 주석이 경고한
    //   실패를 한 번 더 밟은 자리다. ⇒ 소비자가 기대는 것은 «inline 이 아니다» 뿐이고, 매체별 값은
    //   `@iyulab/router` 의 회귀가 고정한다.
    expect(getComputedStyle(outlet).display).not.toBe('inline');
  });
});

/**
 * **인쇄에서 판 안 마지막 블록의 아래 여백이 레이아웃 «밖» 으로 접히는가** (cycle-661).
 *
 * 여백이 어느 상자 안에 갇히면 그 상자가 여백만큼 자라고, 내용 끝이 쪽 경계에서 그 여백 이내에 있으면
 * **여백만 담긴 빈 꼬리 쪽**이 찍힌다(router `#302` 와 같은 기전). 이 레이아웃은 화면에서 flex 호스트 +
 * `overflow: auto` 판이라 두 겹 모두 여백을 가둔다 — 수정 전 실측: 세 모드 전부 300 → **324**.
 *
 * ★**한 판만 보이는 모드(오버레이 · detail 없음)** 에서는 flex 뼈대가 인쇄에서 할 일이 없다 — 그때만
 *   블록 흐름으로 돌린다. **나란히 배치** 는 두 열이 flex 항목이라 원리적으로 가둔다(flex 항목은 항상
 *   독립 서식 문맥이다) — 화면에 보인 두 열을 그대로 찍는 것이 이 레이아웃의 인쇄 계약이므로 고정한다.
 */
describe('u-master-detail-layout — print: trailing margin of the last block', () => {
  const CONTENT = 300;
  let wrapper: HTMLDivElement;
  let md: HTMLElement;

  const block = () => {
    const outer = document.createElement('div');
    outer.innerHTML = `<div style="height:${CONTENT}px;margin-bottom:24px">x</div>`;
    return outer;
  };

  async function mount(width: number, withDetail: boolean) {
    wrapper = document.createElement('div');
    wrapper.style.width = `${width}px`;
    md = document.createElement('u-master-detail-layout');
    md.append(block());
    if (withDetail) {
      const d = block();
      d.slot = 'detail';
      md.append(d);
    }
    wrapper.appendChild(md);
    document.body.appendChild(wrapper);
    await settle();
    await settle();
  }

  afterEach(() => {
    document.body.replaceChildren();
  });

  const hh = (el: Element) => Math.round(el.getBoundingClientRect().height);

  it('exposes :state(detail) while the detail slot has content', async () => {
    await mount(1000, false);
    expect(md.matches(':state(detail)')).toBe(false);
    const d = block();
    d.slot = 'detail';
    md.append(d);
    await settle();
    expect(md.matches(':state(detail)')).toBe(true);
    d.remove();
    await settle();
    expect(md.matches(':state(detail)')).toBe(false);
  });

  for (const [name, width, withDetail] of [
    ['wide, master only', 1000, false],
    ['narrow overlay, detail open', 500, true],
    ['narrow overlay, master only', 500, false],
  ] as const) {
    it(`🔴print (${name}): the margin collapses out — neither the layout nor the pane grows by it`, async () => {
      await mount(width, withDetail);
      await setMedia('print');
      const pane = md.shadowRoot!.querySelector(withDetail ? '.detail' : '.master')!;
      expect({ pane: hh(pane), layout: hh(md), wrapper: hh(wrapper) })
        .toEqual({ pane: CONTENT, layout: CONTENT, wrapper: CONTENT });
    });
  }

  it('print (wide, side by side): the columns stay side by side and each keeps its margin — a flex item always contains it', async () => {
    await mount(1000, true);
    await setMedia('print');
    expect(getComputedStyle(md).display).toBe('flex');
    expect(hh(md)).toBe(CONTENT + 24);
  });

  it('screen is unchanged: the layout stays a flex shell with scrolling panes', async () => {
    await mount(500, true);
    expect(getComputedStyle(md).display).toBe('flex');
    expect(getComputedStyle(md.shadowRoot!.querySelector('.detail')!).overflow).toBe('auto');
  });
});
