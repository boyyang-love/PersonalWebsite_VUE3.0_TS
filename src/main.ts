import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/LoadingBox/index.vue'
import lazyLoad from '@/plugins/index'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {DB, IMG, AUTH} from '@/db/db.ts'

const app = createApp(App)
// 加载组件
app.component('loading', Loading)
app.provide('db', DB)
app.provide('imgUpload', IMG)
app.provide('auth', AUTH)
app
    .use(store)
    .use(router)
    .use(lazyLoad)
    .use(ElementPlus)
    .mount('#app')
