import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Page1 from '../views/page1'
import Page2 from '../views/page2'
import Page3 from '../views/page3'
import Page5 from '../views/page5'
import Page6 from '../views/page6'
import Page7 from '../views/page7'
import Table1 from '../views/table1'
import Table2 from '../views/table2'
import Table3 from '../views/table3'
import Table4 from '../views/table4'




Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Table1',
    component: Table1
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
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
    component:Page1
  },
  {
    path:'/page2',
    name:'Page2',
    component:Page2
  },
  {
    path:'/page3',
    name:'Page3',
    component:Page3
  },
  {
    path:'/page6',
    name:'Page6',
    component:Page6
  },
  {
    path:'/page7',
    name:'Page7',
    component:Page7
  },
  // {
  //   path:'/table1',
  //   name:'Table1',
  //   component:Table1
  // },
  {
    path:'/table2',
    name:'Table2',
    component:Table2
  },
  {
    path:'/table3',
    name:'Table3',
    component:Table3
  },
  {
    path:'/table4',
    name:'Table4',
    component:Table4
  }
];

const router = new VueRouter({
  routes
});

export default router
