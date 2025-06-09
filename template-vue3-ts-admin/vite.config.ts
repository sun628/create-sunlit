import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import postCssPxToRem from 'postcss-pxtorem';
import { createPlugins } from './build/plugins';
import { createProxy } from './build/proxy';

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    plugins: createPlugins(viteEnv),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
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
      port: 8088,
      open: false,
      cors: true,
      proxy: createProxy(viteEnv)
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
            antdIcon: ['@ant-design/icons-vue']
          }
        }
      }
    }
  };
});
