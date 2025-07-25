import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { setupRouterGuards } from './guard';
import { basicRoutes } from './routes';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes
});

export function setupRouter(app: App) {
  setupRouterGuards(router);
  app.use(router);
}

export default router;
