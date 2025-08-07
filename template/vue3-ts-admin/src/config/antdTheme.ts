import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export type AntdTheme = {
  light: ThemeConfig;
  dark: ThemeConfig;
};

/**
 * 亮色主题和暗色主题
 */
export const antdTheme: AntdTheme = {
  light: {
    token: {
      colorTextDisabled: 'rgba(0, 0, 0, 0.35)'
    }
  },
  dark: {
    token: {
      colorText: '#000000',
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
  }
} as const;
