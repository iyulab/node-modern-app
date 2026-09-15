import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import '@iyulab/components/styles/tokens.css';

/**
 * **WCAG 2.2 SC 2.5.8 Target Size (Minimum) — 24×24 CSS px** 게이트.
 *
 * `@iyulab/components`(cycle-479~492) → `chat-components`(496) → `data-components`(497) →
 * `editor-components` 를 거쳐 이식했다(cycle-601). 판정 규칙·간격 예외·형제 태그 걸러내기·hit-test 축은
 * **같은 형태**이고, 근거는 `components` 쪽 파일 머리말이 정본이다 — 여기에는 이 패키지에서만 참인 것만 적는다.
 *
 * ## ⚠ 이 패키지의 타깃은 «셸 크롬»이다
 *
 * 페이지 본문 프리미티브(`u-group-box`·`u-info-section` 등)는 표시물·배치 틀이라 대상이 아니고, 재야 할 것은
 * 사용자가 화면을 옮겨 다닐 때 누르는 **내비 항목·접기 토글·뒤로가기·마법사 단계**다.
 *
 * ## ⚠ 도출에 «지연 로드 모듈» 을 더한다
 *
 * `SidebarLayout` 은 `app.load()` 가 `layout.type === 'sidebar'` 일 때 **동적 `import()`** 로 싣는다 — 배럴만
 * 임포트하면 사이드바 크롬 다섯(`u-sidebar-*`)이 **등록되지 않은 채** 도출에서 빠지고, 그러면 «전수 대응» 단언이
 * 분류표가 완전하다고 거짓으로 말한다(`chat-components` 의 `./extra` 와 같은 함정). ⇒ 그 모듈도 함께 임포트한다.
 */

const MIN = 24;

interface Measured {
  w: number;
  h: number;
  cx: number;
  cy: number;
}

function measure(el: Element): Measured {
  const r = el.getBoundingClientRect();
  return { w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
}

/** SC 2.5.8 «간격 예외» — 중심 간 거리가 24px 이상이면 24px 원이 겹치지 않는다. */
function spacingSatisfied(target: Measured, others: Measured[]): boolean {
  return others.every((o) => Math.hypot(target.cx - o.cx, target.cy - o.cy) >= MIN);
}

type Verdict = 'meets-size' | 'exempt-by-spacing' | 'undersized';

function judge(target: Measured, others: Measured[]): Verdict {
  if (target.w >= MIN && target.h >= MIN) return 'meets-size';
  return spacingSatisfied(target, others) ? 'exempt-by-spacing' : 'undersized';
}

/** 섀도 DOM 안쪽에서 셀렉터로 고른다. */
function inShadow(host: Element, sel: string): Element[] {
  const root = (host as HTMLElement & { shadowRoot?: ShadowRoot }).shadowRoot;
  return root ? Array.from(root.querySelectorAll(sel)) : [];
}

/**
 * 🔴**hit-test 축**(cycle-553 · 세 게이트 공통) — 타깃의 중심과 1px 안쪽 네 가장자리를 실제로 누르면 그 타깃이 받는가.
 *
 * `getBoundingClientRect` 는 조상의 `overflow` 가 자른 부분도, 닫혀서 보이지 않는 요소의 박스도 그대로 보고한다 — 크기만
 * 재면 ***보이지도 눌리지도 않는 타깃이 통과한다.*** 실제로 그랬다: components 게이트의 `u-input` 접미 아이콘(좁은 필드에서
 * 밖으로 밀려나 잘렸다)과, 닫힌 채 띄운 대화상자 픽스처(닫기 버튼 중심을 누르면 `body` 가 받았다).
 *
 * - **사용자가 스크롤로 닿을 수 있으면 닿는 것이다** — 점마다, 그 점이 보이도록 `overflow: auto|scroll` 조상과 창만 스크롤한
 *   뒤 잰다(cycle-554: 표·시트·블록이 러너의 좁은 뷰포트를 넘어 `elementFromPoint` 가 `null` 을 돌려줬고, 뷰포트보다 넓은
 *   타깃은 양 끝을 한 화면에 담을 수 없다). `overflow: hidden|clip` 조상은 사용자가 움직일 수 없으므로 **건드리지 않는다** —
 *   `scrollIntoView` 는 그것까지 스크롤해 잘린 타깃을 통과시킨다. 움직인 스크롤은 점마다 돌려놓는다.
 * - 판정은 타깃이 속한 트리(`getRootNode()`)에서 한다. 그 트리로 retarget 되어 **호스트**가 돌아오면, 그 점이 타깃 안
 *   `<slot>` 에 꽂힌 라이트 DOM 내용 위일 때 타깃이 받은 것으로 센다(링크 안에 꽂힌 글자 등).
 * - ⚠**이웃 타깃이 받은 것은 봐주지 않는다.** 붙어 있는 격자 셀의 경계선 때문에 가장자리를 이웃에 양보하는 면제를
 *   시험해 봤지만(cycle-554), 네거티브 컨트롤로 끄자 **어떤 픽스처도 빨개지지 않았다** — 셀 가장자리의 불일치는 경계선이
 *   아니라 뷰포트 밖이었다. 쓰이지 않는 면제는 조용한 미탐이라 걷어냈다. 필요해지면 그 픽스처가 빨강으로 알린다.
 *
 * ⚠이 헬퍼는 세 게이트(components · chat-components · data-components)에 **같은 코드로** 한 벌씩 있다 — 고치면 셋 다.
 */
type HitPoint = readonly [name: string, fx: number, fy: number, ox: number, oy: number];

const HIT_POINTS: HitPoint[] = [
  ['중심', 0.5, 0.5, 0, 0],
  ['왼', 0, 0.5, 1, 0],
  ['오른', 1, 0.5, -1, 0],
  ['위', 0.5, 0, 0, 1],
  ['아래', 0.5, 1, 0, -1],
];

function describeEl(el: Element | null): string {
  if (!el) return 'null';
  const cls = el.getAttribute('class');
  return `${el.localName}${cls ? `.${cls.split(' ')[0]}` : ''}`;
}

function unreachablePoints(el: Element): Array<{ point: string; hit: string }> {
  const root = el.getRootNode() as Document | ShadowRoot;
  const host = root instanceof ShadowRoot ? root.host : null;
  const at = (p: HitPoint): [number, number] => {
    const r = el.getBoundingClientRect();
    return [r.left + r.width * p[1] + p[3], r.top + r.height * p[2] + p[4]];
  };
  const misses: Array<{ point: string; hit: string }> = [];
  for (const p of HIT_POINTS) {
    const restore = revealPoint(el, () => at(p));
    try {
      const [x, y] = at(p);
      const hit = root.elementFromPoint(x, y);
      const ok = !!hit && (hit === el || el.contains(hit) || (hit === host && slottedContentAt(el, x, y)));
      if (!ok) misses.push({ point: p[0], hit: describeEl(hit) });
    } finally {
      restore();
    }
  }
  return misses;
}

/** 평탄 트리의 부모 — 슬롯에 꽂혔으면 그 슬롯, 섀도 루트면 그 호스트. */
function flatParent(node: Node): Element | null {
  const slot = (node as Element).assignedSlot;
  if (slot) return slot;
  const parent = node.parentNode;
  if (parent instanceof ShadowRoot) return parent.host;
  return parent instanceof Element ? parent : null;
}

/** 그 점이 보이도록 사용자가 스크롤할 수 있는 조상과 창을 움직인다. 돌려놓는 함수를 돌려준다. */
function revealPoint(el: Element, point: () => [number, number]): () => void {
  const moved: Array<[Element, number, number]> = [];
  for (let a = flatParent(el); a && a !== document.documentElement && a !== document.body; a = flatParent(a)) {
    const cs = getComputedStyle(a);
    const canX = /auto|scroll/.test(cs.overflowX) && a.scrollWidth > a.clientWidth;
    const canY = /auto|scroll/.test(cs.overflowY) && a.scrollHeight > a.clientHeight;
    if (!canX && !canY) continue;
    const [x, y] = point();
    const box = a.getBoundingClientRect();
    const left = box.left + a.clientLeft;
    const top = box.top + a.clientTop;
    const before: [Element, number, number] = [a, a.scrollLeft, a.scrollTop];
    if (canX && (x < left || x >= left + a.clientWidth)) a.scrollLeft += x - (left + a.clientWidth / 2);
    if (canY && (y < top || y >= top + a.clientHeight)) a.scrollTop += y - (top + a.clientHeight / 2);
    if (a.scrollLeft !== before[1] || a.scrollTop !== before[2]) moved.push(before);
  }
  const wx = window.scrollX;
  const wy = window.scrollY;
  const [x, y] = point();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const dx = x < 0 || x >= vw ? x - vw / 2 : 0;
  const dy = y < 0 || y >= vh ? y - vh / 2 : 0;
  if (dx || dy) window.scrollBy(dx, dy);
  return () => {
    window.scrollTo(wx, wy);
    for (const [a, l, t] of moved.reverse()) {
      a.scrollLeft = l;
      a.scrollTop = t;
    }
  };
}

/**
 * 🔴**포인터 고아** — 포인터 커서를 보이는데 상호작용 요소가 아닌 것(클릭 핸들러만 가진 `div` 따위). 이 게이트의 대상 도출은
 * 픽스처의 `targets` 선택자에 기대므로 **선택자 밖의 클릭 대상은 크기 판정 전에 시야에서 사라진다** — 그리고 그런 요소는 대개
 * 키보드로도 닿지 않는다(SC 2.1.1). u-widgets e2e 게이트가 인용 링크 `div` 로 실측한 부류다.
 *
 * - 가장 바깥 요소만 센다(자식은 커서를 상속한다). 섀도 루트 안까지 내려간다. `display: none` 인 가지는 건너뛴다 —
 *   숨긴 요소도 계산된 커서를 돌려주므로, 거르지 않으면 보이지 않는 라벨에 발화한다(`u-radio` 의 빈 필드 머리 실측).
 * - **상호작용으로 치는 것**: 네이티브 컨트롤 · 링크 · `summary` · `tabindex` 를 가진 것(로빙 그룹의 `-1` 조각 포함) · 위젯 역할 ·
 *   `label`(누르면 컨트롤을 활성화·포커스하는 대리자 — 키보드는 컨트롤 자신으로 간다) ·
 *   **섀도 안에(몇 겹이든) 상호작용 요소를 가진 커스텀 엘리먼트 호스트** · **컨트롤을 품은 래퍼**(누를 면 확장).
 * - 🔴**면제는 컨트롤 «안쪽» 으로만 물려준다** — `tabindex` 만 가진 컨테이너(격자 호스트)는 자기만 면제되고 자손은 따로 잰다.
 * - ⚠원리적 한계 둘: 키 처리가 실제로 있는지는 재지 못한다(역할·탭인덱스의 «존재» 만 본다) · 컨트롤을 품었지만 **다른 동작**을
 *   하는 래퍼(정렬하는 머리 칸이 메뉴 버튼을 품는 경우)는 래퍼 면제에 가려진다.
 * - 지목됐지만 아직 고치지 않은 것은 게이트마다 `POINTER_ORPHAN_PINS` 에 이유와 함께 둔다(크기 핀과 같은 규율).
 */
const POINTER_INTERACTIVE =
  'button, a[href], input, select, textarea, summary, [tabindex], [contenteditable=""], [contenteditable="true"], ' +
  '[role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], ' +
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="slider"], ' +
  '[role="treeitem"], [role="gridcell"], [role="spinbutton"], [role="combobox"]';

function pointerOrphans(root: Element): string[] {
  const found = new Set<string>();
  // 섀도 안의 섀도까지 본다 — 링크를 감싼 래퍼(`<u-sidebar-link>` → `<u-link>` → `<a>`)는 컨트롤이 두 겹 아래에 있다.
  const interactiveHost = (el: Element): boolean => {
    const sr = (el as HTMLElement & { shadowRoot?: ShadowRoot }).shadowRoot;
    if (!sr) return false;
    if (sr.querySelector(POINTER_INTERACTIVE)) return true;
    return Array.from(sr.querySelectorAll('*')).some((d) => d.localName.includes('-') && interactiveHost(d));
  };
  const visit = (el: Element, parentPointer: boolean, insideInteractive: boolean): void => {
    const style = getComputedStyle(el);
    if (style.display === 'none') return;
    const pointer = style.cursor === 'pointer';
    const control = el.matches(POINTER_INTERACTIVE.replace('[tabindex], ', '')) || el.localName === 'label';
    // 컨트롤을 품은 «누를 면 확장» 래퍼(별점 기호 줄 · 슬라이더 트랙)는 고아가 아니다 — 키보드는 안의 컨트롤로 간다.
    //   ⚠그래서 «컨트롤을 품었지만 다른 동작을 하는» 래퍼(머리 칸이 정렬하면서 메뉴 버튼을 품는 경우)는 원리적으로 못 잡는다.
    const wrapsControl = !!el.querySelector(POINTER_INTERACTIVE);
    const interactive = insideInteractive || control || el.matches('[tabindex]') || interactiveHost(el) || wrapsControl;
    if (pointer && !parentPointer && !interactive) found.add(describeEl(el));
    // 🔴면제는 «컨트롤 안쪽» 에만 물려준다 — 포커스를 받는 «컨테이너»(`tabindex` 를 가진 격자 호스트 따위) 아래를 통째로
    //   면제하면 그 안의 클릭 전용 조각이 전부 가려진다(flex-table 정렬 헤더가 호스트의 `tabindex=0` 뒤에 숨었다).
    const sr = (el as HTMLElement & { shadowRoot?: ShadowRoot }).shadowRoot;
    for (const child of Array.from(sr ? [...sr.children, ...el.children] : el.children)) {
      visit(child, pointer, insideInteractive || control);
    }
  };
  visit(root, false, false);
  return [...found].sort();
}

/** 타깃 안 `<slot>` 에 꽂힌 라이트 DOM 내용 중 그 점을 덮는 것이 있는가. */
function slottedContentAt(el: Element, x: number, y: number): boolean {
  for (const slot of Array.from(el.querySelectorAll('slot'))) {
    for (const n of slot.assignedNodes({ flatten: true })) {
      let rects: DOMRect[];
      if (n instanceof Element) {
        rects = [n.getBoundingClientRect()];
      } else {
        const range = document.createRange();
        range.selectNodeContents(n);
        rects = Array.from(range.getClientRects());
      }
      if (rects.some((q) => x >= q.left && x <= q.right && y >= q.top && y <= q.bottom)) return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// 규칙 — 손으로 쓴다 (도출할 수 없는 우리 지식)
// ---------------------------------------------------------------------------

/**
 * 포인터 타깃이 아닌 것 — 표시물·배치 틀, 또는 조작부를 **형제 컴포넌트로 놓기만** 하는 것.
 * 사용자가 «활성화»하는 영역이 아니므로 자를 대면 정당한 컴포넌트 전건에 발화한다.
 */
const NOT_A_TARGET = new Set<string>([
  // 본문 프리미티브 — 조작부는 소비자가 슬롯으로 넣는다(`actions` 슬롯의 `u-button` 등은 그 패키지의 계약이다).
  'u-action-bar',
  'u-empty-state',
  'u-group-box',
  'u-info-field',
  'u-info-section',
  // 사이드바 섹션 — 제목 머리(`part="header"`)는 표시물이고 항목은 자식 링크·버튼이 각자 잰다.
  'u-sidebar-section',
  // 🔴타깃이 «형제 컴포넌트» 인 것 — `.detail-close` 는 `u-button` 이고 이 패키지의 시트는 **위치만** 준다
  //   (`position: absolute` · `top`/`right`). 치수는 `@iyulab/components` 의 계약이라 거기 게이트가 잰다.
  //   ⚠`u-sidebar-layout` 의 `.toggler` 도 `u-button` 이지만 **여기서 잰다** — 이 패키지의 시트가 `padding: 0` 과
  //   `font-size` 로 **치수를 덮어쓰기** 때문이다(아래 FIXTURES). «누가 치수를 정하는가» 가 경계다.
  'u-master-detail-layout',
]);

/**
 * 타깃을 «갖고 있지만» 아직 대표 픽스처를 쓰지 않은 것.
 * ⚠**이 목록은 「통과」가 아니라 「미판정」이다.**
 */
const NEEDS_FIXTURE = new Set<string>([]);

/**
 * 🔴**측정 결과 미달인데 «치수를 올리는 것이 시각적 공개 계약 변경»이라 사람 판단이 필요한 것.**
 * 여기 있는 동안 이 파일은 그것을 **미달로 단언**하므로 스위트는 초록이고, 치수를 올리면
 * 빨개진다 — 그때 이 집합에서 빼는 것이 완료 신호다. 태그 전체(`u-x`) 또는 한 상태(`u-x [상태]`)에 건다.
 */
const UNDERSIZED_PINS = new Set<string>([]);

/**
 * 🔴**SC 2.5.8 「인라인」 예외** — *"타깃이 문장 안에 있거나, 그 크기가 타깃 아닌 텍스트의
 * `line-height` 에 의해 제약되는 경우"* 는 규격이 명시적으로 면제한다. 이 패키지에는 아직 없다.
 * ⚠**면제는 이름으로 좁게 준다** — 넓은 면제는 조용한 미탐이 된다.
 */
const INLINE_PROSE = new Set<string>([]);

/**
 * 🔴**포인터 고아 핀** — `pointerOrphans` 가 지목했지만 아직 고치지 않은 것(`요소.첫클래스`). 여기 있는 동안 실측 단언이 그것을 건너뛴다.
 * 고치면 빼는 것이 완료 신호다. 새로 넣을 때는 왜 지금 고치지 않는지를 함께 적는다.
 */
const POINTER_ORPHAN_PINS = new Set<string>([
  // ✅비어 있다 — 도입 시점의 사이드바 로고(`img.logo` — 클릭만 받는 이미지)는 `u-link` 로 감싸 해소했다.
]);

interface Fixture {
  html: string;
  /** 🔴**상태 이름** — 한 태그가 상태에 따라 다른 타깃을 그리면 상태마다 픽스처를 둔다(`FIXTURES` 값이 배열). */
  state?: string;
  /** 재기 전에 상태를 연다. 여는 데 실패하면 **던진다** — 닫힌 채 숨은 타깃을 재고 초록이 되는 것이 조용한 미탐이다. */
  prepare?: (host: Element) => Promise<void>;
  /** 이 픽스처 안의 «타깃»들. 생략하면 태그 자신. */
  targets?: (tag: string) => Element[];
  /** 🔴**이 컴포넌트가 «타깃들 사이의 간격»을 스스로 소유하는가.** 기본값은 크기로만 판정. */
  spacingIsOurs?: true;
  /** 렌더가 비동기인 것을 위한 추가 대기(ms). */
  settle?: number;
}

/** 사이드바 내비 항목 셋은 «펼침»·«접힘» 두 상태가 다른 치수를 가진다(접히면 라벨이 숨어 아이콘만 남는다). */
const navItem = (tag: string, part: string): Fixture[] => [
  { state: '펼침', html: `<${tag} label="Orders" icon="list"></${tag}>`, targets: () => inShadow(document.querySelector(tag)!, part) },
  { state: '접힘', html: `<${tag} label="Orders" icon="list" compact></${tag}>`, targets: () => inShadow(document.querySelector(tag)!, part) },
];

/** 실제로 재는 것 — 대표 픽스처와 그 안의 타깃. 상태가 여럿이면 배열. */
const FIXTURES: Record<string, Fixture | Fixture[]> = {
  'u-page-header': [
    {
      // 뒤로가기(`a.back`)는 `back` 이 있을 때만 렌더된다 — 없으면 타깃이 아예 없고 그것을 «통과» 로 읽으면 미탐이다.
      html: '<u-page-header title="Orders" back="#list"></u-page-header>',
      targets: () => inShadow(document.querySelector('u-page-header')!, 'a.back'),
    },
    {
      // 🔴줄 상자가 낮은 글꼴 — `line-height: normal` 의 높이는 **글꼴 메트릭**이 정한다. 이 머신(Windows)은 17px 이라
      //   «줄 상자 + 고정 패딩» 이 25 로 통과했고 CI(Linux)는 15px 이라 23 으로 떨어졌다. 글꼴을 고를 수 없으니
      //   줄 높이를 명시해 그 조건을 결정적으로 재현한다 — 치수가 글꼴과 무관하게 24 를 넘는지가 판정 대상이다.
      state: '낮은 줄 상자',
      html: '<u-page-header title="Orders" back="#list" style="line-height:1"></u-page-header>',
      targets: () => inShadow(document.querySelector('u-page-header')!, 'a.back'),
    },
  ],
  'u-sidebar-link': navItem('u-sidebar-link', 'u-link'),
  'u-sidebar-button': navItem('u-sidebar-button', 'button[part="base"]'),
  'u-sidebar-group': navItem('u-sidebar-group', 'button[part="header"]'),
  'u-sidebar-layout': {
    // 머리의 로고(누르면 홈으로)와 접기 토글. 토글은 `u-button` 이지만 치수를 이 패키지 시트가 덮는다(위 NOT_A_TARGET 주석).
    // ⚠`config` 는 **프로퍼티**다 — 없으면 아무것도 렌더하지 않는다.
    // 🔴로고는 **이미지형**으로 준다 — 문자열형(`logo: 'house'`)은 `lib` 없이 기본 URL 을 요청하는데 테스트 설정은 그 요청을
    //   스텁하지 않아(`vitest-setup.ts` 는 이름 있는 lib 만 덮는다) 해석에 실패하고 폴백이 없어 **0×0** 이 된다(cycle-601 실측).
    //   그것을 재면 제품이 아니라 러너의 네트워크를 잰다. 이미지형은 시트가 높이 24px 을 직접 준다.
    html: '<div style="height:420px"><u-sidebar-layout></u-sidebar-layout></div>',
    prepare: async (host) => {
      const layout = host as HTMLElement & { config: unknown; updateComplete: Promise<unknown> };
      const src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24"/></svg>');
      layout.config = { type: 'sidebar', title: 'App', logo: { src, alt: 'App', href: '/' } };
      await layout.updateComplete;
      if (inShadow(layout, '.sidebar-header .toggler').length === 0) throw new Error('사이드바 머리가 렌더되지 않았다');
      const img = inShadow(layout, '.sidebar-header img.logo')[0] as HTMLImageElement | undefined;
      if (!img) throw new Error('이미지형 로고가 렌더되지 않았다');
      await img.decode();
    },
    targets: () => inShadow(document.querySelector('u-sidebar-layout')!, '.sidebar-header .logo, .sidebar-header .toggler'),
    settle: 100,
  },
  'u-wizard': {
    // 단계 탭은 서로 붙어 쌓이는 목록이다 — 간격을 이 컴포넌트가 소유한다. 이전·다음은 형제 `u-button` 이라 재지 않는다.
    // ⚠`steps` 는 **프로퍼티**다(`attribute: false`).
    html: '<u-wizard style="width:520px"></u-wizard>',
    prepare: async (host) => {
      const w = host as HTMLElement & { steps: unknown; updateComplete: Promise<unknown> };
      w.steps = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Confirm' }];
      await w.updateComplete;
      if (inShadow(w, '[part="step"]').length !== 3) throw new Error('단계 탭 셋이 렌더되지 않았다');
    },
    targets: () => inShadow(document.querySelector('u-wizard')!, '[part="step"]'),
    spacingIsOurs: true,
  },
};

async function mount(html: string, settle = 0): Promise<void> {
  document.body.innerHTML = `<div style="padding:40px;width:600px">${html}</div>`;
  await new Promise((r) => setTimeout(r, 80 + settle));
}

/**
 * 등록된 태그 중 **이 패키지가 소유한 것**만 — 손으로 열거하지 않는다.
 *
 * 🔴**형제 `@iyulab/components`·`@iyulab/router` 의 태그를 걸러야 한다** — 형제를 «먼저» 임포트해 그때 등록된
 * 것을 걷어내면 남는 것이 곧 우리 것이다(같은 태그는 두 번 등록되지 않는다). 그 태그들은 각자의 계약이다.
 */
const registered: string[] = [];

beforeAll(async () => {
  const original = customElements.define.bind(customElements);
  customElements.define = ((name: string, ctor: CustomElementConstructor, opts?: ElementDefinitionOptions) => {
    registered.push(name);
    return original(name, ctor, opts);
  }) as typeof customElements.define;

  await import('@iyulab/components');
  await import('@iyulab/router');
  const foreign = registered.length;
  registered.length = 0;

  await import('../../src/index.js');
  // `app.load()` 가 지연 로드하는 레이아웃 — 머리말 참조.
  await import('../../src/layouts/SidebarLayout.js');
  customElements.define = original;

  if (foreign === 0) throw new Error('형제 배럴이 아무 태그도 등록하지 않았다 — 소유 판정이 무의미하다');
});

describe('WCAG 2.2 SC 2.5.8 — 타깃 크기(최소) 게이트', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('규칙 자체 — 간격 예외 모델링', () => {
    it('24×24 이상이면 간격과 무관하게 통과한다', () => {
      expect(judge({ w: 24, h: 24, cx: 0, cy: 0 }, [{ w: 24, h: 24, cx: 1, cy: 0 }])).toBe('meets-size');
    });

    it('🔴미달이어도 중심 간 24px 이상이면 «간격 예외»로 통과한다', () => {
      expect(judge({ w: 16, h: 16, cx: 0, cy: 0 }, [{ w: 16, h: 16, cx: 24, cy: 0 }]))
        .toBe('exempt-by-spacing');
    });

    it('🔴미달이고 중심 간 24px 미만이면 위반이다', () => {
      expect(judge({ w: 16, h: 16, cx: 0, cy: 0 }, [{ w: 16, h: 16, cx: 23.9, cy: 0 }]))
        .toBe('undersized');
    });

    it('⚪NEGATIVE — 이웃이 없으면 미달이어도 «간격 예외»다 (혼자 있는 타깃)', () => {
      expect(judge({ w: 10, h: 10, cx: 0, cy: 0 }, [])).toBe('exempt-by-spacing');
    });

    it('⚪NEGATIVE — 대각선 거리도 유클리드로 잰다 (축별로 재면 틀린다)', () => {
      expect(judge({ w: 16, h: 16, cx: 0, cy: 0 }, [{ w: 16, h: 16, cx: 17, cy: 17 }]))
        .toBe('exempt-by-spacing');
    });
  });

  describe('규칙 자체 — hit-test 축', () => {
    const pointsOf = (el: Element) => unreachablePoints(el).map((m) => m.point);
    const ALL = ['중심', '왼', '오른', '위', '아래'];

    it('보이는 버튼은 다섯 점 모두 닿는다 — 자손(글자·아이콘)이 받아도 그 버튼이 받은 것이다', async () => {
      await mount('<button style="width:60px;height:30px"><span style="display:block">OK</span></button>');
      expect(pointsOf(document.querySelector('button')!)).toEqual([]);
    });

    it('🔴조상 overflow 에 통째로 잘린 버튼은 다섯 점 모두 닿지 않는다 — 박스는 그대로 보고되는데도', async () => {
      await mount('<div style="width:40px;height:30px;overflow:hidden;position:relative">' +
        '<button style="position:absolute;left:50px;width:30px;height:30px">x</button></div>');
      const button = document.querySelector('button')!;
      expect(Math.round(button.getBoundingClientRect().width), '크기만 보면 통과처럼 보인다').toBe(30);
      expect(pointsOf(button)).toEqual(ALL);
    });

    it('🔴반쯤 잘린 버튼은 잘린 쪽 가장자리만 닿지 않는다 (중심만 재면 놓친다)', async () => {
      await mount('<div style="width:40px;height:30px;overflow:hidden;position:relative">' +
        '<button style="position:absolute;left:20px;width:30px;height:30px">x</button></div>');
      expect(pointsOf(document.querySelector('button')!)).toEqual(['오른']);
    });

    it('🔴다른 요소에 덮인 버튼은 닿지 않는다', async () => {
      await mount('<div style="position:relative"><button style="width:30px;height:30px">x</button>' +
        '<div style="position:absolute;inset:0;width:30px;height:30px"></div></div>');
      expect(pointsOf(document.querySelector('button')!)).toEqual(ALL);
    });

    it('뷰포트 밖이어도 창을 스크롤해 닿으면 닿는다 — 그리고 스크롤은 돌려놓는다', async () => {
      await mount('<div style="width:3000px"><button style="margin-left:2600px;width:30px;height:30px">x</button></div>');
      expect(pointsOf(document.querySelector('button')!)).toEqual([]);
      expect(window.scrollX).toBe(0);
    });

    it('🔴뷰포트보다 넓은 타깃도 양 끝이 닿는다 — 점마다 드러낸다', async () => {
      await mount('<button style="width:2500px;height:30px">wide</button>');
      expect(pointsOf(document.querySelector('button')!)).toEqual([]);
    });

    it('사용자 스크롤 컨테이너(overflow:auto) 밖에 있는 타깃은 그 컨테이너를 스크롤해 닿는다', async () => {
      // ⚠높이는 가로 스크롤바가 생겨도 버튼(30)이 들어갈 만큼 — 40 이면 스크롤바가 위아래 끝을 가려 픽스처가 틀린다.
      await mount('<div id="sc" style="width:100px;height:60px;overflow:auto"><div style="width:600px">' +
        '<button style="margin-left:500px;width:30px;height:30px">x</button></div></div>');
      expect(pointsOf(document.querySelector('button')!)).toEqual([]);
      expect(document.getElementById('sc')!.scrollLeft).toBe(0);
    });

    it('🔴overflow:hidden 컨테이너는 스크롤하지 않는다 — 잘린 타깃은 잘린 채로 남는다(scrollIntoView 는 이것을 드러낸다)', async () => {
      await mount('<div style="width:100px;height:40px;overflow:hidden"><div style="width:600px">' +
        '<button style="margin-left:500px;width:30px;height:30px">x</button></div></div>');
      expect(pointsOf(document.querySelector('button')!)).toEqual(ALL);
    });

    it('섀도 안 링크에 슬롯으로 꽂힌 글자 위의 점도 그 링크가 받은 것으로 센다(retarget 보정)', async () => {
      const name = 'zz-hit-slot-link';
      if (!customElements.get(name)) {
        customElements.define(name, class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML =
              '<a href="#x" style="display:inline-block;padding:4px"><slot></slot></a>';
          }
        });
      }
      await mount(`<${name}>Linked text</${name}>`);
      expect(pointsOf(document.querySelector(name)!.shadowRoot!.querySelector('a')!)).toEqual([]);
    });

    it('⚪NEGATIVE — 이웃 타깃이 가장자리를 덮어도 봐주지 않는다 (이웃에 양보하는 면제는 없다)', async () => {
      await mount('<div style="display:flex"><button id="a" style="width:40px;height:30px;margin-right:-3px">a</button>' +
        '<button id="b" style="width:40px;height:30px;position:relative">b</button></div>');
      expect(pointsOf(document.getElementById('a')!)).toEqual(['오른']);
    });

    it('🔴포인터 고아 — 클릭만 되는 div 는 가장 바깥 한 번만 지목된다', async () => {
      await mount('<div class="card" style="cursor:pointer"><span>inherits</span></div>');
      expect(pointerOrphans(document.body)).toEqual(['div.card']);
    });

    it('⚪NEGATIVE — 포인터 고아: 버튼·탭인덱스·라벨·숨긴 요소·섀도에 컨트롤을 가진 호스트는 고아가 아니다', async () => {
      const name = 'zz-orphan-host';
      if (!customElements.get(name)) {
        customElements.define(name, class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = '<button>in</button>';
          }
        });
      }
      await mount('<button style="cursor:pointer">b</button>' +
        '<div tabindex="-1" style="cursor:pointer">roving</div>' +
        '<label style="cursor:pointer">name</label>' +
        '<div style="display:none;cursor:pointer">hidden</div>' +
        `<${name} style="cursor:pointer;display:block"></${name}>`);
      expect(pointerOrphans(document.body)).toEqual([]);
    });

    it('🔴포인터 고아 — 포커스를 받는 컨테이너 안의 클릭 전용 조각은 가려지지 않는다', async () => {
      await mount('<div tabindex="0"><div class="cell"><div class="sort" style="cursor:pointer">A</div></div></div>');
      expect(pointerOrphans(document.body)).toEqual(['div.sort']);
    });
  });

  describe('🔴 대상 도출 — 등록된 태그가 규칙 표를 벗어나지 않는다', () => {
    it('배럴이 태그를 실제로 등록한다 (도출이 0건이면 아래 단언이 전부 공허해진다)', () => {
      // ⚠형제 것을 걸러낸 뒤의 수다 — 배럴의 본문 프리미티브 여덟 + 지연 로드 레이아웃과 그 크롬 다섯.
      expect(registered.length).toBeGreaterThan(10);
    });

    it('등록된 모든 태그가 세 집합 중 정확히 하나에 분류돼 있다', () => {
      const unclassified = registered.filter(
        (t) => !NOT_A_TARGET.has(t) && !NEEDS_FIXTURE.has(t) && !(t in FIXTURES),
      );
      expect(unclassified,
        `분류되지 않은 태그가 있다 — 새 컴포넌트라면 규칙 표에 넣을 것: ${unclassified.join(' ')}`,
      ).toEqual([]);
    });

    it('📌커버리지를 보고한다 — 「미판정」은 통과가 아니다', () => {
      const unjudged = [...NEEDS_FIXTURE].sort();
      // ⚠이 단언은 «미판정이 늘지 않았는가»를 지킨다. 픽스처를 쓰면 이 수가 줄고 그때 이
      //   줄을 함께 고치는 것이 그 작업의 완료 신호다.
      // 🔴«판정» 은 태그 수와 **상태 수**를 함께 말한다 — 태그만 세면 열린 상태를 빠뜨려도 이 줄이 변하지 않는다.
      const states = Object.values(FIXTURES).flat().length;
      expect(
        `판정 ${Object.keys(FIXTURES).length}(${states}상태) · 미판정 ${unjudged.length}(${unjudged.join(' ')})` +
        ` · 대상아님 ${NOT_A_TARGET.size} · 인라인예외 ${INLINE_PROSE.size}`,
      ).toBe('판정 6(10상태) · 미판정 0() · 대상아님 7 · 인라인예외 0');
    });

    it('규칙 표에 «등록되지 않은» 이름이 남아 있지 않다 (표가 낡지 않게)', () => {
      const known = new Set(registered);
      const stale = [...NOT_A_TARGET, ...NEEDS_FIXTURE, ...Object.keys(FIXTURES)]
        .filter((t) => !known.has(t));
      expect(stale, `등록되지 않은 이름: ${stale.join(' ')}`).toEqual([]);
    });
  });

  describe('실측 — 픽스처를 가진 모든 타깃', () => {
    const CASES = Object.entries(FIXTURES).flatMap(([tag, entry]) =>
      (Array.isArray(entry) ? entry : [entry]).map((fixture) => ({ tag, fixture })));
    for (const { tag, fixture } of CASES) {
      const name = `${tag}${fixture.state ? ` [${fixture.state}]` : ''}`;
      const pinned = UNDERSIZED_PINS.has(tag) || UNDERSIZED_PINS.has(name);
      const inline = INLINE_PROSE.has(tag);
      const label = pinned
        ? '📌미달로 «핀»돼 있다 (사람 판단 대기)'
        : inline
          ? '「인라인」 예외 — 크기 하한을 적용하지 않되 실측은 보고한다'
          : 'SC 2.5.8 을 만족한다';
      it(`${name}: ${label}`, async () => {
        await mount(fixture.html, fixture.settle);
        if (fixture.prepare) await fixture.prepare(document.querySelector(tag)!);
        const els = (fixture.targets ? fixture.targets(tag) : [document.querySelector(tag)!]);
        const targets = els.map(measure);
        expect(targets.length, '타깃을 하나도 못 찾으면 이 판정은 무의미하다').toBeGreaterThan(0);

        // 🔴크기보다 먼저 — 그 타깃이 실제로 눌리는가. 잘렸거나 가려졌거나 닫혀 있으면 크기 판정은 의미가 없다.
        //   (세 게이트 공통 · 인라인 예외도 «눌린다» 는 전제는 면제하지 않는다.)
        const orphans = pointerOrphans(document.body).filter((o) => !POINTER_ORPHAN_PINS.has(o));
        expect(orphans.join(' · '), '포인터 커서인데 상호작용 요소가 아니다 — 키보드로 닿지 않는 클릭 대상').toBe('');
        const unreachable = els
          .map((el) => ({ el, misses: unreachablePoints(el) }))
          .filter(({ misses }) => misses.length > 0)
          .map(({ el, misses }) => `${describeEl(el)} — ${misses.map((m) => `${m.point}→${m.hit}`).join(' · ')}`);
        expect(unreachable, '누르면 다른 요소가 받는 타깃 — 잘렸거나 가려졌거나 닫혀 있다').toEqual([]);
        const verdicts = targets.map((t, i) =>
          fixture.spacingIsOurs ? judge(t, targets.filter((_, j) => j !== i)) : judge(t, [t]),
        );
        const detail = `실측 ${targets.map((t) => `${Math.round(t.w)}x${Math.round(t.h)}`).join(' ')} · 판정 ${verdicts.join(' ')}`;

        if (pinned) {
          expect(verdicts.some((v) => v === 'undersized'), detail).toBe(true);
        } else if (inline) {
          const host = document.querySelector(tag)!;
          expect(getComputedStyle(host).display, `${detail} · 인라인이 아니면 면제 근거가 없다`)
            .toMatch(/^inline/);
        } else {
          expect(verdicts.every((v) => v !== 'undersized'), detail).toBe(true);
        }
      });
    }
  });
});
