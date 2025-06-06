import type { LayoutSetting } from './types';
import { loadEnv } from '../utils';
import { antTheme } from './antTheme';
export * from './types';

const env = loadEnv();

/**
 * layoutSetting 项目默认配置项
 * @param primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * @param navTheme - sidebar theme ['dark', 'light'] 两种主题
 * @param layout - 整体布局方式 ['vertical', 'horizontal'] 两种布局
 * @param headerHeight - 头部高度
 */
export const defaultLayoutSetting: LayoutSetting = {
  layout: 'vertical', // 整体布局方式
  navTheme: 'light', // sidebar theme ['dark', 'light'] 两种主题
  theme: 'light',
  colorPrimary: '#722ED1'
} as const;

export const serversConfig = [
  {
    name: 'base_server',
    url: env.VITE_BASE_API_URL
  },
  {
    name: 'flow_server',
    url: env.FLOW_SERVER as string
  }
] as const;

export type ServersName = (typeof serversConfig)[number]['name'];

export default {
  defaultLayoutSetting,
  serversConfig,
  antTheme
};
