import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const Vue = createApp(App)
Vue.config.globalProperties.$http = 'WO是大帅给'
Vue
    .use(store)
    .use(router)
    .mount('#app')
