import { defineStore } from 'pinia';
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { theme as antdTheme } from 'ant-design-vue';
import { layoutSetting as defaultSetting, type LayoutSetting } from '@/config';
export type ThemeType = 'light' | 'dark' | 'realDark';
import type { ComputedRef } from 'vue';

export const themeColor = {
  light: antdTheme.defaultAlgorithm,
  dark: antdTheme.darkAlgorithm,
  realDark: antdTheme.compactAlgorithm
};
/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * layout - 整体布局方式 ['vertical', 'horizontal'] 两种布局
 * headerHeight - 头部高度
 */

export type AppStore = {
  layoutSetting: LayoutSetting;
  themeConfig: ThemeConfig;
  getNavTheme: ComputedRef<ThemeType | undefined>;
  toggleTheme: (navTheme: ThemeType) => void;
  setColorPrimary: (color: string) => void;
  updateLayoutSetting: (settings: Partial<LayoutSetting>) => void;
};

export const useAppStore = defineStore<'app', AppStore>(
  'app',
  () => {
    const layoutSetting = reactive({ ...defaultSetting });

    const themeConfig = reactive<ThemeConfig>({
      algorithm: themeColor[layoutSetting.navTheme!] || antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: layoutSetting.colorPrimary
      }
    });

    const getNavTheme = computed(() => {
      return layoutSetting.navTheme;
    });

    watchPostEffect(() => {
      if (layoutSetting.navTheme) {
        toggleTheme(layoutSetting.navTheme);
      }
      if (layoutSetting.colorPrimary) {
        setColorPrimary(layoutSetting.colorPrimary);
      }
    });

    // 切换主题
    const toggleTheme = (navTheme: ThemeType) => {
      if (navTheme === 'realDark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      themeConfig.algorithm = themeColor[navTheme];
    };

    /** 设置主题色 */
    const setColorPrimary = (color: string) => {
      themeConfig.token!.colorPrimary = color;
    };

    const updateLayoutSetting = (settings: Partial<LayoutSetting>) => {
      Object.assign(layoutSetting, settings);
    };

    return {
      layoutSetting,
      themeConfig,
      getNavTheme,
      toggleTheme,
      setColorPrimary,
      updateLayoutSetting
    };
  },
  {
    persist: true
  }
);
