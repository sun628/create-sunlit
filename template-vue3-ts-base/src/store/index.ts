import { createPinia } from 'pinia';

import piniaPluginPersist from 'pinia-plugin-persistedstate';

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersist);

export default pinia;
