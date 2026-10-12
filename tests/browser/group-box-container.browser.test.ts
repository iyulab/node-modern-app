import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/GroupBox.js';

/**
 * `u-group-box` 의 좁은 폭 질의 컨테이너는 **섀도 안의 상자**다 — 호스트가 아니다.
 *
 * 호스트가 `container-type: inline-size` 였을 때, 형제 `fieldset disabled` 전환과 같은 커밋에서 내용이 바뀐 카드가
 * 높이 2px(테두리뿐)로 접힌 채 남는 Chromium 실측 보고가 있었다 — 강제 재배치로만 돌아왔고 호스트의 컨테이너를 걷으면
 * 생기지 않았다(이 시험 환경에서는 재현되지 않아, 그 재료인 «호스트 containment» 가 없다는 사실을 잰다).
 * 옮긴 뒤에도 질의 결과는 같아야 한다 — 카드 자신의 헤더 접힘, 그리고 슬롯 내용의 이름 없는 `@container` 질의.
 */
afterEach(() => document.body.replaceChildren());

async function mount(width: number): Promise<HTMLElement> {
  const box = document.body.appendChild(document.createElement('div'));
  box.style.width = `${width}px`;
  const gb = document.createElement('u-group-box');
  gb.setAttribute('title', 'Status');
  gb.innerHTML = '<button slot="actions">Act</button><div class="grid"><span>a</span><span>b</span></div>';
  box.appendChild(gb);
  await (gb as unknown as { updateComplete: Promise<unknown> }).updateComplete;
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  return gb;
}

describe('u-group-box container', () => {
  it('호스트는 컨테이너가 아니다 — 평범한 블록으로 바깥 배치에 참여한다', async () => {
    const gb = await mount(600);
    expect(getComputedStyle(gb).containerType).toBe('normal');
    expect(getComputedStyle(gb.shadowRoot!.querySelector('.frame')!).containerType).toBe('inline-size');
  });

  it('카드 자신의 좁은 폭 규칙 — 480px 이하에서 액션이 제목 아래로 내려가 폭을 채운다', async () => {
    const narrow = await mount(400);
    const n = narrow.shadowRoot!;
    expect(getComputedStyle(n.querySelector('.header')!).flexWrap).toBe('wrap');
    const header = n.querySelector('.header')!.getBoundingClientRect();
    const actions = n.querySelector('.actions')!.getBoundingClientRect();
    expect(actions.top).toBeGreaterThan(n.querySelector('.titles')!.getBoundingClientRect().top);
    expect(Math.round(actions.width)).toBeGreaterThan(Math.round(header.width) - 60);
    document.body.replaceChildren();

    const wide = await mount(600);
    expect(getComputedStyle(wide.shadowRoot!.querySelector('.header')!).flexWrap).toBe('nowrap');
  });

  it('슬롯 내용의 이름 없는 @container 질의는 카드 폭을 기준으로 한다(하우스 격자 등)', async () => {
    const style = document.head.appendChild(document.createElement('style'));
    style.textContent = '.grid { display: grid; grid-template-columns: 1fr 1fr; } @container (max-width: 480px) { .grid { grid-template-columns: 1fr; } }';
    try {
      // 바깥 문서는 넓다 — 카드가 좁을 때만 한 열이 된다.
      const narrow = await mount(400);
      expect(getComputedStyle(narrow.querySelector('.grid')!).gridTemplateColumns.split(' ')).toHaveLength(1);
      document.body.replaceChildren();
      const wide = await mount(700);
      expect(getComputedStyle(wide.querySelector('.grid')!).gridTemplateColumns.split(' ')).toHaveLength(2);
    } finally {
      style.remove();
    }
  });
});
