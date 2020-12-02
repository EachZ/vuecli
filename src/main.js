import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'ant-design-vue/dist/antd.css';
import ant from 'ant-design-vue'
Vue.use(ant);

import router from './router'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

//引入axios
import axios from 'axios'

Vue.config.productionTip = false;

//配置请求的根路径
axios.defaults.baseURL="/api";
Vue.prototype.$axios=axios;

//在main.js引入qs
import  qs from 'qs'

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象

Vue.prototype.$qs = qs

import VueResource from 'vue-resource'
Vue.use(VueResource);

//设置全局highcharts
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue);
import Highcharts from 'highcharts'
import xrange from 'highcharts/modules/xrange'
import loadExporting from 'highcharts/modules/exporting'
import exportExcel from 'highcharts/modules/export-data.src'
xrange(Highcharts);
loadExporting(Highcharts);
exportExcel(Highcharts);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
