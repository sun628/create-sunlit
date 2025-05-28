import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/index',
    meta: { title: '首页' },
    children: [
      {
        path: '/home/index',
        name: 'home/index',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'vite' }
      }
    ]
  }
];
export default routes;
