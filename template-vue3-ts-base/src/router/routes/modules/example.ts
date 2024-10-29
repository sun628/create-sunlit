import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
// 地图示例模块
const HomeRouter: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    meta: { title: '首页', hidden: true },
    children: [
      {
        path: '/home/index',
        name: 'home/index',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'vite' },
      },
    ],
  },
];

export default HomeRouter;
