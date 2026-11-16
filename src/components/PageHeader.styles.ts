import { css } from 'lit';

export const styles = css`
  /* 호스트는 자리만 잡고 상자(여백 · 테두리 · 간격)는 섀도 안 .base 가 그린다 — 캡슐화 문맥이 다르면 문서 쪽 normal
     선언이 :host 를 이기므로, 문서의 전역 리셋(Tailwind preflight 류)이 호스트에 둔 여백 · 테두리를 지운다. */
  :host {
    display: block;
  }

  .base {
    display: flex;
    align-items: flex-start;
    gap: var(--u-space-md, 12px);
    flex-wrap: wrap;
    margin-bottom: var(--u-space-2xl, 24px);
  }

  /* 좁을 때(자기 폭 640px 미만): 액션이 제목 아래로 내려가고 **왼쪽 정렬**로 폭을 채운다.
     ★오른쪽 정렬을 유지하면 손가락이 닿기 어려운 쪽으로 몰린다.
     🔴**«화면»이 아니라 «자기 폭»을 본다** — 셸 안에서 사이드바가 열려 본문이 500px 인 1280px 화면에서도
     접히고, 넓은 본문을 가진 좁은 화면에서는 접히지 않는다. 그 판단을 크기 containment(@container)가 아니라
     제목의 flex-basis 임계가 한다(«Holy Albatross» — u-group-box 머리말 주석의 근거와 같다: containment 가
     Chromium 에서 같은 커밋의 재배치 뒤 상자를 접힌 채 남겼다).
     ★임계는 **액션** 의 flex-basis 가 건다 — 제목에 걸면 같은 줄의 «뒤로» 링크와 제목이 갈라진다. 넓으면 basis 가
     음수(→ 0)라 액션은 최소 폭(fit-content = 내용 폭)으로 제목 오른쪽에 서고, 좁으면 basis 가 매우 커져 혼자 한
     줄을 채운다(내용은 왼쪽부터). */
  /* 🔴**기준 폭(flex-basis)은 0 이다 — auto 가 아니다.** auto 는 내용의 한 줄 최대 폭(max-content)이라 부제가
     본문 폭보다 길면 제목 하나가 줄을 다 채워, 위 .base 의 flex-wrap 이 «축소» 보다 먼저 «줄바꿈» 으로 액션을
     아래로 떨어뜨린다(부제 80자는 오른쪽 위, 129자는 부제 아래 왼쪽 — 같은 앱 같은 폭에서 단추 자리가 갈렸다).
     줄을 가를지는 오직 액션의 임계(아래 .actions)가 정하게 하고, 제목은 남은 폭을 채우며(grow) 줄어든다. */
  .heading {
    flex: 1 1 0;
    min-width: 0; /* 긴 제목이 액션을 밀어내지 않게 — 줄바꿈이 아니라 축소가 먼저다 */
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    flex-wrap: wrap;
  }

  .title {
    margin: 0;
    font-size: var(--u-text-display-size, 26px);
    font-weight: var(--u-text-display-weight, 700);
    line-height: var(--u-text-display-leading, 1.4);
    letter-spacing: var(--u-text-display-tracking, -0.02em);
    color: var(--u-txt-color, #212121);
  }

  .subtitle {
    margin: var(--u-space-2xs, 4px) 0 0;
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-body-weight, 400);
    line-height: var(--u-text-body-leading, 1.6);
    color: var(--u-txt-color-weak, #616161);
  }

  /* 제목 위 위치 표시 — 제목보다 네 단 작고 옅다. 링크(브레드크럼)는 상속받은 색으로 선다. */
  .eyebrow {
    margin: 0 0 var(--u-space-2xs, 4px);
    font-size: var(--u-text-overline-size, 11px);
    font-weight: var(--u-text-overline-weight, 700);
    line-height: var(--u-text-overline-leading, 1.45);
    letter-spacing: var(--u-text-overline-tracking, 0.06em);
    color: var(--u-txt-color-weak, #616161);
  }
  .eyebrow ::slotted(*) {
    color: inherit;
  }
  .eyebrow.empty {
    display: none;
  }

  .back {
    flex: 0 0 auto;
    align-self: center;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
    color: var(--u-link-txt-color, #1565C0);
    text-decoration: none;
    /* 타깃 크기(WCAG 2.2 SC 2.5.8) — 누를 면의 하한은 **선언된 최소 높이**다. 글자는 그 상자 안에서 세로 가운데에 선다.
       🔴줄 높이(1lh)에서 모자란 만큼을 계산해 패딩으로 채우면 안 된다: WebKit(Safari)은 같은 시트를 나눈 요소들의 1lh 를
       «처음 그린 요소의 줄 높이» 로 붙잡아, 줄 높이가 큰 머리가 먼저 그려진 뒤의 좁은 머리는 패딩 0 으로 남는다 — «뒤로» 가
       줄 상자 높이(15.6px)로 줄어 24px 하한을 어긴다(실제 Safari 27 에서 확인). 고정 패딩(4px)도 안 된다: line-height:
       normal 의 높이는 글꼴 메트릭이 정해 17px(→25)도 15px(→23)도 된다. 줄 높이와 무관한 최소 높이만 둘 다 피한다.
       배치는 움직이지 않는다 — «뒤로» 는 .base 의 가운데 정렬된 flex 항목이고 줄 높이는 제목 줄(.title)이 정한다. */
    display: inline-flex;
    align-items: center;
    /* 호스트 하한(--u-target-size)이 있으면 24px 대신 그 값까지 — 폭도 그 값 이상. */
    min-block-size: max(24px, var(--u-target-size, 0px));
    min-width: var(--u-target-size, 0px);
  }
  .back::before {
    content: '←';
    margin-inline-end: var(--u-space-3xs, 2px);
  }
  .back:hover {
    text-decoration: underline;
  }

  /* 상태 슬롯이 비어 있으면 자리를 차지하지 않는다 — 빈 배지 자리가 제목을 밀면
     같은 화면인데 제목 위치가 달라 보인다. */
  /* 빈 슬롯 래퍼는 접는다.
     ⚠**CSS ':has()' 로는 못 한다** — <slot> 자신이 자식 요소라 ':has(*)' 가 항상 참이다
     (실브라우저 테스트로 확인했다. 소스 검사와 jsdom 은 둘 다 통과시킨다).
     배정 상태는 'slotchange' 로 추적해 '.empty' 클래스로 내려온다 — internals/slotted.ts */
  .status.empty {
    display: none;
  }

  .actions {
    flex: 0 1 calc((640px - 100%) * 999);
    min-width: fit-content;
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
  }
  /* 빈 액션 래퍼는 접는다(슬롯 배정은 'slotchange' 로 추적 — internals/slotted.ts). */
  .actions.empty {
    display: none;
  }
`;
