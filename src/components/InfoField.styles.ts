import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    min-width: 0;
  }

  .label {
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weak, #757575);
    margin-bottom: var(--u-space-3xs, 2px);
  }

  .value {
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-label-weight, 600);
    line-height: var(--u-text-body-leading, 1.6);
    color: var(--u-txt-color, #212121);
    /* 긴 값(주소·비고)이 그리드 열을 밀어내지 않게 한다. */
    overflow-wrap: anywhere;
  }

  .value.numeric {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  :host([size="lg"]) .value {
    font-size: var(--u-text-title-size, 20px);
    font-weight: var(--u-text-title-weight, 700);
  }

  /* "아직 없음"은 값보다 약하게 — 다만 **읽을 수 있어야 한다.**
     ⚠더 흐리게 만들고 싶은 유혹이 있는데, 이 자리가 안 읽히면 사용자는 빈 칸인지
     로딩 중인지 구별하지 못한다. */
  .value.blank {
    color: var(--u-txt-color-weak, #757575);
    font-weight: var(--u-text-body-weight, 400);
  }
`;
