import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    meta:{title:'home'},
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta:{title:'about'},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/naive',
    name:'naive',
    meta:{title:'naive'},
    component:()=>import('../views/Naive.vue')
  },
  {
    path:'/canvas',
    name:'canvas',
    meta:{title:'canvas'},
    component:()=>import('../views/Canvas.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title?<string>to.meta.title:'vue-ts-template'
  if(to.path==='/'){
    next({path:'/home'})
  }else{
    next()
  }
})
export default router
