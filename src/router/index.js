import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes = [
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
    },

    {
      path: '/orderList',
      component: () => import('@/views/orderList/index'),
      children: [
        {
          path: '/detail',
          component: () => import('@/views/orderList/detail')
        }
      ]

    }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  // mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
