import { ref, App } from 'vue';
import { Spin } from 'ant-design-vue';
import { useDebounceFn, createSharedComposable } from '@vueuse/core';

export type UseLoadingOptions = {
  delay?: number;
};

let loadingApp: App<Element> | null = null;
let loadingDiv: HTMLElement | null = null;

/**
 * @function
 * @description 初始化加载组件
 **/
const initLoadingComponent = () => {
  if (!loadingDiv) {
    loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-mask';
    document.body.appendChild(loadingDiv);
  }
  if (!loadingApp) {
    loadingApp = createApp(Spin, { size: 'large' });
    loadingApp.mount(loadingDiv as HTMLElement);
  }
};

/**
 * @function
 * @description 显示或隐藏加载组件
 * @param options 配置项
 **/
export const useLoading = createSharedComposable((options?: UseLoadingOptions) => {
  const loadingCount = ref(0);
  const { delay = 0 } = options || {};

  // 显示或隐藏加载组件
  const toggleLoading = (toggle: boolean) => {
    toggle && initLoadingComponent();
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
