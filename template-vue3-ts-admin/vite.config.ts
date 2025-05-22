import path from 'path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import postCssPxToRem from 'postcss-pxtorem';
import { createVitePlugin } from './src/plugins';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    plugins: createVitePlugin(viteEnv),
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    base: './',
    publicDir: 'public',
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: Number(viteEnv.VITE_PX_REM_ROOT_VALUE),
            propList: ['*'],
            unitPrecision: 5,
            minPixelValue: 0,
            selectorBlackList: ['.norem']
          })
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8088, // 服务端口号
      open: false, // 服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        [viteEnv.VITE_BASE_API]: {
          target: viteEnv.VITE_BASE_API_URL,
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          rewrite: (path) => path.replace(viteEnv.VITE_BASE_API, ''),
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] =
                new URL(req.url || '', options.target as string)?.href || '';
            });
          }
        }
      }
    },
    build: {
      outDir: 'dist/' + viteEnv.VITE_TITLE + '-' + viteEnv.VITE_MODE,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            echarts: ['echarts'],
            vue: ['vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate', '@vueuse/core'],
            axios: ['axios'],
            antd: ['ant-design-vue'],
            antdIcon: ['@ant-design/icons-vue'],
            other: ['nprogress', 'dayjs']
          }
        }
      }
    }
  };
});
