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

  /*
   * 인쇄 — 오버레이 모드의 detail 은 host 전체를 덮는 절대배치 상자라, 높이가 master 내용에
   * 묶이고(그 밖은 잘린다) 닫기 버튼까지 종이에 찍힌다. 화면에 보이는 것(detail)을 흐름에
   * 되돌려 전부 인쇄한다 — 덮여 있던 master 는 찍지 않는다. detail 이 비어 있으면 master 가
   * 화면 그대로 인쇄된다(covered 는 detail 이 채워졌을 때만 붙는다).
   * 나란히 배치 모드는 바꾸지 않는다 — 두 판이 부모 높이를 따라 풀린다.
   *
   * 🔴**한 판만 보일 때는 flex 뼈대를 걷는다**(오버레이 모드 · detail 없음). flex 호스트와
   *   overflow: auto 판은 둘 다 독립 서식 문맥이라, 화면 마지막 블록의 아래 여백이 레이아웃
   *   «안» 에 갇혀 그만큼 높이가 는다 — 내용 끝이 쪽 경계에서 그 여백 이내에 있으면 여백만 담긴
   *   빈 꼬리 쪽이 찍힌다(router 아웃렛의 인쇄 수정과 같은 기전). 한 판뿐이면 flex 가 인쇄에서
   *   할 일이 없으므로 블록 흐름으로 돌려 여백이 문서 끝까지 접히게 한다(쪽 경계에서 잘린다).
   * ⚠**나란히 배치(detail 있음 · 오버레이 아님)는 원리적으로 가둔다** — 두 열은 flex 항목이고
   *   flex 항목은 항상 독립 서식 문맥이다. 화면에 보인 두 열을 그대로 찍는 것이 계약이다.
   * ⚠:state() 를 모르는 엔진에서는 그 선택자만 무효가 되도록 **규칙을 나눴다** — 선택자 목록에
   *   섞으면 목록 전체가 버려져 오버레이 규칙까지 사라진다.
   */
  @media print {
    :host([overlay]) {
      display: block;
      height: auto;
    }
    :host(:not(:state(detail))) {
      display: block;
      height: auto;
    }
    :host([overlay]) .master,
    :host([overlay]) .detail {
      overflow: visible;
    }
    :host(:not(:state(detail))) .master {
      overflow: visible;
    }
    .detail-close,
    :host([overlay]) .detail-close,
    :host([overlay]) .master.covered {
      display: none;
    }
    :host([overlay]) .detail {
      position: static;
      box-shadow: none;
    }
  }
`;
