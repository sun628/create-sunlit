import type { App, Plugin } from 'vue';
import Loading from '@/components/basic/loading';
// import VueEcharts from 'vue-echarts';
// 获取所有组件，该方法返回一个对象
const GlobalComp: Plugin = {
  install(app: App) {
    // app.component('VueEcharts', VueEcharts);
    app.component('Loading', Loading);
  },
};

export default GlobalComp;
