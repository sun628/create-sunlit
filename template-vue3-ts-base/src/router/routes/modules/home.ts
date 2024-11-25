import { Layout } from '@/router/helper/constant';

export default [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/index',
    meta: { title: '首页', hidden: true, rank: 0 },
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
