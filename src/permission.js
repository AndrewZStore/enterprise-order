import router from '@/router'
import store from '@/store'
import { Notify } from 'vant'
import { getToken } from '@/utils/auth'


router.beforeEach(async(to, from, next) => {
  if (to.meta.requireAuth) {
    const hasToken = getToken()
    if (hasToken) {
      next()
    } else {
      Notify({ 
        type: 'danger', 
        message: '请您先登录',
        duration: 3000,
      })
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // todo
})
