import { createStore } from 'vuex'
import getters from './getters'

// 模块
import music from './music'
import auth from './auth'
export default createStore({
  modules: {
    music,
    auth
  },
  getters
})
