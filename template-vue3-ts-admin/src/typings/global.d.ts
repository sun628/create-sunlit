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
  }
}

declare module '*.vue' {
  export interface GlobalComponents {
    VChart: typeof import('vue-echarts')['default'];
  }
}
