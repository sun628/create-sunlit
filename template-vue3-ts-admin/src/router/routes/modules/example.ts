import { Layout } from '@/router/helper/constant';

const routes: AppRouteRecordRaw[] = [
  {
    path: '/example',
    name: 'example',
    component: Layout,
    redirect: '/example/table',
    meta: { title: '使用案例', alwaysShow: true },
    children: [
      {
        path: '/example/echarts',
        name: 'example/echarts',
        component: () => import('@/views/example/Echarts.vue'),
        meta: { title: 'echarts', icon: 'vite' },
      },
    ],
  },
];
export default routes;
