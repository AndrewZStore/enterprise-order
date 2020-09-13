import { Notify } from 'vant'

const state = {
  shoppingCart: []
}

const mutations = {
  SET_SHOPPINGCART: (state, shoppingCart) => {
    state.shoppingCart = shoppingCart
  }
}

const actions = {
  setShoppingCart({ commit }, shoppingCartList) {
    commit('SET_SHOPPINGCART', shoppingCartList)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
