import { VChart } from 'vue-echarts';
// * global
export {};

declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    VChart: (typeof import('vue-echarts'))['default'];
  }
}
