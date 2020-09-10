import { login } from '@/api/user'
import { Notify } from 'vant'
import { setToken } from '@/utils/auth'


const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        if (response.token) {
          commit('SET_TOKEN', response.token)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
