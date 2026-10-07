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
          // 아이콘 리졸버를 결정적으로 만든다 — sidebar 레이아웃이 자기 chrome 으로
          // 외부 CDN 아이콘을 가져오므로, 없으면 러너의 네트워크 상태에 결과가 달린다.
          setupFiles: ['./tests/vitest-setup.ts'],
        },
      },
      {
        test: {
          name: 'browser',
          // 직렬 — 파일마다 브라우저 페이지가 함께 뜨면 여유 메모리가 바닥나 시험이 «timed out waiting for click»·
          // «Failed to fetch dynamically imported module» 로 비결정적으로 죽는다(메모리가 적은 기계에서 병렬은 여유를 바닥까지 끌어내렸다).
          fileParallelism: false,
          include: ['tests/browser/**/*.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            // headless 고정 — 헤드 있는 창은 OS 표시 배율에 물려 얇은 테두리가 장치 픽셀로 스냅된다(components 설정 주석 참조).
            instances: [{ browser: 'chromium', headless: true }],
          },
          // 고정 포트 이유는 packages/components/vitest.config.ts 참조 —
          // 이 머신의 Windows 동적 포트 제외 범위와 vitest 기본 포트가
          // 충돌해 EACCES 로 실패하던 것을 실측으로 확인했다.
          api: { host: '127.0.0.1', port: 41505 },
          isolate: true,
          setupFiles: ['./tests/vitest-setup.ts'],
        },
      },
    ],
  },
});
