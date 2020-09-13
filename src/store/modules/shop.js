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
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
