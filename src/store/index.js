import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import order from './modules/order'
import cacheViews from './modules/cacheViews'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    order,
    cacheViews
  },
  getters
})

export default store
