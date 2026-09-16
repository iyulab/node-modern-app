import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';
import reactWrapper from '@iyulab/components/plugins/vite-plugin-react-wrapper.js';

export default defineConfig({
  publicDir: 'public',
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: true,
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/react.ts'),
      ],
      formats: ['es'],
      fileName: (format, entry) => {
        return format === 'es' ? `${entry}.js` : `${entry}.${format}.js`;
      }
    },
    rollupOptions: {
      external: [
        /^@iyulab.*/,
        /^lit.*/,
        /^i18next.*/,
        /^react.*/,
        /^@lit\/react.*/,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    // 래퍼 생성기는 `@iyulab/components` 의 «정본» 을 그대로 쓴다 — 사본을 두지 않는다.
    // 셸 레이아웃(`src/layouts`)은 대상이 아니다: 소비자는 설정으로 얻는다.
    reactWrapper({
      input: 'src/components',
      output: 'react',
      // `Wizard` 는 `src/react.ts` 가 이미 손으로 감싼다(그 파일의 주석이 이유를 적는다).
      // 둘을 다 내면 같은 태그에 React 타입이 둘 생겨 소비자가 어느 쪽을 쓰느냐로 갈린다 —
      // 이 리포가 `TS2717` 로 한 번 겪은 부류다.
      //
      // 사이드바 «내부 크롬» 셋은 등록은 되지만 공개 API 가 아니다 — 소비자는
      // `SidebarLayoutConfig` 로만 그 UI 를 얻고, 태그를 직접 쓰는 용법이 이 리포
      // 어디에도 없다(그 판정의 정본은 `scripts/internals/skill-inventory-check.js` 의
      // `INTERNAL_CHROME_TAGS` 이고, 같은 목록이 `u-sidebar-button` 은 **일부러 남긴다** —
      // `type:'html'` 레시피에서 소비자가 직접 쓰는 실사례가 있다).
      // 래퍼를 내면 그것이 곧 공개 React 표면이 되므로, 여기서도 같은 셋만 뺀다.
      exclude: [
        'src/components/Wizard.ts',
        'src/components/SidebarGroup.ts',
        'src/components/SidebarLink.ts',
        'src/components/SidebarSection.ts',
      ],
    }),
    dts({
      include: ['src/**/*']
    }),
  ],
})