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
      path: '/merchant/:shopId',
      name: 'merchant',
      meta: { requireAuth: true },
      component: () => import('@/views/merchant/index')
    },

    {
      path: '/home',
      name: 'home',
      meta: { requireAuth: true },
      component: () => import('@/views/home/index')
    },

    {
      path: '/my',
      name: 'my',
      meta: { requireAuth: true },
      component: () => import('@/views/my/index')
    },

    {
      path: '/order-submit',
      name: 'orderSubmit',
      meta: { requireAuth: true },
      component: () => import('@/views/order/index')
    },
    
    {
      path: '/order-list',
      name: 'orderList',
      meta: { requireAuth: true },
      component: () => import('@/views/orderList/index')
    },
    {
      path: '/order-detail',
      name: 'orderDetail',
      meta: { requireAuth: true },
      component: () => import('@/views/orderList/detail')
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
