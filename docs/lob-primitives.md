# LOB 레이아웃 프리미티브

셸 **안쪽**(페이지 본문)에서 반복되는 골격. `0.9.0` 에서 신설됐다.

## 왜 이것이 이 패키지에 있나

이 패키지는 *"현대적인 앱이 보통 제공하는 기능/요소"* 를 담당한다. 종전에는 **셸 바깥 껍데기**
(사이드바·라우팅·테마·토스트)만 있었고 **셸 안쪽에 대한 제공물은 0개**였다. 그래서 소비앱이
화면마다 같은 구조를 손으로 다시 짰다 — 실측된 형태로 **라벨-값 그리드 41곳 · 카드 30여 곳**.

손으로 짜면 제목 크기·여백·열 수가 화면마다 조금씩 달라진다. 개별로는 사소해 보이지만
화면을 옮겨 다니는 사용자에게는 ***"제품이 하나로 만들어지지 않았다"*** 로 읽힌다.

### 세 패키지의 분담

| 패키지 | 성격 |
|---|---|
| `@iyulab/components` | 기초 구성요소 + 디자인 **토큰 축** — 범용·표준·**의견 없음** |
| **`@iyulab/modern-app`** | **현대적 앱이 보통 제공하는 요소** — 셸 + **이 문서의 프리미티브** · 범용 |
| `@iyulab/enterprise` | 이유랩 LOB 빌드 관행 + 고유 스타일/브랜딩 — **의견 있음** |

★**프레임워크가 경계를 가른다.** 이 패키지의 프리미티브는 **Lit 커스텀 엘리먼트**라
프레임워크 중립이다(React·Vue·바닐라 어디서나 태그로 쓴다). `@iyulab/enterprise` 의 L2 는
**React 전용**이다(그쪽 헌장이 명시). ⇒ *"어느 패키지가 소유하나"* 의 1차 기준은 **소비 형태**다.

> **`EmptyState` 소유권**: `enterprise` 헌장 카탈로그에 `EmptyState · ErrorState · Skeleton` 이
> ★실측(부분)·미착수로 올라 있었다. **빈 상태는 프레임워크 중립이 맞으므로 이 패키지가 소유**
> 하고, 그쪽 카탈로그에는 이 문서를 가리키는 줄을 남겼다. 같은 표면을 두 패키지가 각각
> 만들면 소비자가 둘 중 무엇을 쓸지 매번 고르게 된다.

## 등급 정책 — **이 패키지에는 없었고, 여기서 세운다**

`enterprise` 는 카탈로그와 등급(★★ 실측 / ★ 실측(부분) / ○ 요구 = **만들지 않는다**)을 갖고
있는데 이 패키지에는 그런 문서가 없었다. 프리미티브를 다섯 개 얹으면서 **정책을 조용히
만들어 버리는 것**을 피하려고 명시한다:

> **이 패키지의 프리미티브는 「현대적 앱이 보통 제공하는 것」이면 들어온다.**
> `enterprise` 의 cross-consumer 수요 게이트를 적용하지 않는다 — 그 게이트는 *"이유랩의 LOB
> 관행"* 처럼 **조직 고유 판단**을 지키기 위한 것이고, *"페이지 헤더가 있어야 한다"* 는
> 조직 판단이 아니라 **일반 관행**이기 때문이다.
>
> 대신 두 가지를 요구한다:
> ⑴ **오버라이드 경로**(`part` + slot)가 없으면 들어올 수 없다. 없으면 소비자가 통째로
>    복제하고, 그 순간 이 계층은 쓰기 전보다 나쁜 상태를 만든다.
> ⑵ **토큰만 쓴다.** 색·크기 리터럴이 있으면 소비자가 밀도·테마를 바꿔도 그 자리만
>    따라오지 않는다. (`tests/lob-primitives.test.ts` 가 지킨다. 예외는 헤어라인 `1px solid`
>    하나이고 이유가 테스트에 적혀 있다.)

## 카탈로그

| 태그 | 무엇 | slot | part |
|---|---|---|---|
| `u-page-header` | 제목 + 상태 배지 + 우측 액션 + 뒤로가기 | `status` · `actions` | host · back · heading · title · subtitle · status · actions |
| `u-group-box` | 제목이 붙은 카드 | (기본) · `actions` | host · header · title · actions · body |
| `u-info-section` | `u-info-field` 들의 반응형 그리드 | (기본) | host · grid |
| `u-info-field` | 읽기 전용 라벨-값 한 쌍(`size="lg"`로 대시보드 통계 타일, `trend`로 추세 표시) | (기본, `value` 를 이긴다) | host · label · value · trend |
| `u-empty-state` | 빈 상태 (`no-data` / `no-results`) | `icon` · `actions` | host · icon · title · description · actions |
| `u-action-bar` | 푸터 액션 바 — 위험 액션과 주 액션을 **거리로** 가른다 | `danger` · (기본) | host · danger · main |
| `u-master-detail-layout` | master›detail 반응형 split-pane 셸. `detail` 슬롯이 채워지면 나타나고 비우면 사라진다. 좁은 자기 폭에서 detail 이 전체 오버레이로 전환(`overlayBreakpoint`, 기본 760px) | (기본, master) · `detail` | host · master · divider · detail · detail-close |
| `u-wizard` | 다단계 흐름의 스텝 인디케이터 + 패널 + Back/Next. `steps`/`active`(controlled)/`linear`. 검증·저장재개는 컴포넌트 밖 — `step-change`(취소 가능)에서 소비자가 처리 | (기본, 스텝 패널들) · `actions` | host · indicator · step · panel · actions |

### 🔴 접힘은 «화면»이 아니라 «자기 폭»으로 판단한다 (0.10.0)

`u-page-header`·`u-group-box`·`u-action-bar` 는 `@container` 로 접힌다(`container-type:
inline-size`). 종전에는 `@media` 였고, 그러면 프리미티브가 **자기가 얼마나 좁은지와 무관하게**
접혔다 — 사이드바가 열려 본문이 500px 인 1280px 화면에서는 접히지 않고, 넓은 본문을 가진 좁은
화면에서는 불필요하게 접혔다.

⚠**소비자가 알아야 할 것**: 이 컴포넌트를 좁은 컬럼(분할 뷰·사이드 패널) 안에 넣으면 **이제
접힌다**. 종전에는 화면이 넓으면 안 접혔다.

⚠**`u-master-detail-layout` 는 같은 "자기 폭" 철학이지만 메커니즘이 다르다** —
`overlayBreakpoint` 가 **고정 CSS 중단점이 아니라 인스턴스별 prop**이라 `@container` 조건절이
런타임 값을 못 읽는다. 그래서 `ResizeObserver`로 직접 재고 `overlay` 속성을 반영한다. 결과
(자기 폭 기준 판단)는 같지만 구현은 다르다는 것을 소스만 보고 착각하지 말 것.

### 아직 만들지 않은 것과 그 이유

| 패턴 | 왜 아직 |
|---|---|
| **사이드 패널(편집 드로어)** | ✅**만들지 않기로 했다 — `u-drawer` 조합으로 이미 된다.** 실브라우저 실측에서 요구 4항목이 **4/4 통과**했다(본문만 스크롤 + 푸터 고정 · 포커스 트랩 · 열림 직후 팝업 0 · 첫 입력 포커스). 같은 계약의 두 번째 구현은 드리프트를 만든다 ⇒ 레시피는 `@iyulab/components` 의 `drawer.md` §Edit-panel pattern. 🔴**자동 포커스가 곧 팝업 펼침이 되는 결함**은 별건으로 재현 조건을 기다린다 |
| **툴바(검색·필터 묶음)** | `u-group-box` 의 `actions` 슬롯이 그 자리를 맡고, **접힘 규칙은 라이브러리가 정한다**(컨테이너 480px 이하에서 제목 아래로). 독립 컴포넌트로 낼 만한 형태가 아직 하나로 수렴하지 않았다 |
| **익스팬더** | ➡**`@iyulab/components` 의 `u-expander` 로 갔다** — 도메인이 없는 범용 디스클로저라 기반 층이 맞다 |
| **타임라인 / 단계 레일** | 반복은 관측되나 형태가 아직 한 가지로 수렴하지 않았다 |

## 사용

```html
<u-page-header title="주문 G-2026-I-0629" subtitle="2026-02-24 접수" back="/orders" back-label="목록">
  <u-tag slot="status" color="success">수금완료</u-tag>
  <u-button slot="actions">수정</u-button>
</u-page-header>

<u-group-box title="기본 정보">
  <a slot="actions" href="/orders/1/edit">수정</a>
  <u-info-section min="180">
    <u-info-field label="파트" value="일반"></u-info-field>
    <u-info-field label="부수" .value=${0} numeric></u-info-field>
    <u-info-field label="비고"></u-info-field>
  </u-info-section>
</u-group-box>
```

### 대시보드 통계 타일

```html
<u-info-section min="180">
  <u-info-field label="이번 달 매출" size="lg" format="currency" currency="KRW" .value=${55000000}
    trend="up" trendLabel="+12% vs last month"></u-info-field>
  <u-info-field label="미결 건수" size="lg" .value=${8} numeric
    trend="down" tone="positive" trendLabel="-3 vs last week"></u-info-field>
</u-info-section>
```

두 번째 예시가 `tone="positive"`를 명시하는 이유: `trend="down"`만 있으면 `negative`로 유추되지만,
"미결 건수 감소"는 업무적으로 좋은 신호라 자동 유추와 반대다 — 이럴 때 `tone`으로 명시 override한다.

### 🔴 "아직 없음"과 "0"은 다른 사실이다

`u-info-field` 는 이 규칙을 **컴포넌트가 소유**한다:

```
null · undefined · 빈 문자열   →  —      (아직 없음)
0 · false · '0' · []           →  값 그대로
```

⚠규칙을 사람이 기억하는 방식으로 두면 반드시 어긋난다. 실제로 한 소비앱에서 *"부수가 0인
주문"* 과 *"부수가 아직 안 정해진 주문"* 이 화면에서 똑같이 `—` 로 보였고, 그 둘은 업무적으로
전혀 다른 상태였다.

### 빈 상태는 두 종류다

```html
<u-empty-state variant="no-data"></u-empty-state>      <!-- 아직 만들지 않았다 → 만들기 -->
<u-empty-state variant="no-results"></u-empty-state>   <!-- 조건에 안 맞는다 → 조건 바꾸기 -->
```

같은 문구로 보여 주면 사용자는 필터가 걸려 있는 줄 모르고 *"데이터가 사라졌다"* 로 읽는다.

### master›detail

```html
<u-master-detail-layout master-size="24rem">
  <u-rich-table filterable
    @selection-change=${(e: SelectionChangeEvent) => (selected = e.detail.selected[0])}>
    …
  </u-rich-table>
  ${selected ? html`
    <u-group-box slot="detail" title=${selected.name}>
      <u-info-section min="180">
        <u-info-field label="상태"><u-badge>${selected.status}</u-badge></u-info-field>
      </u-info-section>
    </u-group-box>
  ` : nothing}
</u-master-detail-layout>
```

선택 연동(누르면 상세가 뜨는 것)은 컴포넌트가 하지 않는다 — `selection-change`를 받아
`detail` 슬롯 내용을 소비자가 갈아끼운다. 좁은 화면에서는 detail 이 master 위 전체 오버레이로
뜨고, 오버레이의 닫기 버튼이 `detail-close`를 낸다 — 그 이벤트에서 `selected`를 지우는 것도
소비자 몫이다(컴포넌트는 슬롯 내용을 스스로 비우지 않는다).

### 마법사/스테퍼

```html
<u-wizard .steps=${[
  { id: 'info', label: '기본 정보' },
  { id: 'payment', label: '결제' },
  { id: 'review', label: '확인' },
]} .active=${step}
  @step-change=${(e: CustomEvent<{from: number; to: number}>) => {
    if (!isStepValid(e.detail.from)) e.preventDefault();
    else step = e.detail.to;
  }}>
  <section>…기본 정보 폼…</section>
  <section>…결제 폼…</section>
  <section>…확인…</section>
</u-wizard>
```

검증·저장/재개는 컴포넌트가 하지 않는다 — `step-change`(취소 가능, `{from, to}`)에서
소비자가 검증하고 막을 땐 `preventDefault()`, `active`는 controlled prop이라 소비자가
외부 상태와 동기화한다(위 예시처럼 이벤트에서 직접 반영하거나, 저장된 값으로 복원).
`linear`(기본 `true`)는 인디케이터로 미방문 스텝을 건너뛰는 것만 막는다 — `next()`로
한 스텝씩 나아가는 것은 항상 허용된다. "Submit"이냐 "Next"냐 버튼 문구는 `actions`
슬롯으로 완전히 대체해 정한다.

## 오버라이드

```css
/* part 로 — 정규 경로 */
u-group-box::part(header) { padding-bottom: 8px; }

/* 토큰으로 — 전역 */
:root { --u-radius-2xl: 16px; }   /* 모든 카드 반경 */

/* 컴포넌트 훅 */
u-empty-state { --empty-state-icon-size: 48px; }
```

⚠**섀도 DOM 내부 선택자로 침투하지 말 것.** 구조가 바뀌면 조용히 깨진다.
필요한 `part` 가 없으면 이슈로 열어 달라 — 그것이 이 계층이 유지되는 방식이다.

## 요구 사항

`@iyulab/components` **1.21.0 이상** — 타입 스케일(`--u-text-*`) · 여백 상단(`--u-space-xl` 이상) ·
반경 상단(`--u-radius-2xl`) 축을 쓴다.
⚠**1.20.0 이하에서는 폴백 값으로 렌더된다**(깨지지는 않는다). 시트가 없을 때의 내성과 같은
기제이고, 그래서 *"조용히 예전 모양"* 이 된다 — 프리미티브가 밋밋해 보이면 먼저 이 버전을 본다.
