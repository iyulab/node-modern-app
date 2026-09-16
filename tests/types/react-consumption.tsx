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
// 🔴**배럴은 딥 경로의 «상위집합»이다** — 생성 래퍼 8종과 손 래퍼(`SidebarLayout`·`Wizard`)와
// `ScreenObserver` 가 **한 지정자**에서 전부 잡혀야 한다(cycle-654, §C-I ⒞). 종전에는 배럴이
// 손 래퍼만 담고 생성 래퍼는 딥 경로에만 있어, 소비자가 어느 쪽을 보느냐로 얻는 것이 갈렸다
// (레퍼런스 앱 `house-style` 이 실제로 두 스타일을 한 트리에서 섞어 쓰고 있었다).
// ⇒ 이 import 줄 자체가 그 불변식의 회귀 테스트다 — 재수출이 빠지면 여기서 `TS2724` 가 난다.
import {
  PageHeader, InfoSection, InfoField, GroupBox, EmptyState, ActionBar, MasterDetailLayout, SidebarButton,
  SidebarLayout, Wizard, ScreenObserver,
} from '@iyulab/modern-app/react';
import type { WizardStep, SidebarLayoutConfig } from '@iyulab/modern-app/react';
// 딥 경로도 그대로 열려 있다(형제 정본 `@iyulab/components` 와 같은 형태) — 상위집합 관계이지
// 배타 관계가 아니다.
import { PageHeader as PageHeaderDeep } from '@iyulab/modern-app/react/PageHeader.js';

const _sameComponent: boolean = PageHeader === PageHeaderDeep;
const _step: WizardStep = { id: 'a', label: 'A' };
const _cfg: SidebarLayoutConfig = {} as SidebarLayoutConfig;
export const _barrelSuperset = [SidebarLayout, Wizard, ScreenObserver, _sameComponent, _step, _cfg];

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
