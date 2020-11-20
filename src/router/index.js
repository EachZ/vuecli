import Vue from 'vue'
import VueRouter from 'vue-router'
import ResourceLoadGraph from '../views/resourceLoadGraph.vue'
import OrderGanttGraph from '../views/orderGanttGraph'
import ResourceGanttGraph from '../views/resourceGanttGraph'
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
import AddOrderPage from '../views/addOrderPage';
import ModifyOrderPage from '../views/modifyOrderPage'
import DeleteOrderPage from '../views/deleteOrderPage'

import StaffPage from '../views/staffPage'
import AddStaffPage from '../views/addStaffPage';
import ModifyStaffPage from '../views/modifyStaffPage'
import DeleteStaffPage from '../views/deleteStaffPage'

import DevicePage from '../views/devicePage'
import AddDevicePage from '../views/addDevicePage';
import ModifyDevicePage from '../views/modifyDevicePage'
import DeleteDevicePage from '../views/deleteDevicePage'

import RoutingPage from '../views/routingPage'




Vue.use(VueRouter);

const routes = [
  {
    path: '/table1',
    name: 'Table1',
    component: () => import(/* webpackChunkName: "table1" */ '../views/table1.vue')
  },
  {
    path: '/resourceLoadGraph',
    name: 'ResourceLoadGraph',
    // component: ResourceLoadGraph
    component: () => import(/* webpackChunkName: "ResourceLoadGraph" */ '../views/resourceLoadGraph.vue')
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
    path:'/orderGanttGraph',
    name:'OrderGanttGraph',
    component: () => import(/* webpackChunkName: "OrderGanttGraph" */ '../views/orderGanttGraph.vue')
  },
  {
    path:'/resourceGanttGraph',
    name:'ResourceGanttGraph',
    component: () => import(/* webpackChunkName: "ResourceGanttGraph" */ '../views/resourceGanttGraph.vue')
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
    path:'/addOrderPage',
    name:'AddOrderPage',
    component: () => import(/* webpackChunkName: "addOrderPage" */ '../views/addOrderPage.vue')
  },
  {
    path:'/modifyOrderPage',
    name:'ModifyOrderPage',
    component: () => import(/* webpackChunkName: "modifyOrderPage" */ '../views/modifyOrderPage.vue')
  },
  {
    path:'/deleteOrderPage',
    name:'DeleteOrderPage',
    component: () => import(/* webpackChunkName: "deleteOrderPage" */ '../views/deleteOrderPage.vue')
  },
  {
    path:'/staffPage',
    name:'StaffPage',
    component: () => import(/* webpackChunkName: "staffPage" */ '../views/staffPage.vue')
  },
  {
    path:'/addStaffPage',
    name:'AddStaffPage',
    component: () => import(/* webpackChunkName: "addStaffPage" */ '../views/addStaffPage.vue')
  },
  {
    path:'/modifyStaffPage',
    name:'ModifyStaffPage',
    component: () => import(/* webpackChunkName: "modifyStaffPage" */ '../views/modifyStaffPage.vue')
  },
  {
    path:'/deleteStaffPage',
    name:'DeleteStaffPage',
    component: () => import(/* webpackChunkName: "deleteStaffPage" */ '../views/deleteStaffPage.vue')
  },
  {
    path:'/devicePage',
    name:'DevicePage',
    component: () => import(/* webpackChunkName: "devicePage" */ '../views/devicePage.vue')
  },
  {
    path:'/addDevicePage',
    name:'AddDevicePage',
    component: () => import(/* webpackChunkName: "addDevicePage" */ '../views/addDevicePage.vue')
  },
  {
    path:'/modifyDevicePage',
    name:'ModifyDevicePage',
    component: () => import(/* webpackChunkName: "modifyDevicePage" */ '../views/modifyDevicePage.vue')
  },
  {
    path:'/deleteDevicePage',
    name:'DeleteDevicePage',
    component: () => import(/* webpackChunkName: "deleteDevicePage" */ '../views/deleteDevicePage.vue')
  },
  {
    path:'/routing',
    name:'RoutingPage',
    component: () => import(/* webpackChunkName: "routingPage" */ '../views/routingPage.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router
