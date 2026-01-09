import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { syncPlugin } from './vite-plugins/sync-plugin'

export default defineConfig({
  plugins: [react(), syncPlugin()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
