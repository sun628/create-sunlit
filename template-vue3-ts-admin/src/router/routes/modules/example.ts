import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/example',
    name: 'example',
    redirect: '/example/echarts',
    meta: { title: '使用案例' },
    children: [
      {
        path: '/example/echarts',
        name: 'example/echarts',
        component: () => import('@/views/example/Echarts.vue'),
        meta: { title: 'echarts', icon: 'vite' }
      }
    ]
  }
];
export default routes;
