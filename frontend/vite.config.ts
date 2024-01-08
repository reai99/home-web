import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  // 定义环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      hmr: true,
      open: true,
      proxy: {
        '/api/common': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          secure: false,
        }
      },
    }
  }
})
