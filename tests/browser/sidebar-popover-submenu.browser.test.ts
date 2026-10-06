import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { html } from 'lit';
import '@iyulab/components/styles/tokens.css';
import '@iyulab/components/dist/components/popover/UPopover.js';
import type { UPopover } from '@iyulab/components/dist/components/popover/UPopover.js';
import '../../src/layouts/SidebarLayout.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';
import type { SidebarLayoutConfig } from '../../src/layouts/SidebarLayout.types';

/**
 * "u-popover 기반 사이드바 팝업 스타일 서브메뉴"가 두 가지 다른 이유로 동작하지 않는 것을
 * 실측으로 재현한다.
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

describe("type: 'menu' — 셸이 그리는 팝업 메뉴 항목(종전 `SidebarButtonConfig.id` 의 외부 앵커링을 대신한다)", () => {
  function menuConfig(onA: () => void, onB: () => void): SidebarLayoutConfig {
    return {
      type: 'sidebar',
      main: [{ type: 'menu', icon: 'three-dots', label: 'More', items: [
        { label: 'Action A', onClick: onA },
        { label: 'Disabled', disabled: true, onClick: () => { throw new Error('disabled entry ran'); } },
        { label: 'Action B', onClick: onB },
      ] }],
    };
  }
  const parts = (layout: SidebarLayout) => {
    const trigger = layout.shadowRoot!.querySelector('u-sidebar-button')!;
    return {
      trigger,
      button: trigger.shadowRoot!.querySelector('button')!,
      popover: layout.shadowRoot!.querySelector('u-popover') as UPopover,
      items: [...layout.shadowRoot!.querySelectorAll('u-menu-item')] as HTMLElement[],
    };
  };
  const focused = () => {
    let a = document.activeElement as Element | null;
    while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
    return a;
  };

  it('트리거는 aria-haspopup="menu" · aria-expanded 를 갖고, 클릭으로 열리면 포커스가 메뉴 안으로 간다', async () => {
    const layout = await mountLayout(menuConfig(() => {}, () => {}));
    const { button, popover, items } = parts(layout);
    expect(button.getAttribute('aria-haspopup')).toBe('menu');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(items).toHaveLength(3);
    button.click();
    await settle(); await settle();
    expect(popover.open).toBe(true);
    await layout.updateComplete;
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(items[0].contains(focused()) || focused() === items[0], '열리면 첫 항목에 포커스').toBe(true);
  });

  it('키보드: Enter 로 열고 항목에서 Enter → 그 동작을 부르고, 닫히며 포커스가 트리거로 돌아온다', async () => {
    const ran: string[] = [];
    const layout = await mountLayout(menuConfig(() => ran.push('A'), () => ran.push('B')));
    const { trigger, button, popover } = parts(layout);
    (trigger as unknown as { focus(): void }).focus();
    expect(focused()).toBe(button);
    await userEvent.keyboard('{Enter}');
    await settle(); await settle();
    expect(popover.open).toBe(true);
    await userEvent.keyboard('{Enter}');
    await settle(); await settle();
    expect(ran).toEqual(['A']);
    expect(popover.open).toBe(false);
    expect(focused(), '닫힌 뒤 포커스는 트리거의 버튼').toBe(button);
    await layout.updateComplete;
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('Escape 로 닫으면 포커스가 트리거로 돌아오고 아무 동작도 부르지 않는다', async () => {
    const ran: string[] = [];
    const layout = await mountLayout(menuConfig(() => ran.push('A'), () => ran.push('B')));
    const { button, popover } = parts(layout);
    button.click();
    await settle(); await settle();
    expect(popover.open).toBe(true);
    await userEvent.keyboard('{Escape}');
    await settle(); await settle();
    expect(popover.open).toBe(false);
    expect(focused()).toBe(button);
    expect(ran).toEqual([]);
  });

  it('비활성 항목을 눌러도 동작하지 않는다', async () => {
    const layout = await mountLayout(menuConfig(() => {}, () => {}));
    const { button, popover, items } = parts(layout);
    button.click();
    await settle(); await settle();
    items[1].click();
    await settle();
    expect(popover.open, '비활성 항목은 메뉴를 닫지도 않는다').toBe(true);
  });

  it('화면 아래쪽 트리거(footer)에서도 메뉴는 사이드바 «옆» 에 머문다 — 위로 뒤집혀 사이드바를 덮지 않는다', async () => {
    // flip 은 같은 변의 반대 정렬(`right-end`)을 먼저 본다 — 아래로 넘치면 옆에 둔 채 트리거 아래 끝에 맞춘다.
    // ⚠house-style 실기에서 «위로 뒤집힘» 을 봤는데 그것은 트리거가 사이드바 스크롤 밖에 있던 측정이었다(앵커가 안
    //   보이면 옆 두 정렬이 다 넘친다). 이 시험은 «보이는 트리거» 의 동작을 고정한다.
    const layout = await mountLayout({
      type: 'sidebar',
      main: [{ type: 'link', label: 'Home', href: '/' }],
      // 항목 여덟 — 트리거 «아래로» 는 자리가 없어야 이 시험이 그 경우를 잰다(아래 전제 단언).
      footer: [{ type: 'menu', label: 'Account', items: Array.from({ length: 8 }, (_, i) => ({ label: `Entry ${i + 1}` })) }],
    });
    const { trigger, button, popover, items } = parts(layout);
    button.click();
    await settle(); await settle();
    const t = trigger.getBoundingClientRect();
    const first = items[0].getBoundingClientRect();
    const last = items[7].getBoundingClientRect();
    expect(t.top + 8 * first.height, '전제: 트리거 위치에서 아래로 펼치면 화면을 넘는다').toBeGreaterThan(window.innerHeight);
    expect(first.left, '메뉴는 트리거 오른쪽에서 시작한다').toBeGreaterThanOrEqual(t.right - 1);
    expect(last.bottom, '화면 아래로 넘치지 않는다').toBeLessThanOrEqual(window.innerHeight);
    expect(popover.open).toBe(true);
  });

  it('모바일 패널(mobile-open)에서는 아래로 열려 화면 안에 보인다', async () => {
    const layout = await mountLayout(menuConfig(() => {}, () => {}));
    layout.state = 'mobile-open';
    await layout.updateComplete;
    const { button, popover, items } = parts(layout);
    expect(popover.getAttribute('placement')).toBe('bottom-start');
    button.click();
    await settle(); await settle();
    const r = items[2].getBoundingClientRect();
    expect(r.right).toBeLessThanOrEqual(window.innerWidth);
    const hit = layout.shadowRoot!.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    expect(hit?.closest('u-menu-item'), '그 자리를 누르면 그 항목이다').toBe(items[2]);
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

  it('✅ 모바일(mobile-open)에서도 같은 "right-start" 배치가 화면 안에 머문다 — 축을 넘는 flip 이후', async () => {
    const { visible, rect } = await openAndHitTest('mobile-open', 'right-start');
    // 🔴이 단언은 «반대» 였다 — 종전에는 «뷰포트를 넘어 보이지 않는다» 를 고정하고 있었다.
    //
    // 그때의 분석은 정확했다: 모바일에서 사이드바 버튼이 화면 폭 대부분을 차지해 오른쪽에
    // 펼 자리가 없고, `flip()` 이 **같은 축의 반대쪽(왼쪽)** 만 후보로 봤는데 거기도 room 이
    // 없어 넘기지 않았다. 결론은 *"컴포넌트 결함이 아니라 배치 선택의 문제"* 였다.
    //
    // ⚠**업스트림이 그 전제를 바꿨다** — `@iyulab/components` 의
    // `fix: let flip fall back across the axis when neither side has room` 이후,
    // 양쪽 다 room 이 없으면 flip 이 **축을 넘어**(가로 → 세로) 대안을 찾는다. 그래서
    // `right-start` 도 모바일에서 화면 안에 머문다.
    //
    // ⇒ 결함을 고정하던 테스트를 **해소를 고정하는 테스트로 회수**한다(CLAUDE.md §3 —
    //   회수 트리거는 «업스트림 릴리스 + 소비앱 업그레이드» 이고 둘 다 충족됐다).
    expect(rect.right, '팝업 오른쪽 끝이 뷰포트 안에 있다').toBeLessThanOrEqual(window.innerWidth);
    expect(visible, '그래서 클릭 지점이 실제로 팝업 내용이다').toBe(true);
  });

  it('아래로 펼치는 배치("bottom-start")로 바꾸면 모바일에서도 정상 보인다', async () => {
    const { visible } = await openAndHitTest('mobile-open', 'bottom-start');
    expect(visible, '세로 방향은 room 이 충분해 모든 상태에서 정상 동작한다').toBe(true);
  });
});
