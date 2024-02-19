// import postcss from 'rollup-plugin-postcss';
import { defineConfig, normalizePath } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: true, // 최소화 비활성화 (디버깅: false, 배포: true)
    outDir: 'dist',
    lib: {
      entry: {
        "index": resolve(__dirname, 'src/index.ts'), // 첫 번째 진입점
        "components/dx/index": resolve(__dirname, 'src/components/dx/index.ts') // 추가 진입점
      },
      fileName: (format, entry) => `${entry}.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        chunkFileNames: `chunks/[name].js`
      },
      external: [
        /^react*/,
        /^lit*/,
        /^@iyulab\/u-components*/,
      ],
    },
    terserOptions: {
      format: {
        comments: false, // 모든 주석 제거
      },
    },
  },
  plugins: [
    dts({
      include: 'src/**/*',
    }),
    libInjectCss(),
    // react({
    //   // tsDecorators: true,
    // }),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(resolve(__dirname, 'src/styles')),
          dest: normalizePath(resolve(__dirname, 'dist')),
          overwrite: true
        }
      ]
    }),
    // postcss({
    //   extensions: ['.scss', '.sass'],
    //   inject: true, // CSS를 JavaScript에 주입
    //   extract: false // CSS 파일을 별도로 추출하지 않음
    // }),
  ],
})
