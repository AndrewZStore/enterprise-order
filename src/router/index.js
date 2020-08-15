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
      path: '/home',
      component: () => import('@/views/home/index')
    }
  ]
})
