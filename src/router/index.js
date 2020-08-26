import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/',
  		redirect: '/login'
  	},
    {
    	path: '/login',
    	component: () => import('@/views/login/index')
    },
    {
      path: '/merchant',
      component: () => import('@/views/merchant/index')
    },
    {
      path: '/home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/my',
      component: () => import('@/views/my/index')
    }
  ]
})
