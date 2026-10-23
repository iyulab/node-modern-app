import { css } from 'lit';

export const styles = css`
  /* 호스트는 자리만 잡고 상자(여백 · 테두리 · 간격)는 섀도 안 .base 가 그린다 — 캡슐화 문맥이 다르면 문서 쪽 normal
     선언이 :host 를 이기므로, 문서의 전역 리셋(Tailwind preflight 류)이 호스트에 둔 여백 · 테두리를 지운다. */
  :host {
    display: block;
  }

  .base {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    padding: var(--u-space-md, 12px) var(--action-bar-padding-inline, 0);
    /* 자기 폭(420px 미만)으로 접힌다 — 두 무리가 각자 한 줄을 차지하고 **주 액션이 위로** 온다.
       ⚠주 액션을 아래에 두면 위험 액션이 엄지 위치에 온다. 순서는 wrap-reverse 가 뒤집는다: 첫 줄(위험)이
       아래, 다음 줄(주)이 위. 한 줄일 때는 그대로 «위험 왼쪽 · 주 오른쪽» 이다.
       임계는 크기 containment(@container)가 아니라 두 무리의 flex-basis 가 건다(«Holy Albatross» — u-group-box
       머리말 주석의 근거와 같다). */
    flex-wrap: wrap-reverse;
  }

  /* 넓으면 basis 0 → 최소 폭(fit-content = 내용 폭)으로, 좁으면 basis 가 매우 커져 각자 한 줄을 채운다. */
  .danger,
  .main {
    flex: 0 1 calc((420px - 100%) * 999);
    min-width: fit-content;
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

  /* 주 액션이 무엇을 할지 말하는 글 — 위험 액션 뒤에서 남는 폭을 채운다(넓을 때 basis 0 · grow 1). 좁으면
     다른 무리처럼 한 줄을 차지한다. 조용한 글이라 라벨 단의 약한 글자색. */
  .summary {
    flex: 1 1 calc((420px - 100%) * 999);
    min-width: 0;
    font-size: var(--u-text-label-size, 13px);
    color: var(--u-txt-color-weak, #616161);
  }
  .summary.empty {
    display: none;
  }

  .main {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    margin-left: auto;
  }

  /* 화면 하단에 고정 — 긴 폼에서 저장 버튼을 찾아 스크롤하지 않아도 된다.

     🔴**음수 마진으로 «가장자리까지 늘리는» 것을 하지 않는다.** 첫 판이
     margin: 0 calc(-1 * var(--u-space-md, 12px)) 로 좌우를 넘겼는데, 그것은
     ***부모가 정확히 그만큼의 가로 패딩을 갖고 있다***고 가정하는 것이다. 실측에서
     그 가정이 깨졌다 — 샘플 화면에서 좌우 12px 씩 넘쳐 **가로 스크롤바가 생기고
     주 액션(저장)이 잘렸다.** 라이브러리가 소비자의 여백을 알 수는 없다.
     ⚠이 주석에 백틱을 쓰지 말 것 — css 태그드 템플릿을 그 자리에서 끝낸다. */
  :host([sticky]) {
    position: sticky;
    bottom: 0;
    background-color: var(--u-bg-color, #FFFFFF);
  }
  :host([sticky]) .base {
    border-top: 1px solid var(--u-border-color-weak, #EEEEEE);
  }
`;
