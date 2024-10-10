import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
// 地图示例模块
const MapExampleRouter: RouteRecordRaw[] = [
  {
    path: '/map-example',
    name: 'map-example',
    redirect: '/map-example/driving',
    component: Layout,
    meta: { title: '地图示例', keepAlive: true, icon: 'vite', alwaysShow: true },
    children: [
      {
        path: 'driving',
        name: 'driving',
        component: () => import('@/views/map-example/index.vue'),
        meta: { title: '路径规划', keepAlive: true },
      },
    ],
  },
];

export default MapExampleRouter;
