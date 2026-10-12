import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    /* 카드 = 떠 있는 컨테이너(--u-panel-bg-color) — u-card 와 같은 면·반경·선이다.
       페이지는 --u-canvas-bg-color 위에 있으므로 카드는 바탕보다 한 단 밝은 면으로 선다
       (종전에는 페이지가 흰색이라 카드를 크롬 틴트 --u-bg-color-raised 로 칠해 구분했다). */
    background-color: var(--u-panel-bg-color, #FFFFFF);
    border: 1px solid var(--u-border-color, #E0E0E0);
    border-radius: var(--u-radius-xl, 8px);
    box-shadow: var(--u-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.04));
  }

  /* 🔴**크기 containment 를 두지 않는다**(container-type 없음 — 호스트에도 섀도 안에도). 카드가 «자기 폭» 으로
     접히는 판단은 아래 헤더의 고유 크기 배치(flex-basis 임계)가 한다. 컨테이너를 호스트에 두었을 때도, 섀도 안
     상자로 옮겼을 때도, 형제 «fieldset disabled» 전환이나 위쪽 블록 삽입과 같은 커밋 뒤 카드가 높이 2px(테두리뿐)로
     접힌 채 남는 Chromium 실측 보고가 있었다 — 강제 재배치로만 돌아왔고 containment 를 걷으면 생기지 않았다.
     슬롯 내용도 이 카드를 질의 컨테이너로 삼지 않는다 — 하우스 격자는 컨테이너 없이 선다. */

  /* 좁을 때(헤더 안쪽 폭 = 카드 480px − 좌우 여백): 툴바(검색·필터)가 제목 아래로 내려가고 폭을 채운다.
     ⚠**제목과 툴바가 한 줄에 남으면 둘 다 읽히지 않는다** — 제목은 잘리고 입력은 손가락보다 좁아진다.
     초안(R4)이 *"좁은 화면에서 접히는 규칙을 라이브러리가 정한다"* 로 요구한 것이 이 자리다.
     ★임계는 제목의 flex-basis 가 건다: calc((임계 − 100%) × 999) 는 넓으면 음수(→ 0), 좁으면 매우 커져
     제목이 한 줄을 혼자 차지한다(«Holy Albatross»). 제목은 남는 폭을 거의 다(9999) 받아 넓을 때 툴바를
     오른쪽에 둔다. 툴바는 1 만 받아 넓을 때는 내용 폭, 혼자 남은 줄에서는 폭을 채운다. */
  .header {
    display: flex;
    flex-wrap: wrap;
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

  /* 제목과 설명 한 줄을 세로로 묶는다 — 액션은 그 오른쪽에 선다. */
  .titles {
    flex: 9999 1 calc((480px - 2 * var(--u-space-xl, 20px) - 100%) * 999);
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--u-space-3xs, 2px);
  }

  .title {
    margin: 0;
    min-width: 0;
    font-size: var(--u-text-subtitle-size, 16px);
    font-weight: var(--u-text-subtitle-weight, 600);
    line-height: var(--u-text-subtitle-leading, 1.5);
    letter-spacing: var(--u-text-subtitle-tracking, 0);
    color: var(--u-txt-color, #212121);
  }
  /* 제목 옆 보조 메타(건수·진척) — 제목보다 한 단 아래. 헤딩 안의 인라인이라 기준선을 공유하고,
     접근성 이름에도 함께 읽힌다. 숫자가 바뀌어도 폭이 흔들리지 않게 고정폭 숫자. */
  .meta {
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-body-weight, 400);
    color: var(--u-txt-color-weak, #616161);
    font-variant-numeric: tabular-nums;
  }

  .description {
    margin: 0;
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weak, #616161);
  }

  /* 제목 없이 설명만 있으면 빈 헤딩이 자리를 잡지 않는다. */
  .title:empty {
    display: none;
  }

  .actions {
    flex: 1 0 auto;
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
