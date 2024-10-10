import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
// 地图示例模块
const MapExampleRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/map-example',
    meta: { hidden: true },
    children: [
      {
        path: '/map-example',
        name: '/map-example',
        redirect: '/map-example/driving',
        component: () => import('@/views/map-example/index.vue'),
        meta: { title: '地图示例', keepAlive: true, icon: 'vite', alwaysShow: true },
        children: [
          {
            path: 'driving',
            name: 'driving',
            component: () => import('@/views/map-example/driving/index.vue'),
            meta: { title: '路径规划', keepAlive: true },
          },
        ],
      },
    ],
  },
];

export default MapExampleRouter;
