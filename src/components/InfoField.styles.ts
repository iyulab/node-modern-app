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
    color: var(--u-txt-color-weak, #616161);
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

  /* 고정폭 숫자만 — 정렬은 건드리지 않는다. 이 요소는 표의 칸이 아니라 라벨-값 한 쌍이라
     세로로 맞출 이웃 숫자가 없다. 우정렬하면 값이 라벨에서 칸 반대편으로 밀려날 뿐이다.
     표처럼 열을 맞춰야 하는 배치라면 소비자가 ::part(value) 로 정렬한다. */
  .value.numeric {
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
    color: var(--u-txt-color-weak, #616161);
    font-weight: var(--u-text-body-weight, 400);
  }

  /* size="lg" 보다 우선해야 한다 — blank 는 lg 모드에서도 계속 de-emphasize 상태를 유지해야 한다.
     크기도 본문 단으로 내린다: blank 문구가 «값을 낼 수 없는 사유» 문장일 수 있고, 제목 단에서는
     타일에 담기지 않는다. 대신 값 줄의 높이는 지켜 한 줄에 놓인 타일들의 높이가 갈리지 않게 한다
     (lg 값 줄 = 제목 크기 × 본문 행간 — 위 .value 가 행간을 본문 단에 두기 때문이다). */
  :host([size="lg"]) .value.blank {
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-body-weight, 400);
    min-height: calc(var(--u-text-title-size, 20px) * var(--u-text-body-leading, 1.6));
  }

  /* 단위는 값보다 한 단 아래 — 크기·굵기·색 셋을 함께 낮춰야 KPI 숫자가 강조를 지킨다.
     이 세트를 소비자가 기억해 되돌리게 두면 한 곳이라도 빠진 자리에서 단위가 숫자만큼 커진다. */
  .unit {
    margin-inline-start: 0.25em;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-body-weight, 400);
    color: var(--u-txt-color-weak, #616161);
  }

  /* tone은 trend 유무와 무관하게 값 텍스트 자체에도 적용된다(neutral은 무규칙 — 기본
     .value 색과 시각적으로 같은 자리라 별도 규칙을 두면 오히려 "옅어 보이는" 부작용이
     생긴다, .trend.tone-neutral과 달리 .value는 이미 강한 색이 기본값이다). */
  .value.tone-positive {
    color: var(--u-success-color-strong, #1B5E20);
  }

  .value.tone-negative {
    color: var(--u-danger-color-strong, #C62828);
  }

  .trend {
    font-size: var(--u-text-caption-size, 12px);
    margin-top: var(--u-space-3xs, 2px);
  }

  .trend.tone-positive {
    color: var(--u-success-color-strong, #1B5E20);
  }

  .trend.tone-negative {
    color: var(--u-danger-color-strong, #C62828);
  }

  .trend.tone-neutral {
    color: var(--u-txt-color-weak, #616161);
  }
`;
