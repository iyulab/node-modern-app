import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html } from 'lit';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/components/dist/components/popover/UPopover.js';
import type { UPopover } from '@iyulab/components/dist/components/popover/UPopover.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * "u-popover 기반 사이드바 팝업 스타일 서브메뉴"가 두 가지 다른 이유로 동작하지 않는 것을
 * 실측으로 재현한다. 상세는
 * claudedocs/issues/ISSUE-modern-app-20260822-sidebar-popover-submenu-anchoring-broken.md.
 *
 * ⚠**처음 세운 가설(모바일의 `.sidebar` `transform` + `.sidebar-main` `overflow-x:hidden`
 * 조합이 `strategy="fixed"`의 containing block 을 가둔다)은 실측으로 반증됐다.** 실제 414px
 * 뷰포트에서 재보니 `strategy` 는 결과에 영향이 없었고(absolute·fixed 동일), 대신
 * **`placement="right-start"`(옆으로 펼치는 배치) 가 모바일에서 `hitIsContent:false`,
 * `placement="bottom-start"` 는 뷰포트·상태·strategy 조합 8개 전부 `hitIsContent:true`**
 * 였다 — 진짜 원인은 CSS containing block 이 아니라 **모바일에서 사이드바 버튼 자신이
 * 화면 폭 대부분을 차지해 옆으로 펼 자리가 없고, `flip()` 도 반대쪽(왼쪽)에 room 이 없어
 * 넘기지 않는다**(floating-ui 관점에서 올바른 동작). 이 파일은 그 실측 그대로를 고정한다.
 */

let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement('div');
  // `app.load()`가 document.body 에 마운트할 때 실제로 세팅하는 값과 동일하게 맞춘다
  // (`src-app/shell/AppShell.tsx`의 코멘트가 그 이유를 설명한다) — `.sidebar[state=
  // "mobile-open"]`가 실제 앱과 같은 실제 뷰포트 크기로 렌더돼야 재현이 유효하다.
  host.style.cssText = 'width:100vw;height:100vh;position:relative;';
  document.body.appendChild(host);
});
afterEach(() => host.remove());

async function mountLayout(config: SidebarLayoutConfig): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = config;
  host.appendChild(el);
  await el.updateComplete;
  return el;
}

async function settle() {
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
}

describe('원인 A — 라이트 DOM의 외부 u-popover 는 섀도 루트 안의 id 앵커를 찾지 못한다', () => {
  it('🔴 CHANGELOG 가 약속한 "공개 API 만으로 앵커링"이 성립하지 않는다', async () => {
    const layout = await mountLayout({
      type: 'sidebar',
      main: [{ type: 'button', id: 'ext-trigger', label: 'Settings' }],
    });

    // 문서화된 레시피 그대로: 앱의 라이트 DOM에 popover 를 형제로 둔다(섀도 루트 밖).
    const popover = document.createElement('u-popover') as UPopover;
    popover.setAttribute('for', '#ext-trigger');
    host.appendChild(popover);
    await popover.updateComplete;

    // 버튼 자체는 정상 렌더된다 — 섀도 루트 안에서는 찾아진다.
    expect(layout.shadowRoot!.getElementById('ext-trigger'), '버튼은 섀도 루트 안에 실재한다').not.toBeNull();
    // document 스코프에서는 찾을 수 없다 — querySelector 계열은 섀도 경계를 관통하지 않는다.
    expect(document.getElementById('ext-trigger'), 'document.getElementById 는 섀도 루트를 관통하지 않는다').toBeNull();
    // popover 의 실제 앵커 탐색(querySelectorAllWithin)도 같은 이유로 빈 배열이다.
    expect((popover as unknown as { anchors?: HTMLElement[] }).anchors ?? [], 'popover 가 실제로 바인딩한 앵커 수').toHaveLength(0);

    // ⇒ 클릭해도 아무 일도 일어나지 않는다(리스너가 애초에 안 걸렸으므로).
    const button = layout.shadowRoot!.getElementById('ext-trigger') as HTMLElement;
    button.click();
    await settle();
    expect(popover.open, '앵커를 못 찾아 클릭 리스너가 안 걸려 있다 — popover 가 열리지 않는다').toBe(false);
  });
});

describe('원인 B — 섀도 루트 안(type:"html")으로 우회해도, 옆으로 펼치는 배치는 모바일에서 화면 밖으로 밀린다', () => {
  const MOBILE_VIEWPORT_WIDTH = 414; // 이 테스트 러너(vitest browser·playwright chromium)의 실제 기본 뷰포트 폭. 실측으로 확인.

  function popupItem(placement: 'right-start' | 'bottom-start') {
    return {
      type: 'html' as const,
      render: () => html`
        <u-sidebar-button id="probe-trigger" label="More"></u-sidebar-button>
        <u-popover for="#probe-trigger" placement="${placement}">
          <div id="probe-content" style="width:120px;height:32px;background:red;">Submenu</div>
        </u-popover>
      `,
    };
  }

  async function openAndHitTest(state: 'default' | 'mobile-open', placement: 'right-start' | 'bottom-start') {
    const layout = await mountLayout({ type: 'sidebar', main: [popupItem(placement)] });
    layout.state = state;
    await layout.updateComplete;

    const button = layout.shadowRoot!.getElementById('probe-trigger') as HTMLElement;
    const popover = layout.shadowRoot!.querySelector('u-popover') as UPopover;
    await popover.show(button);
    await settle();
    await settle();

    const content = layout.shadowRoot!.getElementById('probe-content')!;
    const rect = content.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const hit = layout.shadowRoot!.elementFromPoint(cx, cy);
    layout.remove();
    return { visible: !!hit?.closest('#probe-content'), rect };
  }

  it(`전제 확인 — 이 러너의 뷰포트는 실제로 ${MOBILE_VIEWPORT_WIDTH}px 폭이다(모바일 폭)`, () => {
    expect(window.innerWidth).toBe(MOBILE_VIEWPORT_WIDTH);
  });

  it('데스크톱(default)에서는 옆으로 펼치는 배치("right-start")가 정상 보인다', async () => {
    const { visible } = await openAndHitTest('default', 'right-start');
    expect(visible).toBe(true);
  });

  it('🔴 모바일(mobile-open)에서는 같은 "right-start" 배치가 뷰포트 밖으로 밀려 보이지 않는다', async () => {
    const { visible, rect } = await openAndHitTest('mobile-open', 'right-start');
    // 사이드바 버튼 자신이 모바일에서는 화면 폭 대부분을 차지해 오른쪽에 펼 자리가 없고,
    // flip() 도 반대쪽(왼쪽)에 room 이 없어 넘기지 않는다 — 뷰포트 경계를 실제로 넘는다.
    expect(rect.right, '팝업 오른쪽 끝이 실제 뷰포트 폭을 넘는다').toBeGreaterThan(window.innerWidth);
    expect(visible, '그 결과 클릭해도 화면에 보이지 않는다').toBe(false);
  });

  it('아래로 펼치는 배치("bottom-start")로 바꾸면 모바일에서도 정상 보인다', async () => {
    const { visible } = await openAndHitTest('mobile-open', 'bottom-start');
    expect(visible, '세로 방향은 room 이 충분해 모든 상태에서 정상 동작한다').toBe(true);
  });
});
