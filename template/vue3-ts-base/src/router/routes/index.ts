import outsideLayout from './outsideLayout.ts';
import type { RouteRecordRaw } from 'vue-router';

// const staticModules = import.meta.glob(['./modules/**/*.ts'], { eager: true });

export const LayoutRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  redirect: '/home',
  component: () => import('@/layouts/index.vue'),
  meta: { title: '首页', icon: 'ant-design:home-outlined' },
  children: [
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/introduction',
      meta: { title: '首页', icon: 'ant-design:home-outlined' },
      children: [
        {
          path: '/home/introduction',
          name: 'home/introduction',
          component: () => import('@/views/home/introduction.vue'),
          meta: { title: '介绍' }
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
        },
        {
          path: '/example/schema-form',
          name: 'example/schema-form',
          component: () => import('@/views/example/SchemaForm.vue'),
          meta: { title: 'schema-form', icon: 'ant-design:form-outlined' }
        },
        {
          path: '/example/message',
          name: 'example/message',
          component: () => import('@/views/example/Message.vue'),
          meta: { title: 'message', icon: 'ant-design:message-outlined' }
        }
      ]
    }
  ]
};

export const basicRoutes: Array<RouteRecordRaw> = [
  LayoutRoutes,
  // Layout之外的路由
  ...outsideLayout
];
