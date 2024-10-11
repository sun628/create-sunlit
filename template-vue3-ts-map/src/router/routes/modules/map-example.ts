import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
// 地图示例模块
const MapExampleRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: { title: '地图示例', icon: 'vite' },
    children: [
      {
        path: 'marker',
        name: 'marker',
        component: () => import('@/views/map-example/marker/index.vue'),
        meta: { title: '点标记（Marker）' },
      },
      {
        path: 'driving',
        name: 'driving',
        component: () => import('@/views/map-example/driving/index.vue'),
        meta: { title: '路径规划(Driving)' },
      },
    ],
  },
];

export default MapExampleRouter;
