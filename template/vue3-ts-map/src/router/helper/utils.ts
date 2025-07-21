import { isNil } from 'lodash-es';

/**
 * @function
 * @description 判断是否需要排序
 **/
export function handRank(routeInfo: AppRouteRecordRaw) {
  return isNil(routeInfo.meta?.rank);
}

/** 按照路由中meta下的rank等级升序来排序路由 */
export function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
    if (handRank(v)) v.meta.rank = index + 2;
  });
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta.rank - b?.meta.rank;
  });
}

export function generateRoutes(routes: any): AppRouteRecordRaw[] {
  const routerArray: AppRouteRecordRaw[] = [];
  Object.keys(routes).forEach((item) => {
    Object.keys(routes[item] as object).forEach((key) => {
      routerArray.push(...(routes[item] as any)[key]);
    });
  });
  return ascending(routerArray);
}
