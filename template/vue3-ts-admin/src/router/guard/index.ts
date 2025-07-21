import type { Router } from 'vue-router';
import nprogress from 'nprogress';
import { Modal, notification } from 'ant-design-vue';
import 'nprogress/nprogress.css';
export function setupRouterGuards(router: Router) {
  createPageGuard(router);
  createProgressGuard(router);
  createMessageGuard(router);
}

// 页面加载
function createPageGuard(router: Router) {
  const loadedPage = new Map<string, boolean>();
  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPage.has(to.path);
    return true;
  });

  router.afterEach((to) => {
    loadedPage.set(to.path, true);
  });
}

// 进度条
function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    nprogress.start();
    return true;
  });

  router.afterEach(async () => {
    nprogress.done();
    return true;
  });
}

// 消息
function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll();
      notification.destroy();
    } catch (_) {
      /** nothing */
    }
  });
}
