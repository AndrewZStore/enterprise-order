import { login } from '@/api/user'
import { Notify } from 'vant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { encrypt } from '@/utils/encrypt'
import router, { resetRouter } from '@/router'


const state = {
  token: getToken(),
  // 公司id
  orgId: "",
  // 系统编码
  sysId: "",
  // 用户id
  userId: "",
  // 用户名称
  userName: "",
  // 用户部门
  deptName: "",
  // 用户手机
  userPhone: "",
  // 用户头像
  headImg: ""
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_SYSID: (state, sysId) => {
    state.sysId = sysId
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_DEPTNAME: (state, deptName) => {
    state.deptName = deptName
  },
  SET_USERPHONE: (state, userPhone) => {
    state.userPhone = userPhone
  },
  SET_HEADIMG: (state, img) => {
    state.headImg = img
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: encrypt(password) }).then(response => {
        const { sysId, userName, userId, orgId, token, deptName } = response
        if (token) {
          commit('SET_TOKEN', response.token)
          commit('SET_ORGID', orgId)
          commit('SET_SYSID', sysId)
          commit('SET_USERID', userId)
          commit('SET_USERNAME', userName)
          commit('SET_DEPTNAME', deptName)
          commit('SET_USERPHONE', username)

          setToken(response.token)
          resolve()
        } else {
          Notify({ 
            type: 'danger', 
            message: '登录失败',
            duration: 10000,
          })
          reject("登录错误")
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ORGID', '')
      commit('SET_SYSID', '')
      commit('SET_USERID', '')
      commit('SET_USERNAME', '')
      commit('SET_DEPTNAME', '')
      commit('SET_USERPHONE', '')

      removeToken()
      resetRouter()

      dispatch('cacheViews/delAllCachedViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
