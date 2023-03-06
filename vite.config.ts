import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react(), viteEslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
