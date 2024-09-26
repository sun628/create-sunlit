import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer'; //打包分析
import eslintPlugin from 'vite-plugin-eslint';
import simpleHtmlPlugin from 'vite-plugin-simple-html'; // 生成html
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { PluginOption } from 'vite';

const _visualizer = visualizer({
  emitFile: true, //是否被触摸
  filename: 'report.html', //生成分析网页文件名
  open: true, //在默认用户代理中打开生成的文件
  gzipSize: false, //从源代码中收集 gzip 大小并将其显示在图表中
  brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
});

const lifecycle = process.env.npm_lifecycle_event; //获取当前运行的命令

const VITE_REPORT = lifecycle === 'build:report'; //是否是打包分析

export function createVitePlugins(viteEnv: Record<string, string>): PluginOption[] {
  const { VITE_TITLE } = viteEnv;
  return [
    UnoCSS({
      configFile: 'uno.config.ts',
    }),
    vue(),
    simpleHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_TITLE,
          versions: new Date().getTime().toString(),
        },
      },
    }),
    vueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
      dirs: ['src/components/basic'], // 指定组件所在目录
      dts: 'src/typings/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'], // 自动导入vue和vue-router相关函数
      resolvers: [AntDesignVueResolver()],
      eslintrc: {
        enabled: true, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true,
      },
      dirs: ['src/store/modules/**', 'src/utils/auto-import/**'],
      dts: 'src/typings/auto-imports.d.ts', // 生成 `auto-import.d.ts` 全局声明
    }),

    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
    // 打包分析
    VITE_REPORT && _visualizer,
  ];
}