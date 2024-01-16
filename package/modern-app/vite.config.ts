// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@iyulab/modern-app': path.resolve(__dirname, 'src'),
    },
    preserveSymlinks: true,
  },  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@iyulab/modern-app',
      fileName: (format) => `index.${format}.js`,
      formats: ['es'], // ES 모듈 형식을 사용
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
        assetFileNames: `assets/[name].[ext]`
      }
    }    
  },
  plugins: [react()],
})
