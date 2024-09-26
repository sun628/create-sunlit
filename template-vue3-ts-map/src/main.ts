import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routers';
import pinia from '@/store/index';
import GlobalComp from '@/components/index';
import 'virtual:uno.css'; // css reset
import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/index.less';
import '@/utils/browser';
import directives from '@/directives/index'; // custom directives

const app = createApp(App);
app.use(GlobalComp); //批量注册全局组件

app.use(router).use(pinia).use(directives).mount('#app');
