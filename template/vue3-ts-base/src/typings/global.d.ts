import type { RouteMeta as VRouteMeta } from 'vue-router';
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }
  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type Objectable<T extends object> = {
    [P in keyof T]: T[P];
  } & Recordable;
  declare type Key = string | number;
  declare type PromiseFn<T, R> = (...args: T[]) => Promise<R>;
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
    VChart: (typeof import('vue-echarts'))['default'];
  }
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
