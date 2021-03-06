// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'
import './config/rem'


import '@/icons'
import '@/styles/index.scss' // global css
import './permission'


// 引进vant
Vue.use(Vant)

// 图片懒加载配置
import { Lazyload } from "vant"

Vue.use(Lazyload, {
	lazyComponent: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
