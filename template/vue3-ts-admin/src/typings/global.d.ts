import type { RouteMeta as VRouteMeta } from 'vue-router';

declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
}
declare module 'vue-router' {
  interface RouteMeta extends VRouteMeta {
    title: string;
    icon?: string;
    /** 不在菜单中显示 */
    hideInMenu?: boolean;
    /** 在菜单中隐藏子节点 */
    hideChildrenInMenu?: boolean;
    loaded?: boolean;
    /** 是否外链 */
    isExt?: boolean;
    /** 外链打开方式
     * 1: 新窗口打开
     * 2: 内嵌 iframe
     */
    extOpenMode?: 1 | 2;
  }
}

declare module '*.vue' {
  export interface GlobalComponents {
    VChart: typeof import('vue-echarts')['default'];
  }
}
