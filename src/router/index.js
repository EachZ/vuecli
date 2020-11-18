import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Page1 from '../views/page1'
import Page2 from '../views/page2'
import Page3 from '../views/page3'
import Page5 from '../views/page5'
import Page6 from '../views/page6'
import Page7 from '../views/page7'
import Page8 from '../views/page8'
import Table1 from '../views/table1'
import Table2 from '../views/table2'
import Table3 from '../views/table3'
import Table4 from '../views/table4'
import OrderPage from '../views/orderPage'
import StaffPage from '../views/staffPage'
import DevicePage from '../views/devicePage'
import RoutingPage from '../views/routingPage'




Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Table1',
    component: () => import(/* webpackChunkName: "table1" */ '../views/table1.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/page1',
    name:'Page1',
    component: () => import(/* webpackChunkName: "page1" */ '../views/page1.vue')
  },
  {
    path:'/page2',
    name:'Page2',
    component: () => import(/* webpackChunkName: "page2" */ '../views/page2.vue')
  },
  {
    path:'/page3',
    name:'Page3',
    component: () => import(/* webpackChunkName: "page3" */ '../views/page3.vue')
  },
  {
    path:'/page6',
    name:'Page6',
    component: () => import(/* webpackChunkName: "page6" */ '../views/page6.vue')
  },
  {
    path:'/page7',
    name:'Page7',
    component: () => import(/* webpackChunkName: "page7" */ '../views/page7.vue')
  },
  {
    path:'/page8',
    name:'Page8',
    component: () => import(/* webpackChunkName: "page8" */ '../views/page8.vue')
  },
  {
    path:'/temp',
    name:'Temp',
    component: () => import(/* webpackChunkName: "temp" */ '../views/temp.vue')
  },
  // {
  //   path:'/table1',
  //   name:'Table1',
  //   component:Table1
  // },
  {
    path:'/table2',
    name:'Table2',
    component: () => import(/* webpackChunkName: "table2" */ '../views/table2.vue')
  },
  {
    path:'/table3',
    name:'Table3',
    component: () => import(/* webpackChunkName: "table3" */ '../views/table3.vue')
  },
  {
    path:'/table4',
    name:'Table4',
    component: () => import(/* webpackChunkName: "table4" */ '../views/table4.vue')
  },
  {
    path:'/orderPage',
    name:'OrderPage',
    component: () => import(/* webpackChunkName: "orderPage" */ '../views/orderPage.vue')
  },
  {
    path:'/staffPage',
    name:'StaffPage',
    component: () => import(/* webpackChunkName: "staffPage" */ '../views/staffPage.vue')
  },
  {
    path:'/devicePage',
    name:'DevicePage',
    component: () => import(/* webpackChunkName: "devicePage" */ '../views/devicePage.vue')
  }
  ,
  {
    path:'/routingPage',
    name:'RoutingPage',
    component: () => import(/* webpackChunkName: "routingPage" */ '../views/routingPage.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router
