import path from 'path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import postCssPxToRem from 'postcss-pxtorem';
import { createVitePlugin } from './src/plugins';
import config from './src/config/default-config';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    plugins: createVitePlugin(viteEnv),
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    base: './',
    publicDir: 'public', //将public目录下的文件复制到dist目录
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [postCssPxToRem(config.pxtorem)],
      },
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
          },
        },
      },
    },
    assetsInclude: ['**/*.webp', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
    build: {
      outDir: 'dist/' + viteEnv.VITE_TITLE + '-' + viteEnv.VITE_MODE,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const moduleName = id.toString().split('node_modules/')[1].split('/')[1];
              if (moduleName.includes('ant-design-vue')) {
                return 'ant-design-chunks';
              } else if (moduleName.includes('echarts')) {
                return 'echarts-chunks';
              }
              // return id.toString().split('node_modules/')[1].split('/')[0].toString();
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
