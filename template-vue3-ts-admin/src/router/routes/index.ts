import outsideRoutes from './outsideLayout.ts';
import type { RouteRecordRaw } from 'vue-router';

// const staticModules = import.meta.glob(['./modules/**/*.ts'], { eager: true });

export const LayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/home',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '根路由'
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/index',
      meta: { title: '首页', icon: 'ant-design:home-outlined' },
      children: [
        {
          path: '/home/index',
          name: 'home/index',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' }
        }
      ]
    },
    {
      path: '/example',
      name: 'example',
      redirect: '/example/echarts',
      meta: { title: '使用案例', icon: 'vite' },
      children: [
        {
          path: '/example/echarts',
          name: 'example/echarts',
          component: () => import('@/views/example/Echarts.vue'),
          meta: { title: 'echarts', icon: 'ant-design:bar-chart-outlined' }
        }
      ]
    }
  ]
};

export const basicRoutes: Array<RouteRecordRaw> = [
  LayoutRoutes,
  // Layout之外的路由
  ...outsideRoutes
];
