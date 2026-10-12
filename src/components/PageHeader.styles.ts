import { css } from 'lit';

export const styles = css`
  :host {
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
  .heading {
    flex: 1 1 auto;
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
    /* 타깃 크기(WCAG 2.2 SC 2.5.8) — 줄 상자(1lh)에서 모자란 만큼만 패딩으로 채워 누를 면을 24px 로 만들고,
       같은 크기의 음수 여백으로 그 공간을 돌려준다 — 배치는 움직이지 않는다.
       ⚠고정 패딩(4px)이면 안 된다: line-height: normal 의 높이는 글꼴 메트릭이 정해서 글꼴에 따라 17px(→25)도
       15px(→23)도 된다. 줄 상자가 이미 24px 이상이면 패딩은 0 이다. */
    display: inline-block;
    /* 호스트 하한(--u-target-size)이 있으면 24px 대신 그 값까지 — 폭도 그 값 이상. */
    --_back-pad: max(0px, calc((max(24px, var(--u-target-size, 0px)) - 1lh) / 2));
    padding-block: var(--_back-pad);
    margin-block: calc(-1 * var(--_back-pad));
    min-width: var(--u-target-size, 0px);
  }
  .back::before {
    content: '←';
    margin-right: var(--u-space-3xs, 2px);
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
