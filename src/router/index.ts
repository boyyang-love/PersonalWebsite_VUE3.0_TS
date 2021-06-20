import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import { ElMessage } from "element-plus";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { auth: ['admin'] }
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import(/* webpackChunkName: "center" */ '../views/Center.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
    meta: {auth: ['admin']}
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
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/blog.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const authList = store.getters.authList

  if (to.meta.auth && to.meta.auth.length != 0) {
    if (authList.includes(...to.meta.auth)) {
      next()
    } else {
      ElMessage({
        type: 'warning',
        message: '您无权限访问！'
      })
      return
    }
  } else {
    next()
  }
})

export default router
