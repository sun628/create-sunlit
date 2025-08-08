import type { LayoutSetting } from './types';
export * from './types';
export * from './antdTheme';
import { antdTheme } from './antdTheme';
export * from './mapConfig';
import * as mapConfig from './mapConfig';

/**
 * layoutSetting 项目默认配置项
 * @param primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * @param navTheme - sidebar theme ['dark', 'light'] 两种主题
 * @param layout - 整体布局方式 ['vertical', 'horizontal'] 两种布局
 * @param headerHeight - 头部高度
 */
export const defaultLayoutSetting: LayoutSetting = {
  layout: 'vertical', // 整体布局方式
  navTheme: 'dark', // sidebar theme ['dark', 'light'] 两种主题
  theme: 'light',
  colorPrimary: '#722ED1'
} as const;

export default {
  defaultLayoutSetting,
  antdTheme,
  mapConfig
};
