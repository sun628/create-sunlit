import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { defaultLayoutSetting } from '@/config';
import type { LayoutSetting, ThemeType } from '@/config/types';
import { theme as antdTheme } from 'ant-design-vue/es';

const isDark = useDark();
const toggleDark = useToggle(isDark);

export const useAppStore = defineStore('app', () => {
  /**
   * ----------------------------- theme&layout start-----------------------------
   * --------------------------主题以及布局相关----------------------------------
   */
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;

  const layoutSetting = reactive<LayoutSetting>(defaultLayoutSetting);
  const themeConfig: ThemeConfig = reactive<ThemeConfig>({
    algorithm: layoutSetting.theme === 'light' ? [defaultAlgorithm] : [darkAlgorithm],
    token: {
      colorPrimary: layoutSetting.colorPrimary,
      colorBgContainer: layoutSetting.theme === 'light' ? '#fff' : 'rgb(36, 37, 37)'
    }
  });

  if (isDark.value || layoutSetting.theme === 'dark') toggleTheme('dark');

  watch(isDark, () => {
    if (isDark.value) toggleTheme('dark');
    else toggleTheme('light');
  });

  /**
   * 切换主题配置
   * @param theme 当前选择的主题类型，可以是 'light' 或 'dark'
   */
  function toggleTheme(theme: ThemeType) {
    layoutSetting.theme = theme;
    if (theme === 'light') {
      toggleDark(false);
      themeConfig.algorithm = [defaultAlgorithm];
      if (themeConfig.token) themeConfig.token.colorBgContainer = '#fff';
    } else if (theme === 'dark') {
      toggleDark(true);
      themeConfig.algorithm = [darkAlgorithm];
      if (themeConfig.token) themeConfig.token.colorBgContainer = 'rgb(36, 37, 37)';
    }
  }

  /**
   * 切换主颜色设置
   * 此函数用于更新布局设置中的主颜色，并同步更新主题配置中的主颜色
   * @param color 新的主颜色值
   */
  function toggleColorPrimary(color: string) {
    layoutSetting.colorPrimary = color;
    if (themeConfig.token) {
      themeConfig.token.colorPrimary = color;
    }
  }

  return {
    layoutSetting,
    theme: themeConfig,
    toggleTheme,
    toggleColorPrimary
  };
});
