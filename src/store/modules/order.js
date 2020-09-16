import { Notify } from 'vant'

const state = {
  // 当前点餐商家id
  shopId: '',
  // 当前选择点餐时间
  orderDate: "",
  // 当前选择点餐餐段
  currentEatType: "",
  // 购物车
  shoppingCart: []
}

const mutations = {
  SET_SHOPPINGCART: (state, shoppingCart) => {
    state.shoppingCart = shoppingCart
  },
  SET_ORDERDATE: (state, orderDate) => {
    state.orderDate = orderDate
  },
  SET_CURRENTEATTYPE: (state, currentEatType) => {
    state.currentEatType = currentEatType
  },
  SET_SHOPID: (state, shopId) => {
    state.shopId = shopId
  }
}

const actions = {
  setShoppingCart({ commit }, shoppingCartList) {
    commit('SET_SHOPPINGCART', shoppingCartList)
  },

  updateOrderDate({ commit }, orderDate) {
    commit('SET_ORDERDATE', orderDate)
  },

  updateCurrentEatType({ commit }, currentEatType) {
    commit('SET_CURRENTEATTYPE', currentEatType)
  },

  updateShopId({ commit }, shopId) {
    commit('SET_SHOPID', shopId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
