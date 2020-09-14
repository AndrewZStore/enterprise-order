import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shop from './modules/shop'
import cacheViews from './modules/cacheViews'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    shop,
    cacheViews
  },
  getters
})

export default store
