export const LOGIN_NAME = 'Login';
// 路由白名单
export const routerWhiteList = ['/403', '/404', '/500', '/layout', '/login'] as const; // no redirect whitelist

export type RouterWhiteList = typeof routerWhiteList;

export type RouterWhiteName = (typeof routerWhiteList)[number];
