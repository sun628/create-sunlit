import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css'; // css reset
import '@/assets/styles/index.less';
import '@/utils/rem';
import router from '@/router';
import pinia from '@/store/index';
import directives from '@/directives/index'; // custom directives
import SvgIcon from '~virtual/svg-component';
import VChart from 'vue-echarts';

const app = createApp(App);

app.component(SvgIcon.name!, SvgIcon);
app.component('VChart', VChart);

app.use(router).use(pinia).use(directives);
app.mount('#app');
