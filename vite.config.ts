import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';

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
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    dts({
      include: ['src/**/*']
    }),
  ],
})