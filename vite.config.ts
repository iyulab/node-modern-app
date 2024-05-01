import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';

export default defineConfig({
  publicDir: resolve(__dirname, 'static'),
  build: {
    minify: true, // 최소화 비활성화 (디버깅: false, 배포: true)
    target: 'esnext',
    copyPublicDir: true,
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: {
        "index": resolve(__dirname, 'src/index.ts'), // 첫 번째 진입점
        "apps/index": resolve(__dirname, 'src/apps/index.ts'), // 추가 진입점
        "components/controls/index": resolve(__dirname, 'src/components/controls/index.ts'), // 추가 진입점
        "components/dx/index": resolve(__dirname, 'src/components/dx/index.ts'), // 추가 진입점
        "settings/index": resolve(__dirname, 'src/settings/index.ts'), // 추가 진입점
        "services/index": resolve(__dirname, 'src/services/index.ts'), // 추가
      },
      fileName: (_, entry) => `${entry}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^react.*/,
        /^lit.*/,
        /^@lit.*/,
        /^@iyulab\/u-components*/,
      ],
      output: {
        chunkFileNames: `chunks/[name].js`
      },
    },
    terserOptions: {
      format: {
        comments: false, // 모든 주석 제거
      },
    },
  },
  plugins: [
    dts({
      include: 'src/**/*'
    }),
  ],
})
