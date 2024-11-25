import { VChart } from 'vue-echarts';
// * global
export {};

declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface _AMapSecurityConfig {
    securityJsCode: string;
  }
}

interface CustomGlobalComponents {
  VChart: (typeof import('vue-echarts'))['default'];
}
declare module 'vue' {
  export interface GlobalComponents extends CustomGlobalComponents {}
}
