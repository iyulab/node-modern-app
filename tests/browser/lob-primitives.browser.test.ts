import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/PageHeader.js';
import '../../src/components/GroupBox.js';
import '../../src/components/InfoSection.js';
import '../../src/components/InfoField.js';
import '../../src/components/EmptyState.js';

/**
 * 프리미티브를 **실제로 렌더해** 검증한다.
 *
 * ★소스 대조(`tests/lob-primitives.test.ts`)와 이 파일은 **다른 것을 잡는다.** 전자는
 * 토큰이 적혀 있음을 보이고, 후자는 **그 마크업이 의도한 DOM 을 만드는지**를 본다.
 * 이 컴포넌트들에는 소스만 봐서는 절대 드러나지 않는 함정이 둘 있다:
 *
 * ⑴ **`render()` 안의 `this.querySelector()`** — 라이트 DOM 자식을 렌더 시점에 읽는다.
 *    자식이 아직 파싱되지 않았거나 나중에 붙으면 `null` 이고, 그 분기는 **조용히**
 *    다른 것을 그린다(제목이 통째로 사라지는 식). 소스에는 아무 이상이 없다.
 * ⑵ **`:not(:has(*))`** — `<slot>` 을 감싼 래퍼를 비었을 때 접으려는 규칙인데,
 *    `<slot>` 자신이 자식이므로 `:has(*)` 가 **항상 참일 수 있다.** 그러면 빈 배지 자리가
 *    남아 제목 위치가 화면마다 달라지는데, 그것이 바로 이 컴포넌트가 없애려던 문제다.
 *
 * jsdom/happy-dom 은 `:has()` 도 슬롯 배정도 실제로 계산하지 않으므로 브라우저에서만 성립한다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
});
afterEach(() => host.remove());

const settle = async () => {
  await new Promise(r => requestAnimationFrame(() => r(null)));
  await new Promise(r => setTimeout(r, 0));
};

const partOf = (el: Element, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`);

describe('u-info-field — 빈 값과 0 이 화면에서 갈린다', () => {
  it('🔴`0` 은 `0` 으로 렌더된다 (— 가 아니다)', async () => {
    host.innerHTML = `<u-info-field label="부수"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = 0;
    await settle();
    const value = partOf(el, 'value')!;
    expect(value.textContent!.trim()).toBe('0');
    expect(value.classList.contains('blank')).toBe(false);
  });

  it('값이 없으면 `—` 로 렌더된다', async () => {
    host.innerHTML = `<u-info-field label="비고"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const value = partOf(el, 'value')!;
    expect(value.textContent!.trim()).toBe('—');
    expect(value.classList.contains('blank')).toBe(true);
  });

  it('빈 문자열도 `—` 다 (0 과 다른 취급)', async () => {
    host.innerHTML = `<u-info-field label="비고"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = '';
    await settle();
    expect(partOf(el, 'value')!.textContent!.trim()).toBe('—');
  });

  it('슬롯 내용이 `value` 를 이긴다', async () => {
    host.innerHTML = `<u-info-field label="거래처">동서인쇄</u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = null;
    await settle();
    // 슬롯이 있으면 blank 분기로 가지 않는다 — 텍스트는 라이트 DOM 에 남아 있다.
    expect(partOf(el, 'value')!.classList.contains('blank')).toBe(false);
    expect(el.textContent!.trim()).toBe('동서인쇄');
  });

  /*
   * 🔴`numeric` 은 **고정폭 숫자만** 켠다 — 정렬은 바꾸지 않는다.
   * 종전에는 우정렬을 함께 켰고 이 시험이 그것을 계약으로 고정하고 있었다. 그런데 이 컴포넌트는
   * 표가 아니라 라벨-값 한 쌍이고 `u-info-section` 그리드의 한 칸을 혼자 차지한다 — 세로로 맞출
   * 이웃 숫자가 없으므로 우정렬은 값을 라벨에서 칸 반대편으로 밀어낼 뿐이었다(KPI 타일에서
   * 라벨은 좌상, 값은 우하). `format="currency"` 가 그 정렬을 함의해 한 타일 줄 안에서 정렬이
   * 갈리기까지 했다. 고정폭은 값이 바뀔 때 자릿수가 흔들리지 않게 하므로 그대로 둔다.
   */
  it.each([
    ['numeric', `<u-info-field label="금액" numeric></u-info-field>`],
    ['format="currency"', `<u-info-field label="금액" format="currency" currency="KRW"></u-info-field>`],
    ['format="number"', `<u-info-field label="금액" format="number"></u-info-field>`],
  ])('%s 는 고정폭 숫자를 내고 정렬은 라벨과 같은 시작 쪽이다', async (_name, markup) => {
    host.innerHTML = markup;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = 1234567;
    await settle();
    const cs = getComputedStyle(partOf(el, 'value')!);
    expect(cs.fontVariantNumeric).toContain('tabular-nums');
    expect(['start', 'left']).toContain(cs.textAlign);
  });

  it('KPI 타일(`size="lg"` + 숫자)에서 값은 라벨과 같은 왼쪽 선에서 시작한다', async () => {
    host.innerHTML = `
      <u-info-section min="160" style="width: 420px">
        <u-info-field label="미종결 작업지시" size="lg" numeric></u-info-field>
        <u-info-field label="매출" size="lg" format="currency" currency="KRW"></u-info-field>
      </u-info-section>`;
    const fields = Array.from(host.querySelectorAll('u-info-field')) as (HTMLElement & { value?: unknown })[];
    fields[0].value = 0;
    fields[1].value = 12450000;
    await settle();
    for (const el of fields) {
      const label = partOf(el, 'label')!.getBoundingClientRect();
      const valueText = partOf(el, 'value')!;
      const range = document.createRange();
      range.selectNodeContents(valueText);
      const text = range.getBoundingClientRect();
      // 글자 상자의 왼쪽이 라벨의 왼쪽과 같은 선이다 — 칸 폭의 반대편으로 밀려나지 않는다.
      expect(Math.abs(text.left - label.left)).toBeLessThan(2);
    }
  });
});

describe('u-group-box — 제목 단계는 개요를 아는 쪽이 정한다', () => {
  /*
   * 결함(docket `#412`): 제목이 `<h3>` 고정이라 `u-page-header`(h1) 바로 아래에 두면 h2 를
   * 건너뛰고, 형제 섹션(h2)보다 깊은 제목이 앞에 왔다. 박스는 자기 깊이를 알 수 없으므로
   * 조립하는 쪽이 `level` 로 준다. 시각 크기는 단계와 무관하다.
   */
  const heading = (el: Element) => el.shadowRoot!.querySelector('[part="title"]')!;

  it('기본은 h3 다(종전과 같다)', async () => {
    host.innerHTML = `<u-group-box title="상태 전이"></u-group-box>`;
    await settle();
    expect(heading(host.firstElementChild!).tagName).toBe('H3');
  });

  it('🔴level="2" 는 h2 로 렌더하고 시각 크기는 그대로다', async () => {
    host.innerHTML = `<u-group-box title="A"></u-group-box><u-group-box title="B" level="2"></u-group-box>`;
    await settle();
    const [a, b] = [...host.children].map(heading);
    expect(b.tagName).toBe('H2');
    expect(b.textContent!.trim()).toBe('B');
    expect(getComputedStyle(b).fontSize).toBe(getComputedStyle(a).fontSize);
    expect(getComputedStyle(b).marginTop).toBe('0px');
  });

  it('NEGATIVE: 범위 밖 값은 h3 로 돌아간다', async () => {
    host.innerHTML = `<u-group-box title="X" level="9"></u-group-box>`;
    await settle();
    expect(heading(host.firstElementChild!).tagName).toBe('H3');
  });
});

describe('u-group-box — 헤더 분기', () => {
  it('제목만 있어도 헤더가 나온다', async () => {
    host.innerHTML = `<u-group-box title="수금"></u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(partOf(el, 'header')).not.toBeNull();
    expect(partOf(el, 'title')!.textContent!.trim()).toBe('수금');
  });

  it('🔴제목 없이 **슬롯 액션만** 있어도 헤더가 나온다 (querySelector 타이밍)', async () => {
    // render() 가 라이트 DOM 을 읽는 자리다. 자식이 늦게 붙으면 null 이 되어
    // 헤더가 통째로 사라진다 — 소스에는 아무 이상이 없다.
    host.innerHTML = `<u-group-box><a slot="actions" href="#">수정</a></u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'header')!).display,
      '슬롯 액션만 있을 때 헤더가 접혔다').not.toBe('none');
  });

  it('🔴자식을 **나중에** 붙여도 헤더가 따라온다', async () => {
    host.innerHTML = `<u-group-box></u-group-box>`;
    const el = host.firstElementChild as HTMLElement & { requestUpdate?: () => void };
    await settle();
    const a = document.createElement('a');
    a.slot = 'actions';
    a.textContent = '수정';
    el.appendChild(a);
    // ★requestUpdate() 를 **부르지 않는다** — 소비자가 그것을 부를 이유가 없다.
    //   slotchange 가 스스로 갱신을 일으켜야 한다.
    await settle();
    expect(getComputedStyle(partOf(el, 'header')!).display,
      '나중에 붙은 슬롯을 못 봤다').not.toBe('none');
  });

  it('제목도 액션도 없으면 헤더가 없다', async () => {
    host.innerHTML = `<u-group-box>본문</u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    // DOM 에서 빼지 않고 **접는다** — 슬롯이 렌더되지 않으면 slotchange 가 영영 안 온다.
    expect(getComputedStyle(partOf(el, 'header')!).display).toBe('none');
  });
});

describe('u-page-header — 빈 상태 슬롯이 자리를 차지하지 않는다', () => {
  it('🔴상태 배지가 없으면 그 래퍼가 접힌다 (`:has()` 가 실제로 동작하는가)', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const status = partOf(el, 'status')!;
    expect(getComputedStyle(status).display, '빈 배지 자리가 남아 제목을 민다').toBe('none');
  });

  it('상태 배지가 있으면 보인다', async () => {
    host.innerHTML = `<u-page-header title="주문"><span slot="status">완료</span></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'status')!).display).not.toBe('none');
  });

  it('제목이 타입 스케일을 실제로 받는다', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const cs = getComputedStyle(partOf(el, 'title')!);
    // 시트가 로드돼 있으므로 폴백이 아니라 토큰 값이 와야 한다.
    expect(parseFloat(cs.fontSize)).toBeGreaterThanOrEqual(20);
    expect(Number(cs.fontWeight)).toBeGreaterThanOrEqual(600);
  });

  it('`back` 이 없으면 뒤로가기 링크가 없다', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(partOf(el, 'back')).toBeNull();
  });
});

describe('u-info-section — 컨테이너 폭이 열 수를 정한다', () => {
  it('좁은 컨테이너에서 열이 줄어든다 (미디어 쿼리가 아니라 컨테이너 기준)', async () => {
    host.style.width = '200px';
    host.innerHTML = `
      <u-info-section min="160">
        <u-info-field label="a" ></u-info-field>
        <u-info-field label="b" ></u-info-field>
      </u-info-section>`;
    const el = host.querySelector('u-info-section') as HTMLElement;
    await settle();
    const cols = getComputedStyle(partOf(el, 'grid')!).gridTemplateColumns.split(/\s+/).length;
    expect(cols, '좁은 컨테이너인데 열이 둘 이상이다').toBe(1);
  });

  it('넓은 컨테이너에서는 열이 늘어난다', async () => {
    host.style.width = '900px';
    host.innerHTML = `
      <u-info-section min="160">
        <u-info-field label="a"></u-info-field>
        <u-info-field label="b"></u-info-field>
      </u-info-section>`;
    const el = host.querySelector('u-info-section') as HTMLElement;
    await settle();
    const cols = getComputedStyle(partOf(el, 'grid')!).gridTemplateColumns.split(/\s+/).length;
    expect(cols).toBeGreaterThan(1);
  });
});

describe('u-empty-state — 두 variant 가 화면에서 다르다', () => {
  it('기본 문구가 서로 다르다', async () => {
    host.innerHTML = `<u-empty-state variant="no-data"></u-empty-state>
                      <u-empty-state variant="no-results"></u-empty-state>`;
    const [a, b] = [...host.children] as HTMLElement[];
    await settle();
    expect(partOf(a, 'title')!.textContent!.trim())
      .not.toBe(partOf(b, 'title')!.textContent!.trim());
  });

  it('액션이 없으면 액션 영역이 접힌다', async () => {
    host.innerHTML = `<u-empty-state></u-empty-state>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'actions')!).display).toBe('none');
  });
});
