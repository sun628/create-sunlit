import type { Router } from 'vue-router';

export function setupRouterGuards(router: Router) {
  router.onError((error) => {
    console.error('路由错误', error);
  });
}
