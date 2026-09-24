import { css } from "lit";

export const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    font-family: var(--u-font-base);
    overflow: hidden;
  }
  :host([state="mobile"]),
  :host([state="mobile-open"]) {
    flex-direction: column;
  }

  .logo {
    color: var(--u-txt-color, #212121);
    font-size: 24px;
    cursor: pointer;
  }
  .logo:hover {
    color: var(--u-txt-color-hover, #1565C0);
  }
  img.logo {
    height: 24px;
    width: auto;
    object-fit: contain;
  }
  /* 로고를 감싼 링크 — 인라인 기준선 여백이 생기지 않게 로고 상자에 딱 맞춘다. */
  .logo-link {
    display: inline-flex;
    align-items: center;
  }

  /*
   * ★단 배정은 «관측값 근사»가 아니라 «용도»로 한다 — 이 자리는 앱의 제목이다.
   *   종전 18px 은 스케일에 없는 값이었고, 같은 판정을 이미 u-dialog·u-drawer 제목에
   *   내린 적이 있다(L2-3, 18px → subtitle).
   * ⚠줄 박스는 바뀌지 않는다: 16 x 1.5 = 24px = 종전 line-height. 헤더 높이 불변.
   */
  .title {
    flex: 1;
    color: var(--u-txt-color, #212121);
    font-size: var(--u-text-subtitle-size, 16px);
    line-height: var(--u-text-subtitle-leading, 1.5);
    font-weight: var(--u-text-subtitle-weight, 600);
    letter-spacing: var(--u-text-subtitle-tracking, 0);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * 토글러의 "테두리·배경 없음"은 마크업의 variant="ghost" 가 낸다.
   *
   * ★여기에 border/background 를 적는 것으로는 부족했다 — 이 규칙은 <u-button> **호스트**에만
   *   닿고, 테두리를 실제로 그리는 것은 그 섀도 루트 안의 <button> 이다(solid 기본값이
   *   --btn-border-color: var(--btn-color) 로 그린다). 호스트만 재면 0px 이라 보이지도 않았다.
   *   variant 를 명시해 컴포넌트가 스스로 투명하게 그리도록 한다.
   *
   * color: inherit 는 유지한다 — 헤더 색을 따라가게 하려는 의도이고 ghost 의 기본 전경
   * (--u-txt-color)보다 이 레이아웃의 뜻이 앞선다.
   */
  .toggler {
    color: inherit;
    font-size: 20px;
    padding: 0px;
  }
  .toggler:hover {
    color: var(--u-txt-color-hover, #1565C0);
  }

  /* Sidebar Container */
  .sidebar {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
    /* --u-panel-bg-color 가 아니라 --u-bg-color-raised — 사이드바는 카드·메뉴류의
       "떠 있는 패널"이 아니라 상시 크롬이고, 그 구분이 정확히 두 토큰이 갈리는 지점이다
       (light.css 293~298행 참조). 미설정 시 페이지(--u-bg-color)와 같은 흰색으로 앉아
       사이드바·페이지·카드 삼중 무구분을 만들던 종전 폴백을 대체한다. */
    background: var(--app-sidebar-bg, var(--u-bg-color-raised, #FAFAFA));
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
    border-right: 1px solid var(--u-border-color, #E0E0E0);
    transition: all 0.3s ease;
  }
  /* Sidebar states */
  .sidebar[state="default"] {
    width: var(--app-sidebar-width, 260px);
  }
  .sidebar[state="slim"] {
    width: var(--app-sidebar-width-slim, 64px);
  }
  .sidebar[state="slim"] .sidebar-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  .sidebar[state="modal"] {
    width: var(--app-sidebar-width, 260px);
    position: absolute;
    top: 0;
    left: 0;
  }
  .sidebar[state="mobile"] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
  }
  .sidebar[state="mobile-open"] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(0);
  }

  /* Mobile Header */
  .mobile-header {
    position: relative;
    z-index: 1001;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    background: var(--app-header-bg, var(--u-bg-color-raised, #FAFAFA));
    color: var(--app-header-fg, var(--u-txt-color, #212121));
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
    user-select: none;
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
    user-select: none;
  }

  /* Sidebar Main Menu */
  .sidebar-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* Sidebar Footer */
  .sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border-top: 1px solid var(--u-border-color-weak, #EEEEEE);
  }
  .sidebar-footer:empty {
    display: none;
  }

  /* Main Content
   * ★기본 패딩을 준다 — 라우트 콘텐츠가 뷰포트/사이드바 경계에 그대로 맞닿아 모든
   *   소비자가 같은 배선을 재구현하던 문제였다. 값은 이 라이브러리의 spacing 스케일
   *   상단 근처(3xl)에서 골랐다 — LOB 화면의 표준 여백으로 쓰기에 과하지 않은 최대값.
   * ⚠«패딩 박스» 기준 절대배치는 이 padding 의 영향을 받지 않는다 — 바로 아래
   *   u-progress-bar 가 top/left/right:0 으로 여전히 테두리에 꽉 차게 붙는 이유다
   *   (CSS 2.1 §10.6.4: 절대배치 자손의 containing block 은 가장 가까운 positioned
   *   조상의 «패딩 박스»이고, 그 경계는 조상 자신의 padding 값에 밀리지 않는다).
   *   풀블리드를 원하는 소비자는 layout.styles.main = { padding: '0' } 로 되돌린다. */
  .main-region {
    position: relative;
    flex: 1;
    /* flex item 의 자동 최소 크기는 콘텐츠 기준(.main 의 min-content)이다 — 이 래퍼는
       overflow 가 visible 이라 그 하한이 그대로 살아, flex-shrink 가 있어도 셸 밖으로
       커진다. 그러면 .main 의 overflow: auto 가 한 번도 발동하지 않는다. 주축이 어느 쪽이든
       같은 원인이라 두 축을 함께 푼다:
         · 높이 — :host([state="mobile"]) 은 flex-direction: column 이라 min-height 가 필요하다.
           없으면 셸 전체가 콘텐츠 높이만큼 부풀어 오른다.
         · 너비 — 데스크톱(row)에서는 min-width 가 필요하다. 없으면 넓은 표 하나가 셸을
           뷰포트 밖으로 밀어 오른쪽 열이 잘리고 가로 스크롤도 생기지 않는다. */
    min-height: 0;
    min-width: 0;
  }

  .main {
    position: relative;
    height: 100%;
    padding: var(--u-space-3xl, 32px);
    background: var(--u-bg-color, #FFFFFF);
    overflow: auto;
    outline: none;
  }

  .main-content {
    height: 100%;
  }

  /*
   * 앱 수준 공지 스택 — 한 화면이 아니라 셸에 속한다.
   * 본문 맨 위 «흐름 안»에 둔다. 세 대안을 소비자가 먼저 실측해 기각했다:
   *   · fixed → 본문을 덮는다.
   *   · 셸 바깥 흐름 → 셸 높이에 더해져 이중 스크롤.
   *   · .main 안 sticky → 좁은 화면에서 공지 둘이 상시 3할을 점유한다. 배너는
   *     «막지 않는 것»이 값이라 상시 점유가 그 값을 깎는다.
   * .main-content 안에 있으므로 오버레이가 열리면 본문과 함께 inert 가 된다.
   * 폭은 스택이 정한다 — 공지(u-alert)는 자기 폭이 fit-content 라 문구 길이대로
   * 들쭉날쭉해진다. 배치 컨테이너의 결정이다.
   */
  .notices {
    display: flex;
    flex-direction: column;
    gap: var(--u-space-sm, 8px);
    margin-bottom: var(--u-space-lg, 16px);
  }
  .notices.empty {
    display: none;
  }
  slot[name="notice"]::slotted(*) {
    width: 100%;
    box-sizing: border-box;
  }

  /*
   * 오버레이가 열린 동안 «본문 영역»을 스태킹 컨텍스트로 만든다.
   *
   * 오버레이 틀은 z-index: 1 이고, 라우트 본문은 그보다 큰 z 를 일상적으로 쓴다 —
   * 데이터 그리드의 sticky 머리행·고정 열이 2~4 에 있다. .main 도 .main-region 도
   * 스태킹 컨텍스트를 만들지 않으므로 그것들과 오버레이 틀이 «같은 컨텍스트에서 직접
   * 겨루고», 본문이 이긴다 — 덮으라고 띄운 패널을 목록이 뚫고 나온다.
   *
   * ⚠값을 올리는 처방(z-index 를 50 으로)은 소비자의 z 어휘가 커지면 같은 경주를 다시
   *   한다. 경계를 세워야 한다.
   *
   * ⚠경계를 «어디에» 세우는가가 갈린다 — 넷을 픽셀 대조로 실측하고 골랐다:
   *     · .overlay 자신을 컨텍스트로 → 자기 z 는 여전히 1 이라 바깥에서 3 에게 진다. ✗
   *     · .main-region 을 컨텍스트로 → 본문과 오버레이를 «같은» 새 컨텍스트에 함께
   *       가두므로 그 안에서 순서가 그대로다. ✗
   *     · .main / .main-content 를 «상시» 컨텍스트로 → 오버레이는 이기지만 본문 안의
   *       position: fixed 팝오버가 사이드바(z 1000) 위로 못 올라간다(상시 동작 변경).
   *       .main 쪽은 셸 자신의 진행 막대(z 100)까지 오버레이 아래로 내린다. ✗
   *     · 이 규칙 — 오버레이가 열린 동안만 .main-content 를 컨텍스트로 → 세 축 모두 유지. ✓
   *
   * ⇒ 경계가 필요한 조건은 정확히 «오버레이가 열려 있다» 이고, 그때만 세운다. 닫혀 있으면
   *   겨룰 상대가 없다(.overlay.empty 는 display: none 이다).
   * ⚠ .main 이 아니라 .main-content 인 것도 의도다 — 가두는 대상은 «소비자의 라우트 본문»
   *   이지 셸 자신의 chrome 이 아니다. 진행 막대는 .main-content 밖(.main 직속)이라 이
   *   경계에 걸리지 않고, 오버레이가 열린 채로 일어나는 라우트 전환을 계속 보고한다.
   */
  :host(:state(overlay)) .main-content {
    isolation: isolate;
  }

  .main u-progress-bar {
    --progress-bar-height: 4px;
    --progress-bar-track-color: transparent;
    
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  .main u-progress-bar[visible] {
    opacity: 1;
    transform: translateY(0);
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    padding: var(--u-space-3xl, 32px);
    overflow: auto;
    background: var(--u-panel-bg-color, #FFFFFF);
  }
  .overlay.empty {
    display: none;
  }

  .overlay-close {
    position: absolute;
    top: var(--u-space-sm, 8px);
    right: var(--u-space-sm, 8px);
    z-index: 2;
  }

  /* Backdrop for modal mode */
  .backdrop {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--u-overlay-bg-color, rgba(0, 0, 0, 0.5));
  }

  /*
   * 인쇄 — 화면의 «뷰포트를 채우는 고정 상자 + 스크롤하는 본문» 모델을 풀어 준다.
   * 그대로 두면 사이드바가 종이에 찍히고, 본문이 스크롤 컨테이너라 첫 쪽 높이 밖이 잘린다.
   * ★!important 를 쓰지 않는다 — 섀도 안의 important 선언은 바깥 ::part 의 important 보다 이겨
   *   소비자가 인쇄물에 크롬을 되살릴 길(::part(sidebar) 재정의)을 막는다. 대가로 config.styles 의
   *   인라인 스타일은 이 규칙보다 앞선다(그 자리에 높이·overflow 를 적는 소비자는 드물다).
   * ⚠본문 패딩도 푼다 — 종이의 여백은 @page 가 준다. 화면 여백이 그 위에 겹치면 폭을 잃는다.
   */
  @media print {
    :host {
      display: block;
      height: auto;
      overflow: visible;
    }
    .sidebar,
    .mobile-header,
    .backdrop,
    .main u-progress-bar {
      display: none;
    }
    .main-region {
      height: auto;
    }
    .main {
      height: auto;
      padding: 0;
      overflow: visible;
    }
    .main-content {
      height: auto;
    }
    :host(:state(overlay)) .main-content {
      display: none;
    }
    :host(:state(overlay)) .overlay {
      position: static;
      padding: 0;
      overflow: visible;
    }
    .overlay-close {
      display: none;
    }
  }
`;