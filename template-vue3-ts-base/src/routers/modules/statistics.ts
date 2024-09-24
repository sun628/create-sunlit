import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';

// 统计模块
const statisticsRouter: Array<RouteRecordRaw> = [
  {
    path: '/statistics',
    name: 'Statistics',
    component: Layout,
    redirect: '/statistics',
    children: [
      {
        path: '/statistics',
        name: 'Statistics',
        redirect: '/statistics/page1',
        component: () => import('@/views/statistics/index.vue'),
        meta: {
          keepAlive: true,
          title: '报表统计',
        },
        children: [
          {
            path: 'page1',
            name: 'Page1',
            component: () => import('@/views/statistics/module/Page1.vue'),
            meta: {
              title: 'page1',
              keepAlive: true,
            },
          },
        ],
      },
    ],
  },
];

export default statisticsRouter;
