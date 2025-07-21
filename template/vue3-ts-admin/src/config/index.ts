import type { LayoutSetting } from './types';
import { antTheme } from './antTheme';
export * from './types';

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

/**
 * @function
 * @description 创建代理配置
 * @param env - 环境变量
 * @returns  代理配置
 **/
export function createProxyConfig(env: Record<string, string>) {
  return {
    // 基础服务
    BASE_SERVER: {
      prefix: env.VITE_BASE_API,
      config: {
        target: env.VITE_BASE_URL,
        changeOrigin: true,
        secure: false
      }
    },
    // 其他服务示例
    api2: {
      prefix: '/api2',
      config: 'http://api2.example.com'
    },
    api3: {
      prefix: '/api3',
      config: {
        target: 'http://api3.example.com',
        changeOrigin: false,
        rewrite: (path: string) => path.replace(/^\/api3/, '')
      }
    }
  } as const;
}

export type proxyName = keyof ReturnType<typeof createProxyConfig>;

export default {
  defaultLayoutSetting,
  antTheme
};
