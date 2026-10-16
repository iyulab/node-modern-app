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

  /* 한눈에 읽는 숫자 — 대시보드 · 상세 화면 지표 타일. 행간은 글자에 붙인다(제목 단 이상에서 본문 행간은 너무 벌어진다). */
  :host([size="xl"]) .value {
    font-size: var(--info-field-xl-size, var(--u-text-display-size, 26px));
    font-weight: var(--u-text-display-weight, 700);
    line-height: var(--u-text-display-leading, 1.4);
    letter-spacing: var(--u-text-display-tracking, -0.02em);
  }

  /* 타일 — 지표 격자의 한 칸. 면 · 테두리 · 반경 · 안쪽 여백을 테마 토큰으로(격자의 간격은 담는 쪽 몫). */
  :host([appearance="tile"]) {
    padding: var(--u-space-md, 12px);
    border: 1px solid var(--u-border-color, #E0E0E0);
    border-radius: var(--u-radius-xl, 8px); /* 카드 면과 같은 단(u-card · u-group-box) */
    background-color: var(--u-bg-color, #FFFFFF);
    box-sizing: border-box;
  }
  /* 상태 타일 — 면과 테두리가 그 상태를 말한다(글자색만으로는 격자에서 눈에 띄지 않는다). neutral 은 무규칙. */
  :host([appearance="tile"][tone="warning"]) {
    background-color: var(--u-warning-bg-color, #FFF59D);
    border-color: var(--u-warning-color-weak, #FFEB3B);
  }
  :host([appearance="tile"][tone="negative"]) {
    background-color: var(--u-danger-bg-color, #FFEBEE);
    border-color: var(--u-danger-color-weak, #F44336);
  }
  :host([appearance="tile"][tone="positive"]) {
    background-color: var(--u-success-bg-color, #E8F5E9);
    border-color: var(--u-success-color-weak, #4CAF50);
  }
  @media (forced-colors: active) {
    :host([appearance="tile"]) { border-color: CanvasText; }
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
  :host([size="xl"]) .value.blank {
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-body-weight, 400);
    min-height: calc(var(--info-field-xl-size, var(--u-text-display-size, 26px)) * var(--u-text-display-leading, 1.4));
  }
  /* 사유가 아래 줄에 따로 있으면 값 줄의 자리표시(—)는 짧은 기호다 — 값 크기 그대로 두어 격자의 숫자들과 같은 줄에 선다. */
  :host([size="lg"]) .value.blank.reasoned {
    font-size: var(--u-text-title-size, 20px);
  }
  :host([size="xl"]) .value.blank.reasoned {
    font-size: var(--info-field-xl-size, var(--u-text-display-size, 26px));
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

  .value.tone-warning {
    color: var(--u-warning-color-strong, #8A4A00);
  }

  .trend {
    font-size: var(--u-text-caption-size, 12px);
    margin-top: var(--u-space-3xs, 2px);
  }
  /* 상태 표시는 글자 앞에서 한 칸 띄워, 글자 높이 가운데에. */
  ::slotted([slot="trend-icon"]) {
    margin-inline-end: 0.3em;
    vertical-align: -0.125em;
  }

  /* 보조 줄 — 라벨보다 한 단 더 약하게(값 → 추세 → 근거 순으로 읽힌다). */
  .description {
    font-size: var(--u-text-caption-size, 12px);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weaker, #757575);
    margin-top: var(--u-space-3xs, 2px);
  }

  .trend.tone-positive {
    color: var(--u-success-color-strong, #1B5E20);
  }

  .trend.tone-negative {
    color: var(--u-danger-color-strong, #C62828);
  }

  .trend.tone-warning {
    color: var(--u-warning-color-strong, #8A4A00);
  }

  .trend.tone-neutral {
    color: var(--u-txt-color-weak, #616161);
  }
`;
