// vite.config.ts
// import postcss from 'rollup-plugin-postcss';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  build: {
    sourcemap: true, // 소스 맵 활성화
    minify: true, // 최소화 비활성화 (디버깅: false, 배포: true)
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@iyulab/modern-app',
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'), // 첫 번째 진입점
        dx: resolve(__dirname, 'src/components/dx/index.ts') // 추가 진입점
      },
      output: {
        inlineDynamicImports: false,
        // 각 진입점에 대한 출력 경로 설정
        entryFileNames: `[name].js`,
        chunkFileNames: `chunks/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom', 'react-router-dom', 'lit'],
    },
    terserOptions: {
      format: {
        comments: false, // 모든 주석 제거
      },
    },
  },
  plugins: [
    libInjectCss(),
    react({
      // tsDecorators: true,
    }),
    typescript(),
    // postcss({
    //   extensions: ['.scss', '.sass'],
    //   inject: true, // CSS를 JavaScript에 주입
    //   extract: false // CSS 파일을 별도로 추출하지 않음
    // }),
  ],
})
