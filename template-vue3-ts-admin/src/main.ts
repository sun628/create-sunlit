import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css'; // css reset
import '@/assets/styles/index.less';
import { setupRouter } from './router';
import { setupStore } from './store';
import directives from '@/directives/index'; // custom directives
import VChart from 'vue-echarts';
import { loadEnv } from './utils';

const app = createApp(App);
const env = loadEnv();
console.log('🚀 ~ env:', env);

setupStore(app, { namespace: env.VITE_APP_NAMESPACE + env.MODE });
setupRouter(app);

app.component('VChart', VChart);
app.use(directives);
app.mount('#app');
