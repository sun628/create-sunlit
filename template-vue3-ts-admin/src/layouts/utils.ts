import { RouteRecordRaw } from 'vue-router';

// prettier-ignore
// eslint-disable-next-line no-useless-escape
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string) => reg.test(path);

type MenuData = {
  menuData: RouteRecordRaw[];
  breadcrumb: Record<string, RouteRecordRaw>;
};
const formatRelativePath = (
  routes: RouteRecordRaw[],
  breadcrumb: Record<string, RouteRecordRaw>,
  parent?: RouteRecordRaw
) => {
  return routes.map((route) => {
    if (isUrl(route.path)) {
      return route;
    }
    const hasRelativePath = route.path.startsWith('/');
    if (!hasRelativePath) {
      if (parent) {
        route.path = `${parent.path || ''}/${route.path}`;
      } else {
        route.path = `/${route.path}`;
      }
    }
    route.path = route.path.replace('//', '/');
    if (route.children && route.children.length > 0) {
      route.children = formatRelativePath(route.children, breadcrumb, route);
    }
    breadcrumb[`${route.path}`] = route;
    return route;
  });
};

export function clearMenuItem(menusData: RouteRecordRaw[]): RouteRecordRaw[] {
  return menusData
    .map((item) => {
      let _a, _b;
      const finalItem = { ...item };
      if (!finalItem.name || ((_a = finalItem.meta) == null ? void 0 : _a.hideInMenu)) {
        return null;
      }
      if (finalItem && (finalItem == null ? void 0 : finalItem.children)) {
        if (
          !((_b = finalItem.meta) == null ? void 0 : _b.hideChildInMenu) &&
          finalItem.children!.some((child) => {
            let _a2;
            return child && child.name && !((_a2 = child.meta) == null ? void 0 : _a2.hideInMenu);
          })
        ) {
          return {
            ...item,
            children: clearMenuItem(finalItem.children!)
          };
        }
        delete finalItem.children;
      }
      return finalItem;
    })
    .filter((item) => item) as RouteRecordRaw[];
}

export const getMenuData = (routes: RouteRecordRaw[]): MenuData => {
  const childrenRoute = routes.find((route) => route.path === '/');
  const breadcrumb = {};
  const menuData = formatRelativePath(
    (childrenRoute == null ? void 0 : childrenRoute.children) || [],
    breadcrumb
  );
  return {
    menuData,
    breadcrumb
  };
};
