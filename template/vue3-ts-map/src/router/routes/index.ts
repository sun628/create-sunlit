import outsideLayout from './outsideLayout.ts';
import type { RouteRecordRaw } from 'vue-router';
import example from './modules/example';

/**
 * @description: 路由配置
 * @author: wangyang
 * @date: 2023-11-01
 */
export const LayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/home',
  component: () => import('@/layouts/index.vue'),
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/introduction.vue'),
      meta: {
        title: '首页',
        icon: 'home-outlined'
      }
    },
    example
  ]
};

export const basicRoutes: Array<RouteRecordRaw> = [
  LayoutRoutes,
  // Layout之外的路由
  ...outsideLayout
];

export default basicRoutes;
