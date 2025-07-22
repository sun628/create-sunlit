import { ref, App, createApp } from 'vue';
import { Spin } from 'ant-design-vue';
import { useDebounceFn, createSharedComposable } from '@vueuse/core';

export type UseLoadingOptions = {
  delay?: number;
  style?: Partial<CSSStyleDeclaration>;
};

const defaultStyle: Partial<CSSStyleDeclaration> = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '9999',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center'
};

let loadingApp: App<Element> | null = null;
let loadingDiv: HTMLElement | null = null;

/**
 * @function
 * @description 初始化加载组件
 * @param {Record<string, string>} customStyle - 自定义样式
 **/
const initLoadingComponent = (customStyle: Partial<CSSStyleDeclaration> = {}) => {
  if (!loadingDiv) {
    loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-mask';
    document.body.appendChild(loadingDiv);
    Object.assign(loadingDiv.style, defaultStyle, customStyle);
  }

  if (!loadingApp) {
    loadingApp = createApp(Spin, { size: 'large' });
    loadingApp.mount(loadingDiv as HTMLElement);
  }
};

/**
 * @function
 * @description 显示或隐藏加载组件
 * @param {UseLoadingOptions} options - 配置项
 * @returns {Object} 返回控制加载状态的方法
 **/
export const useLoading = createSharedComposable((options?: UseLoadingOptions) => {
  const loadingCount = ref(0);
  const { delay = 0, style } = options || {};

  // 显示或隐藏加载组件
  const toggleLoading = (toggle: boolean) => {
    toggle && initLoadingComponent(style);
    // 给loadingDiv添加一个data_count属性，用于记录当前的loadingCount值
    loadingDiv!.dataset.count = loadingCount.value.toString();
    loadingDiv!.style.display = toggle ? 'flex' : 'none';
  };

  const showLoading = useDebounceFn(() => {
    toggleLoading(true);
    loadingCount.value++;
  }, delay);

  const hideLoading = () => {
    if (loadingCount.value <= 0) return;
    loadingCount.value--;
    if (loadingCount.value === 0) {
      toggleLoading(false);
    }
  };

  const resetLoading = () => {
    loadingCount.value = 0;
    loadingDiv?.remove();
    loadingApp?.unmount();
    loadingDiv = null;
    loadingApp = null;
  };

  return {
    loadingCount,
    showLoading,
    hideLoading,
    resetLoading
  };
});
