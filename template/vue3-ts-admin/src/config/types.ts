import PostcssPxToRem from 'postcss-pxtorem';

export type ThemeType = 'light' | 'dark';

export type LayoutSetting = {
  /**
   * layout: 整体布局方式
   * vertical: 垂直布局  horizontal: 水平布局
   */
  layout: 'vertical' | 'horizontal'; // 整体布局方式
  navTheme: ThemeType; // sidebar主题
  theme: ThemeType; // 主题
  colorPrimary: string; // 主题色
};

export type PxtoRemOpitons = Parameters<typeof PostcssPxToRem>[0];
