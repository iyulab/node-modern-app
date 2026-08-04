import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    /* 아래 @container 질의의 기준 — 카드는 «화면»이 아니라 «자기 폭»으로 접힌다.
       사이드바가 열린 1280px 화면의 좁은 본문에서도, 넓은 본문을 가진 태블릿에서도
       같은 판단을 하려면 기준이 자기 폭이어야 한다. */
    container-type: inline-size;
    background-color: var(--u-panel-bg-color, #FFFFFF);
    border: 1px solid var(--u-border-color-weak, #EEEEEE);
    /* 면(surface) 단 — 컨트롤과 같은 반경을 쓰면 큰 사각형이 각져 보인다. */
    border-radius: var(--u-radius-2xl, 12px);
    box-shadow: var(--u-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.04));
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    padding: var(--u-space-xl, 20px) var(--u-space-xl, 20px) 0;
  }
  /* 제목도 액션도 없으면 헤더를 접는다. ★DOM 에서 빼지 않고 접는 이유 =
     슬롯 배정을 'slotchange' 로 알아야 하는데, 슬롯이 렌더되지 않으면 그 이벤트가
     영영 오지 않는다(자식을 나중에 붙이는 소비자가 헤더를 못 얻는다). */
  .header.empty {
    display: none;
  }

  .header.divider {
    padding-bottom: var(--u-space-md, 12px);
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
  }

  .title {
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
    font-size: var(--u-text-subtitle-size, 16px);
    font-weight: var(--u-text-subtitle-weight, 600);
    line-height: var(--u-text-subtitle-leading, 1.5);
    letter-spacing: var(--u-text-subtitle-tracking, 0);
    color: var(--u-txt-color, #212121);
  }

  .actions {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
  }
  /* 빈 슬롯 래퍼는 접는다.
     ⚠**CSS ':has()' 로는 못 한다** — <slot> 자신이 자식 요소라 ':has(*)' 가 항상 참이다
     (실브라우저 테스트로 확인했다. 소스 검사와 jsdom 은 둘 다 통과시킨다).
     배정 상태는 'slotchange' 로 추적해 '.empty' 클래스로 내려온다 — internals/slotted.ts */
  .actions.empty {
    display: none;
  }

  /* 🔴**본문은 세로 흐름이고, 그 리듬을 여기서 정한다.**
     종전에는 padding 만 있어 블록 자식이 **간격 없이 붙었고**, 그보다 나쁘게는
     shrink-to-fit 요소들이 각자 다른 폭으로 앉아 **왼쪽 끝이 어긋났다**(실측: 알림 넷을
     나란히 두면 계단처럼 내려갔다). 소비자가 그것을 고치려면 자기 CSS 를 쓰게 되고,
     그 순간 이 패키지가 존재하는 이유가 사라진다.
     ⇒ flex column + gap. 자식은 폭을 채우고 간격은 토큰이 정한다. */
  .body {
    padding: var(--u-space-xl, 20px);
    display: flex;
    flex-direction: column;
    gap: var(--u-space-md, 12px);
  }

  /* 좁을 때: 헤더의 툴바(검색·필터)가 제목 아래로 내려가고 폭을 채운다.
     ⚠**제목과 툴바가 한 줄에 남으면 둘 다 읽히지 않는다** — 제목은 잘리고 입력은
     손가락보다 좁아진다. 초안(R4)이 *"좁은 화면에서 접히는 규칙을 라이브러리가 정한다"*
     로 요구한 것이 이 자리다. 480px 는 «제목 + 입력»이 함께 설 수 있는 하한이다. */
  @container (max-width: 480px) {
    .header {
      flex-wrap: wrap;
    }
    .actions {
      width: 100%;
    }
  }
  /* 표를 카드 가장자리까지 붙일 때. 헤더가 있으면 위 여백만 남긴다 —
     0 으로 만들면 제목과 표가 붙어 읽기 어려워진다. */
  .body.flush {
    padding: 0;
  }
  /* 헤더가 접혀 있으면 위 여백도 없다 — 인접 선택자는 'display:none' 을 보지 못하므로
     클래스로 갈라야 한다. */
  .header:not(.empty) + .body.flush {
    padding-top: var(--u-space-md, 12px);
  }
`;
