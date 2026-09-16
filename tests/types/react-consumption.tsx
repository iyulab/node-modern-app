/**
 * 생성된 React 래퍼가 **실제로 소비 가능한가** — 타입 축 스모크.
 *
 * `@iyulab/components` 가 자기 46개 래퍼에 대해 하는 것과 같은 검사다(`tests/types/`).
 * 여기가 없으면 «생성됐다» 가 «쓸 수 있다» 를 뜻하지 않는다 — 이 리포가 반복 기록한
 * *«배선했다 ≠ 도달한다»* 의 타입 축 변주다.
 *
 * ⚠**`value` 가 좁혀지지 않았는지 함께 고정한다** — docket `#183` 이 정확히 그 회귀였다
 * (`u-info-field` 의 React `value` 프롭이 `string` 으로 좁혀져 클래스 필드(`unknown`)·
 * 문서화된 동작(`null`·숫자 허용)과 어긋났다).
 */
import { PageHeader, InfoSection, InfoField, GroupBox, EmptyState, ActionBar, MasterDetailLayout, SidebarButton } from '@iyulab/modern-app/react/index.js';

export function Screen() {
  return (
    <>
      <PageHeader title="Orders" subtitle="All orders" />
      <GroupBox title="Summary">
        <InfoSection min={200}>
          <InfoField label="Total" format="currency" currency="KRW" value={550000} />
          <InfoField label="Count" value={12} />
          <InfoField label="Missing" value={null} />
          <InfoField label="Text" value="plain" />
        </InfoSection>
      </GroupBox>
      <EmptyState title="No orders" description="Create one to get started." />
      <ActionBar sticky />
      <MasterDetailLayout masterSize="22rem" overlayBreakpoint={760} />
      <SidebarButton label="More" />
    </>
  );
}
