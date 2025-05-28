import PostcssPxToRem from 'postcss-pxtorem';

export type LayoutSetting = {
  layout: 'vertical' | 'horizontal'; // 整体布局方式
  navTheme: 'dark' | 'light'; // sidebar主题
  theme: 'light' | 'dark'; // 主题
  colorPrimary: string; // 主题色
  headerHeight: number; // 头部高度
};

export type PxtoRemOpitons = Parameters<typeof PostcssPxToRem>[0];
