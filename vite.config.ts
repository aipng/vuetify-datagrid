import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('v-')
        }
      }
    }),
    dts({
      include: ['src/**/*.vue', 'src/**/*.ts'],
      outDir: 'dist'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'TheDatagrid',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'vuetify'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        },
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vuetify-datagrid.css'
          return assetInfo.name
        }
      }
    },
    sourcemap: true
  }
})
