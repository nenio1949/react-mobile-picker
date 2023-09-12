import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: resolve(__dirname, './lib')
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': join(__dirname, 'lib'),
      'react-mobile-picker': resolve(__dirname, './lib')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'Picker',
      fileName: 'react-mobile-picker'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
