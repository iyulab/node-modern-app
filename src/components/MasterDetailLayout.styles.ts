import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    position: relative;
    min-width: 0;
    height: 100%;
    /* 부모(페이지 셸)가 높이를 정해 준다는 전제 — GroupBox/ActionBar 와 달리 이 컴포넌트는
       "화면을 채우는 셸"이 역할이라 자기 높이를 스스로 갖지 않는다. */
  }

  .master {
    flex: 0 0 var(--_master-size, 22rem);
    min-width: 0;
    overflow: auto;
  }

  /* 좁을 때(자기 폭 기준, JS 로 잰 'overlay' 속성 — @container 아님, 클래스 상단 주석 참조):
     master 가 전체 폭을 채운다. detail 은 그 위 오버레이로 뜬다. */
  :host([overlay]) .master {
    flex: 1 1 auto;
  }

  .divider {
    flex: 0 0 auto;
    width: 0;
    border-left: 1px solid var(--u-border-color-weak, #EEEEEE);
  }
  /* detail 이 비어 있으면 나눌 것이 없다 — 슬롯 배정은 slotchange 로 추적한다
     (internals/slotted.ts). ⚠CSS :has() 로는 못 한다: <slot> 자신이 자식이라 :has(*) 가
     항상 참이다. */
  .divider.empty,
  :host([overlay]) .divider {
    display: none;
  }

  .detail {
    flex: 1 1 auto;
    min-width: 0;
    position: relative;
    overflow: auto;
  }
  .detail.empty {
    display: none;
  }

  /* 오버레이 모드: detail 이 master 위에 뜬다. master 의 flex-basis 를 넘겨받으므로
     master 를 가리는 만큼만 자리를 차지하면 된다 — inset:0 로 host 전체를 덮는다. */
  :host([overlay]) .detail {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: var(--u-panel-bg-color, #FFFFFF);
    box-shadow: var(--u-shadow-lg, 0 4px 12px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.06));
  }

  /* 작은 닫기 버튼 — 오버레이 모드에서만 보인다. 나란히 배치될 때는 detail 이 이미
     제자리(패널)라 닫을 이유가 없다 — "구조적 기능"의 범위를 오버레이 전환 자체로 좁힌다. */
  .detail-close {
    display: none;
    position: absolute;
    top: var(--u-space-sm, 8px);
    right: var(--u-space-sm, 8px);
    z-index: 2;
  }
  :host([overlay]) .detail-close {
    display: inline-flex;
  }
`;
