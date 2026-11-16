import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/PageHeader.js';

/**
 * 「`u-page-header` 의 «뒤로» 가 줄 높이가 다른 머리 뒤에서도 24px 이상인가」 — WCAG 2.2 SC 2.5.8.
 *
 * 🔴**WebKit 은 같은 시트를 나눈 요소들의 `1lh` 를 «처음 그린 요소의 줄 높이» 로 붙잡는다**(실제 Safari 27 에서 확인). «뒤로» 의 누를 면 패딩이 `1lh` 로 계산되면, **줄 높이가 큰 머리가 먼저 그려진 뒤의 좁은 머리** 는
 * 패딩 0 으로 남아 «뒤로» 가 줄 상자 높이(15.6px)로 줄어든다 — 24px 하한 미달. 반대 순서는 패딩이 남아 누를 면이 커질 뿐이라
 * 무해하다. 그래서 **큰 머리를 먼저** 그린다.
 *
 * ⚠이 파일은 **파일당 한 시나리오**다 — 붙잡힌 값이 문서(시험 파일의 프레임)에 남아 다음 시험의 «처음 그린 요소» 를 오염시키므로
 * 순서가 다른 두 시나리오를 한 파일에 두면 둘째가 첫째의 잔재를 읽는다. Chromium 은 이 결함이 없어 두 프로젝트(`browser` ·
 * `webkit`)에서 모두 돌리되, 빨강은 WebKit 에서만 나온다.
 */

const MIN = 24;

afterEach(() => {
  document.body.innerHTML = '';
});

async function settle(): Promise<void> {
  const hosts = Array.from(document.querySelectorAll('u-page-header')) as (HTMLElement & { updateComplete: Promise<unknown> })[];
  for (const h of hosts) await h.updateComplete;
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}

const back = (host: Element): HTMLElement => (host as HTMLElement).shadowRoot!.querySelector('a.back') as HTMLElement;

describe('u-page-header «뒤로» — 줄 높이가 큰 머리 뒤의 좁은 머리', () => {
  it('큰 머리가 먼저 그려져도 좁은 머리의 «뒤로» 는 24px 이상이다', async () => {
    document.body.innerHTML = `
      <div id="loose" style="line-height:2.6;font-size:18px"><u-page-header title="Loose" back="#a"></u-page-header></div>
      <div id="tight" style="line-height:1.2;font-size:14px"><u-page-header title="Tight" back="#b"></u-page-header></div>
      <div id="tight2" style="line-height:1;font-size:14px"><u-page-header title="Tighter" back="#c"></u-page-header></div>`;
    await settle();

    const rows = ['loose', 'tight', 'tight2'].map((id) => {
      const r = back(document.querySelector(`#${id} u-page-header`)!).getBoundingClientRect();
      return { id, h: Math.round(r.height * 10) / 10 };
    });
    const under = rows.filter((r) => r.h < MIN - 0.5);
    expect(under, `24px 미달 «뒤로»: ${JSON.stringify(rows)}`).toEqual([]);
  });

  // 🔴**이 단언이 두 엔진 모두에서 결함을 잡는 «구조 시험» 이다** — headless WebKit(Playwright 판)은 위 결함을 재현하지 못한다(실제 Safari
  //   27 에서만 붙잡힌다: 이 파일 머리말). 그래서 «24px 하한이 줄 높이(`lh`)에서 계산되지 않고 **선언된 최소 높이**로 선다» 를
  //   직접 단언한다 — 줄 높이에서 파생된 패딩은 붙잡힌 `1lh` 를 읽을 수 있고, 선언된 최소는 읽을 것이 없다.
  it('24px 하한은 줄 높이에서 계산되지 않고 선언된 최소 높이다 — `lh` 캐시에 기대지 않는다', async () => {
    document.body.innerHTML = '<u-page-header title="Orders" back="#list"></u-page-header>';
    await settle();
    const cs = getComputedStyle(back(document.querySelector('u-page-header')!));
    expect(parseFloat(cs.minBlockSize), `min-block-size=${cs.minBlockSize}`).toBeGreaterThanOrEqual(MIN);
    expect(parseFloat(cs.paddingBlockStart), `padding-block-start=${cs.paddingBlockStart}`).toBe(0);
  });

  it('호스트 하한 --u-target-size 가 24px 보다 크면 최소 높이도 그 값이다', async () => {
    document.body.innerHTML = '<div style="--u-target-size:44px"><u-page-header title="Orders" back="#list"></u-page-header></div>';
    await settle();
    const cs = getComputedStyle(back(document.querySelector('u-page-header')!));
    expect(parseFloat(cs.minBlockSize)).toBeGreaterThanOrEqual(44);
    expect(back(document.querySelector('u-page-header')!).getBoundingClientRect().width).toBeGreaterThanOrEqual(44);
  });

  it('누를 면을 키우는 일이 배치를 움직이지 않는다 — 좁은 머리의 줄 상자 높이는 그대로다', async () => {
    document.body.innerHTML = `
      <div id="tight" style="line-height:1.2;font-size:14px"><u-page-header title="Tight" back="#b"></u-page-header></div>`;
    await settle();
    const host = document.querySelector('u-page-header')!;
    const base = host.shadowRoot!.querySelector('.base') as HTMLElement;
    const heading = host.shadowRoot!.querySelector('.heading') as HTMLElement;
    // 머리의 높이는 제목 줄이 정한다 — «뒤로» 의 최소 높이(24px)가 제목 줄(26px × 1.4)을 넘지 않으므로 헤딩과 같다.
    expect(Math.round(base.getBoundingClientRect().height)).toBe(Math.round(heading.getBoundingClientRect().height));
  });
});
