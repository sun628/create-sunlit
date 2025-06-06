export * from './modules/app';
export * from './modules/user';

import type { App } from 'vue';
import { createPersistedState } from 'pinia-plugin-persistedstate';

interface initStoreConfig {
  namespace: string;
}

export const store = createPinia();

export function setupStore(app: App<Element>, { namespace }: initStoreConfig) {
  const persistedState = createPersistedState({ key: (id) => `${namespace}:${id}` });

  store.use(persistedState);
  app.use(store);
}
