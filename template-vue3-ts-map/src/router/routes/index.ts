import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// 导入模块路由
const metaRouters = import.meta.glob('./modules/*.ts', { eager: true });

// 处理路由表
export const routerArray: AppRouteRecordRaw[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item] as object).forEach((key) => {
    routerArray.push(...(metaRouters[item] as any)[key]);
  });
});

export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    meta: {
      hidden: true,
    },
  },
  {
    // 找不到路由重定向到 404 页面
    path: '/:pathMatch(.*)',
    // redirect: { name: '404' },
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true },
  },
  ...routerArray,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[],
  strict: false,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
