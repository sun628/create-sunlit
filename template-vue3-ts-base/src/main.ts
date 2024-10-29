import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css'; // css reset
import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/index.less';
import '@/utils/browser';
import router from '@/router';
import pinia from '@/store/index';
import directives from '@/directives/index'; // custom directives
import SvgIcon from '~virtual/svg-component';

const app = createApp(App);

app.component(SvgIcon.name!, SvgIcon);

app.use(router).use(pinia).use(directives);
app.mount('#app');
