/**
 * React JSX 소비 타입 스모크 — **컴파일되는 것 자체가 테스트**다(런타임 assertion 없음).
 *
 * 배경: `u-info-field`의 React JSX 타입(`declare module 'react'` 증강, `InfoField.ts`)이
 * 한때 `value?: string`으로 좁혀져 있어, 실제 클래스 필드(`value?: unknown`)와 JSDoc이
 * 명시하는 `null`·숫자 입력을 TS strict 소비자가 그대로 못 넘겼다 — 순수 **타입** 실패라
 * vitest 런타임 테스트로는 잡을 수 없다. 타입 픽스처가 유일한 감시망이다.
 *
 * 이 파일은 `src/**\/*.ts`가 직접 선언하는 `JSX.IntrinsicElements` 증강을 검증하므로
 * (컴포넌트 진영 `react-consumption.tsx`와 달리) 빌드 산출물에 의존하지 않고 메인
 * `tsconfig.json`(`jsx: "react-jsx"`)만으로 typecheck 대상이 된다.
 */
import type React from 'react';

/** 회귀 — `value`가 `null`을 그대로 받는다(API가 흔히 돌려주는 nullable 필드 형태) */
export const InfoFieldNullableValue = (profile: { Email: string | null }): React.JSX.Element => (
  <u-info-field label="이메일" value={profile.Email} />
);

/** 회귀 — `value`가 숫자를 그대로 받는다(`.value=${order.quantity}` 같은 비-문자열 바인딩) */
export const InfoFieldNumericValue = (order: { ItemCount: number | undefined }): React.JSX.Element => (
  <u-info-field label="품목수" value={order.ItemCount} numeric />
);
