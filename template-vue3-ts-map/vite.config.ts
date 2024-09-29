import path from 'path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import { createVitePlugins } from './src/plugins';
import postCssPxToRem from 'postcss-pxtorem';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    plugins: createVitePlugins(viteEnv),
    resolve: {
      alias: {
        '@/': `${pathSrc}/`,
        '~basic-components/': `${pathSrc}/components/basic-components/`, // 基础组件
        '~business-components/': `${pathSrc}/components/business-components/`, // 业务组件
      },
    },
    base: './',
    publicDir: 'public', //将public目录下的文件复制到dist目录
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 100,
            propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            unitPrecision: 5, // 保留rem小数点多少位
            minPixelValue: 0, // 设置要替换的最小像素值 px小于x的不会被转换
            selectorBlackList: ['.norem'], // 过滤掉.norem开头的class，不进行rem转换
            exclude: /node_modules/i, // 这里表示不处理node_modules文件下的css
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
          }),
        ],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088, // 服务端口号
      // open: true, // 服务启动时是否自动打开浏览器
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
      outDir: viteEnv.VITE_TITLE + '-' + viteEnv.VITE_MODE + '-dist',
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
              return id.toString().split('node_modules/')[1].split('/')[0].toString(); //静态资源分拆打包
            }
          },
        },
      },
    },
  };
});
