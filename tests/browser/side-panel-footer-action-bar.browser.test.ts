import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/SidePanel.js';
import '../../src/components/ActionBar.js';
import '@iyulab/components/dist/components/button/UButton.js';

/**
 * 사이드 패널 바닥(`footer` 슬롯)에 둔 `u-action-bar` 가 패널 폭을 쓰는가.
 *
 * 드로어는 `footer` 슬롯 요소에 `display: flex; justify-content: flex-end` 를 준다(꽂힌 단추 묶음을 오른쪽에 모으려고).
 * 슬롯된 요소에는 바깥 ::slotted 규칙이 자기 :host 규칙을 이기므로 `u-action-bar` 의 호스트가 flex 가 되고, 호스트 안의 `.base`
 * 는 flex 항목이라 **내용 폭으로 줄어 끝에 붙는다** — `summary` 가 «빈 폭을 채운다» 는 계약이 깨지고 단추 위로 줄바꿈된다.
 * 동작 줄은 어떤 컨테이너 안에서도(호스트가 block 이든 flex 항목이든) 자기 자리의 폭을 채운다.
 *
 * ⚠패널 폭은 34rem 으로 준다 — 기본(28rem)은 푸터가 381px 라 동작 줄의 «자기 폭 420px 미만이면 무리마다 한 줄» 규칙이 걸려
 * summary 가 단추 위에 서는 것이 **의도된** 모양이다(좁은 모드). 넓은 모드의 한 줄 배치를 재려면 폭이 420px 을 넘어야 한다.
 */
afterEach(() => document.body.replaceChildren());

async function mount(footer: string) {
  document.body.innerHTML = `
    <u-side-panel style="--drawer-size: 34rem">
      <span slot="header">Edit</span>
      <p>form</p>
      ${footer}
    </u-side-panel>`;
  const panel = document.querySelector('u-side-panel') as HTMLElement & { show(): void; updateComplete: Promise<unknown> };
  panel.show();
  await panel.updateComplete;
  const bar = document.querySelector('u-action-bar') as HTMLElement & { updateComplete: Promise<unknown> };
  await bar.updateComplete;
  await new Promise((r) => setTimeout(r, 400)); // 열림 전환
  return bar;
}

const base = (bar: HTMLElement) => bar.shadowRoot!.querySelector('.base') as HTMLElement;

describe('u-side-panel footer 의 u-action-bar', () => {
  it('동작 줄(.base)이 호스트의 폭을 채운다 — 내용 폭으로 줄어 끝에 붙지 않는다', async () => {
    const bar = await mount('<u-action-bar slot="footer"><span slot="summary">1 change</span><u-button>Save</u-button></u-action-bar>');
    const host = bar.getBoundingClientRect().width;
    const b = base(bar).getBoundingClientRect().width;
    expect(Math.abs(host - b), `호스트 ${host}px · base ${b}px`).toBeLessThanOrEqual(1);
  });

  // 시험 창이 휴대폰 폭(414px)이라 패널의 푸터는 381px 이다 — 동작 줄의 좁은 모드(자기 폭 420px 미만이면 무리마다 한 줄)가
  // 걸린다. 넓은 모드의 «한 줄» 은 드로어가 하는 일(호스트를 flex 로 만든다)을 문서 규칙으로 똑같이 걸어 폭 600px 에서 잰다.
  async function mountForcedFlex(bar: string) {
    document.body.innerHTML = `<div style="width:600px">${bar}</div>`;
    const el = document.querySelector('u-action-bar') as HTMLElement & { updateComplete: Promise<unknown> };
    el.style.display = 'flex';
    el.style.justifyContent = 'flex-end';
    await el.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    return el;
  }

  it('summary 가 단추와 같은 줄에 선다(줄바꿈으로 단추 위로 쌓이지 않는다) — 호스트가 flex 여도', async () => {
    const bar = await mountForcedFlex('<u-action-bar><span slot="summary">1 change</span><u-button>Save</u-button></u-action-bar>');
    const summary = bar.querySelector('[slot="summary"]') as HTMLElement;
    const button = bar.querySelector('u-button') as HTMLElement;
    const s = summary.getBoundingClientRect();
    const u = button.getBoundingClientRect();
    expect(Math.abs((s.top + s.bottom) / 2 - (u.top + u.bottom) / 2), `summary 가운데 ${(s.top + s.bottom) / 2} · 단추 가운데 ${(u.top + u.bottom) / 2}`).toBeLessThanOrEqual(12);
  });

  it('NEGATIVE — 단추만 넣은 줄도 폭을 채우고 단추는 오른쪽 끝에 선다', async () => {
    const bar = await mountForcedFlex('<u-action-bar><u-button>Save</u-button></u-action-bar>');
    const host = bar.getBoundingClientRect();
    const btn = (bar.querySelector('u-button') as HTMLElement).getBoundingClientRect();
    expect(Math.abs(base(bar).getBoundingClientRect().width - host.width)).toBeLessThanOrEqual(1);
    expect(host.right - btn.right, `단추 오른쪽 끝과 호스트의 간격 ${host.right - btn.right}px`).toBeLessThanOrEqual(2);
  });
});
