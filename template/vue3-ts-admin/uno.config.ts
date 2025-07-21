// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import ANT_ICONS_JSON from '@iconify-json/ant-design/icons.json' with { type: 'json' };
import { presetRemToPx } from '@unocss/preset-rem-to-px';
import fs from 'fs';

const ant_icons = Object.keys(ANT_ICONS_JSON.icons).map((item) => `i-ant-design:${item}`);

// 本地 SVG 图标存放目录
const iconsDir = './src/assets/icons';

// 读取本地 SVG 目录，自动生成 `safelist`
const generateSafeList = () => {
  try {
    const base_icons = fs
      .readdirSync(iconsDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => `i-svg:${file.replace('.svg', '')}`);
    return [...ant_icons, ...base_icons];
  } catch (error) {
    console.error('无法读取图标目录:', error);
    return [];
  }
};

export default defineConfig({
  theme: {
    colors: {
      // ...
    }
  },

  presets: [
    presetRemToPx({
      baseFontSize: 4
    }),
    presetWind3(),
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        width: '1em',
        height: '1em',
        display: 'inline-block'
      },
      collections: {
        'ant-design': () => import('@iconify-json/ant-design/icons.json').then((i) => i.default),
        svg: FileSystemIconLoader(iconsDir, (svg) => {
          // 如果 SVG 文件未定义 `fill` 属性，则默认填充 `currentColor`
          return svg.includes('fill="') ? svg : svg.replace(/^<svg /, '<svg fill="currentColor" ');
        })
      }
    })
  ],
  // transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    // ...custom rules
    ['pointer', { cursor: 'pointer' }]
  ],
  safelist: generateSafeList(), // 动态生成 `safelist`
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-end': 'flex items-end justify-between',
    'flex-column': 'flex flex-col',
    'bg-cover': 'bg-cover bg-no-repeat',
    'text-ellipsis': 'truncate'
  }
});
