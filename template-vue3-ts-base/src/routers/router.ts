import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import { Layout } from './constant';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    transitionName?: string;
  }
}
// 导入模块路由
// const metaRouters = import.meta.glob('./modules/*.ts', { eager: true });

// 处理路由表
// export const routerArray: RouteRecordRaw[] = [];
// Object.keys(metaRouters).forEach((item) => {
// 	Object.keys(metaRouters[item] as object).forEach((key) => {
// 		routerArray.push(...(metaRouters[item] as any)[key]);
// 	});
// });

/**
 * @description 路由配置简介（💢没有使用动态路由，路由全部配置在本地，需要使用动态路由请自行改造）
 * @param path ==> 路由路径
 * @param name ==> 路由名称
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.requiresAuth ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/example',
  },
  // ...routerArray,
  {
    path: '/example',
    name: 'example',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '地圖示例', keepAlive: true },
  },

  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    // redirect: { name: '404' },
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
