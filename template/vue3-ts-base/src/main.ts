import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css'; // css reset
import '@/assets/styles/index.less';
import '@/utils/rem';
import { setupRouter } from './router';
import { setupStore } from './store';
import directives from '@/directives/index'; // custom directives
import VChart from 'vue-echarts';

const app = createApp(App);

setupStore(app, { namespace: import.meta.env.VITE_APP_NAMESPACE + import.meta.env.MODE });
setupRouter(app);

app.component('VChart', VChart);
app.use(directives);
app.mount('#app');
