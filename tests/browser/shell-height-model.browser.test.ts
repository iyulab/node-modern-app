import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cdp } from 'vitest/browser';
import { app } from '../../src/App.js';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import '../../src/components/MasterDetailLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';
import type { MasterDetailLayout } from '../../src/components/MasterDetailLayout.js';

/**
 * **셸의 높이는 «부모» 가 정한다**(cycle-564).
 *
 * 두 셸 모두 `:host { height: 100% }` 다 — 화면을 채우는 것이 역할이라 자기 높이를 갖지 않는다
 * (`MasterDetailLayout.styles.ts` 가 그 전제를 주석으로 적어 두고 있다).
 *
 * ## 왜 이 파일이 생겼는가
 *
 * `app.load()` 는 **기본 root(`document.body`)일 때만** body 에 `100vh` 를 세팅한다
 * (`App.ts` `createLayout`). **커스텀 `config.root` 는 아무 스타일도 받지 않으므로**, 높이가 없는
 * 컨테이너를 넘기면 `height: 100%` 가 걸릴 곳이 없어 셸이 **뷰포트가 아닌 임의 높이**로 앉는다
 * (탐침 실측: 사이드바 셸 **133px** · 부모에 400px 를 주면 400px). 오류도 콘솔 경고도 없다.
 *
 * ⚠**`app.load()` 의 body 스타일링 자체는 이 파일이 고정하지 않는다** — 소스 판독으로 확인한
 * 사실이고, 여기서 재는 것은 **요소 수준의 계약**(부모가 높이를 주면 채운다 / 안 주면 못 채운다)뿐이다.
 *
 * ## 왜 브라우저인가
 *
 * `height: 100%` 가 무효가 되는지는 **계산된 레이아웃**으로만 갈린다. jsdom 은 박스를 계산하지
 * 않으므로 원리적으로 답을 줄 수 없다.
 */

const PARENT = 400;

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  host.style.width = '900px';
  document.body.appendChild(host);
});
afterEach(() => {
  host.remove();
  document.body.replaceChildren();
});

const settle = async () => {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 80));
};

/** `parentHeight` 를 주지 않으면 «높이 없는 컨테이너» — 커스텀 root 를 그렇게 넘긴 경우다. */
async function mountSidebar(parentHeight?: string, innerStyle?: string): Promise<SidebarLayout> {
  if (parentHeight) host.style.height = parentHeight;
  let parent: HTMLElement = host;
  if (innerStyle) {
    parent = document.createElement('div');
    parent.setAttribute('style', innerStyle);
    host.appendChild(parent);
  }
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' } as SidebarLayoutConfig;
  parent.appendChild(el);
  await el.updateComplete;
  await settle();
  return el;
}

async function mountMasterDetail(parentHeight?: string): Promise<MasterDetailLayout> {
  if (parentHeight) host.style.height = parentHeight;
  const el = document.createElement('u-master-detail-layout') as MasterDetailLayout;
  el.innerHTML = '<div style="height:600px">master</div><div slot="detail">detail</div>';
  host.appendChild(el);
  await el.updateComplete;
  await settle();
  return el;
}

const h = (el: HTMLElement) => Math.round(el.getBoundingClientRect().height);

describe('modern-app 셸 — 높이는 부모가 정한다', () => {
  it('🔴부모가 높이를 주면 사이드바 셸이 그 높이를 채운다', async () => {
    const el = await mountSidebar(`${PARENT}px`);
    expect(h(el)).toBe(PARENT);
    const main = el.shadowRoot!.querySelector<HTMLElement>('[part="main"]')!;
    expect(h(main), '라우트 콘텐츠 영역도 같은 높이를 갖는다').toBe(PARENT);
  });

  it('🔴부모에 높이가 없으면 채우지 못한다 — 계약이라 고정한다(커스텀 root 에는 높이를 줄 것)', async () => {
    const el = await mountSidebar();
    // 같은 셸·같은 설정인데 부모에 높이가 없다 ⇒ height:100% 가 걸릴 곳이 없다.
    // 정확한 px 는 셸 자신의 크롬이 정하므로 고정하지 않고(판이 바뀌면 달라진다),
    // «부모가 줬을 때와 다르다» 를 고정한다.
    expect(h(el), '높이 없는 부모에서 부모-높이와 같아지면 이 계약이 깨진 것이다').not.toBe(PARENT);
    expect(h(el), '뷰포트를 채우지도 않는다').toBeLessThan(window.innerHeight);
  });

  it('height:100% 사슬도 성립한다 — 중간 컨테이너가 높이를 잇는다', async () => {
    const el = await mountSidebar(`${PARENT}px`, 'height:100%');
    expect(h(el)).toBe(PARENT);
  });

  it('master-detail 셸도 부모 높이를 채운다', async () => {
    const el = await mountMasterDetail(`${PARENT}px`);
    expect(h(el)).toBe(PARENT);
    const master = el.shadowRoot!.querySelector<HTMLElement>('[part="master"]')!;
    expect(h(master)).toBe(PARENT);
  });

  it('NEGATIVE master-detail 은 높이 없는 부모에서 «내용 높이» 로 떨어진다 — 그것은 정당한 상태다', async () => {
    // 사이드바와 달리 이쪽은 overflow:hidden 이 아니라, 제약이 없으면 내용이 그대로 보인다.
    const el = await mountMasterDetail();
    expect(h(el), '내용(600px)을 담을 만큼 커진다').toBeGreaterThanOrEqual(600);
  });

  /**
   * HD-61 ⒝ — «크롬 높이로 앉은 셸» 을 개발 모드에서 한 번 알린다. 위 계약은 그대로다.
   */
  it('🔴부모에 높이가 없으면 개발 모드 경고를 정확히 한 번 낸다', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      await mountSidebar();
      await settle();
      const ours = warn.mock.calls.filter((c) => String(c[0]).startsWith('[@iyulab/modern-app] u-sidebar-layout'));
      expect(ours).toHaveLength(1);
      expect(String(ours[0][0])).toContain('height: 100vh');
    } finally {
      warn.mockRestore();
    }
  });

  it('NEGATIVE: 부모가 높이를 주면 침묵한다', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      await mountSidebar(`${PARENT}px`);
      await settle();
      expect(warn.mock.calls.filter((c) => String(c[0]).startsWith('[@iyulab/modern-app] u-sidebar-layout'))).toHaveLength(0);
    } finally {
      warn.mockRestore();
    }
  });
});


/**
 * **높이 사슬은 `<u-outlet>` 을 «지나야» 한다** (cycle-628, router `#302` 의 회귀).
 *
 * 실제 앱에서 라우트 화면은 셸의 본문에 직접 들어가지 않는다 — `App.load()` 가 그 사이에
 * `<u-outlet>` 을 끼운다. 그래서 «화면을 채우는» 레이아웃(`u-master-detail-layout` 의
 * `:host{height:100%}`)의 백분율은 **아웃렛이 무엇인가에 따라 다른 상자에 대해 풀린다**.
 *
 * 🔴이것이 실제 회귀를 냈다. router 가 아웃렛에 `display: block` 만 선언하자(그 자체는 옳은
 * 수정이다 — 커스텀 엘리먼트의 UA 기본값 `inline` 은 컨테이너에 대한 의도가 아니다) 백분율의
 * 기준이 «셸 본문» 에서 «아웃렛 자신» 으로 옮겨갔고, 아웃렛의 높이가 `auto` 라 백분율이
 * 무효가 되면서 **화면이 내용 높이로 무너졌다**(실측 747px → 60px). `height: 100%` 를 함께
 * 선언해 사슬을 이었다.
 *
 * ⚠**이 파일의 다른 스위트는 이것을 볼 수 없다** — 셸에 내용을 직접 붙이기 때문이다.
 *   그것이 이 스위트가 따로 있는 이유다.
 */
describe('modern-app 셸 — 높이 사슬이 아웃렛을 지난다', () => {
  let outlet: HTMLElement;

  beforeEach(async () => {
    await app.load({
      layout: { type: 'sidebar', title: 'App', main: [{ type: 'link', label: 'H', href: '/' }] },
      routes: [{ path: '/__never__', render: () => document.createElement('div') }],
    } as any);
    await settle();
    outlet = document.querySelector('u-outlet') as HTMLElement;
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  const mainArea = () =>
    (document.querySelector('u-sidebar-layout') as SidebarLayout)
      .shadowRoot!.querySelector('[part="main"]') as HTMLElement;

  it('🔴`height:100%` 화면이 셸 본문을 채운다 — 내용 높이로 무너지지 않는다', async () => {
    const md = document.createElement('u-master-detail-layout') as MasterDetailLayout;
    md.innerHTML = '<div style="height:60px">master</div><div slot="detail">detail</div>';
    outlet.replaceChildren(md);
    await settle();

    const main = mainArea();
    // 본문의 «내용 상자» 높이 — padding 을 뺀 값이 아웃렛이 채울 수 있는 전부다.
    const available = main.clientHeight - (parseFloat(getComputedStyle(main).paddingTop) + parseFloat(getComputedStyle(main).paddingBottom));
    expect(available).toBeGreaterThan(200); // 픽스처 전제: 채울 공간이 실제로 있다
    // 내용은 60px 뿐이다 — 사슬이 끊기면 여기서 60 이 나온다.
    expect(h(md)).toBeGreaterThan(200);
    expect(Math.abs(h(md) - Math.round(available))).toBeLessThanOrEqual(2);
  });

  it('부모가 높이를 놓으면(인쇄 매체) 아웃렛도 놓는다 — 내용이 흐른다', async () => {
    const tall = document.createElement('div');
    tall.style.height = '2000px';
    outlet.replaceChildren(tall);
    await settle();

    await cdp().send('Emulation.setEmulatedMedia', { media: 'print' });
    await settle();
    try {
      // `height: 100%` 는 부모 높이가 auto 면 auto 로 풀린다 — 인쇄에서 셸이 높이를 놓으므로
      // 아웃렛이 2000px 를 가둬서는 안 된다.
      expect(outlet.scrollHeight).toBeLessThanOrEqual(outlet.clientHeight + 1);
      expect(h(outlet)).toBeGreaterThanOrEqual(2000);
    } finally {
      await cdp().send('Emulation.setEmulatedMedia', { media: '' });
    }
  });

  /**
   * 🔴**인쇄에서 화면 마지막 블록의 아래 여백은 셸 «밖» 으로 접혀야 한다** (cycle-660 · router `#302` 3차).
   *
   * 그 여백이 어느 상자 안에 갇히면 그 상자의 높이가 여백만큼 늘고, 내용 끝이 쪽 경계에서 그 여백 이내에
   * 있으면 **여백만 담긴 빈 꼬리 쪽**이 찍힌다(CSS Fragmentation §5.2 — 쪽 경계에 닿은 여백은 잘리지만
   * 상자 높이는 잘리지 않는다). router 0.15.0 의 아웃렛(grid)이 정확히 그렇게 가뒀고 0.15.1 이 인쇄에서
   * `block` 으로 풀었다. ⚠**그러나 가둘 수 있는 상자는 아웃렛만이 아니다** — 셸 본문·셸 호스트도
   * 인쇄에서 독립 서식 문맥(`overflow` ≠ visible · flex/grid · `flow-root`)이 되거나 아래 `padding` 을
   * 가지면 같은 증상이 **셸에서** 난다. 이 단언은 사슬 전체를 한 번에 잰다.
   *
   * ⚠우리 인쇄 픽스처들은 여섯 번 이 증상을 재현하지 못했다 — **끝 블록에 여백이 없었기 때문이다.**
   */
  it('🔴인쇄 매체에서 화면 마지막 블록의 아래 여백이 아웃렛·셸 본문·셸을 뚫고 접힌다', async () => {
    const CONTENT = 300;
    const route = document.createElement('div');
    const last = document.createElement('div');
    last.style.cssText = `height: ${CONTENT}px; margin-bottom: 24px;`;
    route.appendChild(last);
    outlet.replaceChildren(route);
    await settle();

    await cdp().send('Emulation.setEmulatedMedia', { media: 'print' });
    await settle();
    try {
      const shell = document.querySelector('u-sidebar-layout') as HTMLElement;
      // 여백이 갇히면 그 상자부터 위로 전부 324 가 된다 — 어느 상자가 가뒀는지가 곧 실패 메시지다.
      expect({
        outlet: h(outlet),
        main: h(mainArea()),
        shell: h(shell),
      }).toEqual({ outlet: CONTENT, main: CONTENT, shell: CONTENT });
    } finally {
      await cdp().send('Emulation.setEmulatedMedia', { media: '' });
    }
  });
});
