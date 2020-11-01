import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'ant-design-vue/dist/antd.css';
import ant from 'ant-design-vue'
Vue.use(ant);

import router from './router'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


import axios from 'axios'

//配置请求的根路径
axios.defaults.baseURL="http://localhost:8080/";
Vue.prototype.$axios=axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
