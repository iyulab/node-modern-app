import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// 테스트 전용 설정. `vite.config.ts` 의 빌드 플러그인(`vite-plugin-dts`)을 로드하지
// 않도록 분리한다 — 테스트 실행이 `dist/` 를 건드리는 부작용을 막기 위함이다.
// (components 가 같은 이유로 같은 구조를 쓴다.)
//
// - unit:    기존 tests/**/*.test.ts. 파일 상단의 `// @vitest-environment happy-dom`
//            docblock 이 그대로 유효하다.
// - browser: **실제 렌더에서만 드러나는 것**을 검증한다. 셸 색 계약이 여기 해당한다 —
//            소스 대조는 `var(--app-X, …)` 가 적혀 있음을 보일 뿐, 그 값이 실제로
//            계산되는지는 말하지 못한다. `color-mix` 는 인자가 무효하면 **선언을 통째로
//            버리고**, 커스텀 프로퍼티 오버라이드는 선언 위치에 따라 조용히 진다.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['tests/**/*.test.ts'],
          exclude: ['tests/browser/**'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'browser',
          include: ['tests/browser/**/*.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
          isolate: true,
        },
      },
    ],
  },
});
