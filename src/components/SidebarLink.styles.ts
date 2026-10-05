import { css } from 'lit';

export const styles = css`
  :host {
    /* 활성 배경의 단일 원천. 소비자는 셸 계약 토큰(--app-sidebar-active-bg) 또는
       역할 토큰(--u-primary-color) 어느 쪽을 덮어도 hover 파생까지 함께 따라온다.
       팔레트(--u-blue-600)를 직접 읽으면 브랜드를 바꾸려는 소비자가 "진짜 파랑"이
       필요한 배지·차트까지 함께 오염시키는 길밖에 없다. */
    --link-active-bg: var(--app-sidebar-active-bg, var(--u-primary-color, #1976D2));

    display: block;
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
    background-color: transparent;
    border-radius: var(--app-sidebar-item-radius, 8px);
    transition: all var(--u-duration-normal, 220ms) ease;
    cursor: pointer;
  }
  :host(:hover) {
    color: var(--u-txt-color-hover, #1565C0);
    background-color: var(--u-bg-color-hover, #F5F5F5);
  }
  :host([selected]) {
    color: var(--app-sidebar-active-fg, var(--u-txt-color-inverse, #FFFFFF));
    background-color: var(--link-active-bg);
    box-shadow: var(--app-sidebar-active-shadow, 0 1px 3px var(--u-shadow-color-weak, rgba(0, 0, 0, 0.08)));
  }
  :host([selected]:hover) {
    color: var(--app-sidebar-active-fg, var(--u-txt-color-inverse, #FFFFFF));
    background-color: color-mix(in srgb, var(--link-active-bg) 85%, black);
    box-shadow: var(--app-sidebar-active-shadow-hover, 0 2px 6px var(--u-shadow-color-normal, rgba(0, 0, 0, 0.12)));
  }
  
  .container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--app-sidebar-item-gap, 12px);
    padding: var(--app-sidebar-item-padding, 8px 12px);
    /* 호스트 하한(--u-target-size, 미설정 = 0). */
    box-sizing: border-box;
    min-height: var(--u-target-size, 0px);
  }
  .container[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }

  u-icon {
    flex-shrink: 0;
    color: var(--link-icon-color, inherit);
    font-size: var(--app-sidebar-icon-size, 20px);
  }
  /* Selected always wins over any consumer-supplied --link-icon-color — a
   * high-contrast icon on the active background matters more than a brand tint. */
  :host([selected]) u-icon {
    color: var(--app-sidebar-active-icon-color, var(--app-sidebar-active-fg, var(--u-txt-color-inverse, #FFFFFF)));
  }

  /* 활성 표시 막대 — 시작 변(좌→우 언어에서 왼쪽). 기본 색은 활성 면과 같아 보이지 않는다(기본 외형 불변).
     밝은 활성 면처럼 면 색만으로 현재 위치를 말하지 않는 셸이 위치를 한 번 더 표시하는 자리다. */
  :host([selected]) .container::before {
    content: '';
    position: absolute;
    inset-block: 6px;
    inset-inline-start: 0;
    width: var(--app-sidebar-active-indicator-width, 3px);
    border-radius: var(--u-radius-pill, 9999px);
    background: var(--app-sidebar-active-indicator-color, var(--app-sidebar-active-bg, var(--u-primary-color, #1976D2)));
  }

  /*
   * ★내비 항목은 «대상의 짧은 이름» = label 단이다(용도 배정).
   * ⚠행 높이는 바뀌지 않는다: 13 x 1.5 = 19.5px < 아이콘 20px 이라 행을 잡는 것은
   *   여전히 아이콘이다. 접힌 사이드바(아이콘만)와 펼친 사이드바의 행 높이가 같아야 한다.
   */
  span {
    flex: 1;
    font-size: var(--u-text-label-size, 13px);
    line-height: var(--u-text-label-leading, 1.5);
    font-weight: var(--u-text-label-weight, 600);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * 접힌 상태의 라벨 - 시각적으로만 숨긴다. 접근성 트리에는 남아 항목의 이름이 된다
   * (hidden 은 트리에서도 빼서 이름 없는 항목을 만들었다). 절대배치라 flex 배치와 gap 에 끼지 않는다.
   */
  /* 새 창 알림 — 화면에는 없고 링크의 접근성 이름에만 붙는다(KWCAG 7.2.1). */
  .new-tab-hint,
  [part~='label'][compact] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* 건수 — 라벨 끝, 숫자는 표 숫자처럼 자릿수가 흔들리지 않게. 접힌 사이드바에서는 라벨처럼
     시각적으로만 숨긴다(접근 가능한 이름에는 남는다). */
  .count {
    flex: none;
    margin-inline-start: auto;
    font-size: var(--u-text-overline-size, 11px);
    font-weight: var(--u-text-caption-weight, 400);
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
  .count[compact] {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
