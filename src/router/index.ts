import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import(/* webpackChunkName: "center" */ '../views/Center.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import(/* webpackChunkName: "music" */ '../views/Music.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "music" */ '../views/Login.vue')
  },
  {
    path: '/musiclistdetail',
    name: 'MusiclistDetail',
    component: () => import(/* webpackChunkName: "music" */ '../views/MusiclistDetail.vue')
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
