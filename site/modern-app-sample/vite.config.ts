import { defineConfig } from 'vite'
import path from 'path';
import glob from 'fast-glob';
//import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@iyulab/modern-app': path.resolve(__dirname, 'lib-src'),
    },
    preserveSymlinks: true,
  },
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'publish'),
    rollupOptions: {
      input: glob.sync(['src/**/*.html']).map(entry => path.resolve(__dirname, entry)),
    },
  },
  plugins: [
    // 리액트를 빠르게 빌드하는 플러그인(안써도 무관)
    // lit과 함께 사용시 plugin-react-swc의 소스코드(node_modules)에 
    // "useDefineForClassFields"를 false로 수정하여 사용
    // react({
    //   tsDecorators: true,
    // })
  ],
  css: {
    modules: {
      // generateScopedName: "[hash:base64:10]",
      localsConvention: "camelCase",
    }
  }
})