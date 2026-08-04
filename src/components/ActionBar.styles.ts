import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    padding: var(--u-space-md, 12px) 0;
    /* 자기 폭으로 접힌다 — 아래 질의의 기준. 화면 폭이 아니라 자기 상황을 본다.
       ⚠**컨테이너는 «자손»을 위한 것이다** — @container 안에서 :host 자신을 겨냥하면
       그 질의는 이 호스트가 아니라 **바깥의 다른 컨테이너**를 본다(실측으로 밟았다:
       360px 에서 접히지 않았다). 그래서 줄바꿈 자체는 여기서 항상 허용하고, 좁을 때의
       «폭 채우기»만 자손 규칙으로 건다. */
    flex-wrap: wrap;
    container-type: inline-size;
  }

  /* 위험 액션(삭제 등)은 **왼쪽 끝**, 주 액션은 오른쪽 끝.
     ★같은 무리에 두면 «저장»을 누르려다 «삭제»를 누른다 — 거리가 안전장치다.
     초안(R4)이 *"위험 액션은 시각적으로 분리"* 로 요구한 것이 이 배치다. */
  .danger {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    margin-right: auto;
  }
  /* 빈 슬롯 래퍼는 접는다 — 슬롯 배정은 slotchange 로 추적한다(internals/slotted.ts).
     ⚠CSS :has() 로는 못 한다: <slot> 자신이 자식이라 :has(*) 가 항상 참이다. */
  .danger.empty {
    display: none;
  }

  .main {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    margin-left: auto;
  }

  /* 화면 하단에 고정 — 긴 폼에서 저장 버튼을 찾아 스크롤하지 않아도 된다. */
  :host([sticky]) {
    position: sticky;
    bottom: 0;
    background-color: var(--u-bg-color, #FFFFFF);
    border-top: 1px solid var(--u-border-color-weak, #EEEEEE);
    padding: var(--u-space-md, 12px);
    margin: 0 calc(-1 * var(--u-space-md, 12px));
  }

  /* 좁을 때: 두 무리가 각자 한 줄을 차지하고 주 액션이 위로 온다.
     ⚠주 액션을 아래에 두면 위험 액션이 엄지 위치에 온다 — 순서를 뒤집는 이유다. */
  @container (max-width: 420px) {
    .main {
      order: -1;
      width: 100%;
      margin-left: 0;
    }
    .danger {
      width: 100%;
      margin-right: 0;
    }
  }
`;
