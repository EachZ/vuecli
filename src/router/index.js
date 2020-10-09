import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Page1 from '../views/page1'
import Page2 from '../views/page2'
import Page3 from '../views/page3'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  }
]

const router = new VueRouter({
  routes
})

export default router
