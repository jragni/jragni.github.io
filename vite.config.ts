import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Since this is jragni.github.io (user site), base should be '/'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
