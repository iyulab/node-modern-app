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

  /* 섹션 제목·부제는 본문보다 약한 두 단이다 — 제목 = 보조 글자(--u-txt-color-weak),
     부제 = 3단 글자(--u-txt-color-weaker, components 2.0). 종전에는 역할 층에 AA 를 넘는
     3단이 없어 팔레트(neutral-700/600)를 직접 읽었고, 그래서 테마가 이 두 줄에 닿지 않았다. */
  /*
   * ★크기·굵기·자간은 스케일의 단으로 옮겼다(용도 배정).
   * ⚠ overline 에 대문자 변환을 붙이지 않는다 — 이 줄에 ellipsis 가 있어 잘림이 늘고,
   *   섹션 이름은 소비자가 쓴 글자다(CJK 에는 효과도 없다).
   */
  .title {
    color: var(--u-txt-color-weak, #616161);
    font-size: var(--u-text-overline-size, 11px);
    font-weight: var(--u-text-overline-weight, 700);
    line-height: var(--u-text-overline-leading, 1.45);
    letter-spacing: var(--u-text-overline-tracking, 0.06em);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    color: var(--u-txt-color-weaker, #757575);
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
  }

  .items {
    display: flex;
    flex-direction: column;
  }
`;