import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  // 定义环境变量
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = command === 'serve';

  const commonConfig = {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    sourceMap: true,
    resolve: {
      alias: {
        '@src': '/src'
      }
    },
  }

  if(isDev) {
    commonConfig.server = {
      hmr: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          secure: false,
        }
      },
    }
  } else {
    commonConfig.minify = true;
    commonConfig.build = {
      outDir: '../backend/public',
      assetsDir: 'static'

    }
  }

  return commonConfig;
})
