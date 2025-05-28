import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import type { LayoutSetting } from './types';
import { loadEnv } from '../utils';

export * from './types';

const env = loadEnv();

export const layoutSetting: LayoutSetting = {
  layout: 'vertical', // 整体布局方式
  navTheme: 'dark', // sidebar主题
  theme: 'light', // 主题
  colorPrimary: '#1677FF', // 主题色
  headerHeight: 48 // 头部高度
};

export const servers = [
  {
    name: 'base_server',
    url: env.VITE_BASE_API as string
  },
  {
    name: 'flow_server',
    url: env.FLOW_SERVER as string
  }
] as const;

export const antTheme: ThemeConfig = {
  token: {
    colorText: '#000000',
    colorPrimary: '#ff5c93', // 主题色
    colorTextDescription: '#a8abb2' // 描述色
  },
  components: {
    List: {},
    Spin: {
      colorBgContainer: '#000' // 背景色
    },
    Form: {
      colorTextHeading: '#fff' // 表单标题颜色
    },
    DatePicker: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBorder: '#527eac',
      colorTextDisabled: '#a8abb2'
    },
    Select: {
      colorBgContainer: '#1c2a45', // 背景色
      colorBgElevated: '#1c2a45', // dropdown 背景色
      controlItemBgActive: '#00aeff', // 选中背景色
      colorText: '#fff', // 文字颜色
      colorTextPlaceholder: '#a8abb2', // 占位符颜色
      colorBorder: '#527eac' // 边框颜色
    },
    Input: {
      colorBorder: '#527eac', // 边框颜色
      colorText: '#fff' // 文字颜色
    },
    Pagination: {
      colorText: '#fff'
    }
  }
} as const;

export default {
  layoutSetting,
  servers,
  antTheme
};
