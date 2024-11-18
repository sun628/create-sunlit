import { Layout } from '@/router/helper/constant';
/**
 * @description 地图示例模块
 **/
export default [
  {
    path: '/map-example',
    name: 'map-example',
    component: Layout,
    redirect: '/map-example/marker',
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
