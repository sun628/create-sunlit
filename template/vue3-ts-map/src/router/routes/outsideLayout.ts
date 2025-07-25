import { RouterView, type RouteRecordRaw } from 'vue-router';
import { router } from '@/router';
/**
 * 重定向路由 主要用于刷新当前页面
 */
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  meta: {
    title: 'Redirect',
    hideInBreadcrumb: true,
    hideInMenu: true
  },
  children: [
    {
      path: ':path(.*)',
      name: 'Redirect',
      component: RouterView,
      meta: {
        title: 'Redirect',
        hideInMenu: true
      },
      beforeEnter: (to) => {
        const { params, query } = to;
        const { path, redirectType = 'path' } = params;

        Reflect.deleteProperty(params, '_redirect_type');
        Reflect.deleteProperty(params, 'path');

        const _path = Array.isArray(path) ? path.join('/') : path;
        console.log('🚀 ~ _path:', _path);
        setTimeout(() => {
          if (redirectType === 'name') {
            router.replace({
              name: _path,
              query,
              params
            });
          } else {
            router.replace({
              path: _path.startsWith('/') ? _path : `/${_path}`,
              query
            });
          }
        });
        return true;
      }
    }
  ]
};

export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  meta: {
    title: 'PageNotFound',
    hideInMenu: true,
    hideInTabs: true
  },
  component: () => import('@/views/error/404.vue')
};

/**
 * layout布局之外的路由
 */
export const outsideRoutes: Array<RouteRecordRaw> = [REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];

export default outsideRoutes;
