import type { SvgName } from '~virtual/svg-component';

declare global {
  interface CustomRouteMeta {
    title?: string;
    /** 是否展示该菜单 */
    hidden?: boolean; //
    /* 菜单图标 */
    icon?: SvgName;
    keepAlive?: boolean;
    /* 当只有一级子路由时默认不展示子路由,默认false */
    alwaysShow?: boolean;
    requiresAuth?: boolean;
    transitionName?: string;
    //菜单升序排序，值越高排的越后（只针对顶级路由）可选
    rank?: number;
  }

  interface AppRouteRecordRaw {
    /** 子路由地址 `必填` */
    path: string;
    /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
    name?: string;
    /** 路由重定向 `可选` */
    redirect?: string;
    /** 按需加载组件 `可选` */
    component?: RouteComponent;
    meta?: CustomRouteMeta;
    /** 子路由配置项 */
    children?: Array<AppRouteRecordRaw>;
  }
}

declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}
