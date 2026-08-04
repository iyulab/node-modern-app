import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    align-items: flex-start;
    gap: var(--u-space-md, 12px);
    flex-wrap: wrap;
    margin-bottom: var(--u-space-2xl, 24px);
    /* 아래 @container 질의의 기준 — 이 컴포넌트는 «화면»이 아니라 «자기 폭»으로 접힌다. */
    container-type: inline-size;
  }

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
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weak, #757575);
  }

  .back {
    flex: 0 0 auto;
    align-self: center;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
    color: var(--u-link-txt-color, #1565C0);
    text-decoration: none;
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
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    margin-left: auto;
  }
  /* 빈 액션 래퍼는 접는다(슬롯 배정은 'slotchange' 로 추적 — internals/slotted.ts). */
  .actions.empty {
    display: none;
  }

  /* 좁을 때: 액션이 제목 아래로 내려가고 **왼쪽 정렬**이 된다.
     ★오른쪽 정렬을 유지하면 손가락이 닿기 어려운 쪽으로 몰린다.

     🔴**«화면»이 아니라 «자기 폭»을 본다(@container).** 종전에는 @media 였고, 그러면
     이 프리미티브가 **자기가 얼마나 좁은지와 무관하게** 접혔다 — 셸 안에서 사이드바가 열려
     본문이 500px 인 1280px 화면에서는 접히지 않고, 반대로 넓은 본문을 가진 좁은 화면에서는
     불필요하게 접혔다. 컴포넌트가 스스로 판단할 수 있는 것은 **자기 컨테이너 폭**뿐이다.
     ⚠container-type: inline-size 는 인라인 축 containment 를 만든다 — 이 호스트는 블록
     레벨이고 자식이 호스트 폭에 기대므로 무해하다(폭별 회귀 테스트가 감시한다). */
  @container (max-width: 640px) {
    .actions {
      margin-left: 0;
      width: 100%;
    }
  }
`;
