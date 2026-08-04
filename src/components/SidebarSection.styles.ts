import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 8px 12px 4px;
  }

  /* ⚠아래 두 색만 팔레트를 직접 읽는다 — 시맨틱 토큰으로 옮기면 대비가 무너지기 때문이다.
     섹션 제목·부제는 본문(neutral-800)보다 약한 3단 위계를 이루는데, 역할 층의 보조
     텍스트 단은 --u-txt-color-weak 하나뿐이고 그 값은 흰 배경에서 2.68:1 이라
     WCAG AA(4.5:1)에 미달한다. 현행 두 값은 6.19:1 · 4.61:1 로 통과한다.
     ⇒ 역할 층에 AA 를 넘는 보조 텍스트 단이 생기면 그때 옮긴다. */
  /*
   * ★크기·굵기·자간은 스케일의 단으로 옮겼다(용도 배정 — DL-157-4). 위 주석은 **색**에
   *   대한 것이고 그대로 유효하다: 두 색은 여전히 팔레트를 직접 읽는다.
   * ⚠ overline 에 대문자 변환을 붙이지 않는다 — 이 줄에 ellipsis 가 있어 잘림이 늘고,
   *   섹션 이름은 소비자가 쓴 글자다(CJK 에는 효과도 없다).
   */
  .title {
    color: var(--u-neutral-700, #616161);
    font-size: var(--u-text-overline-size, 11px);
    font-weight: var(--u-text-overline-weight, 700);
    line-height: var(--u-text-overline-leading, 1.45);
    letter-spacing: var(--u-text-overline-tracking, 0.06em);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    color: var(--u-neutral-600, #757575);
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
  }

  .items {
    display: flex;
    flex-direction: column;
  }
`;