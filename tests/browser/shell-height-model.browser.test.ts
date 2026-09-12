import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
