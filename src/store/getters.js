const getters = {
  token: state => state.user.token,
  openid: state => state.user.openid,
  orgId: state => state.user.orgId,
  sysId: state => state.user.sysId,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  deptName: state => state.user.deptName,
  userPhone: state => state.user.userPhone,
  orderDate: state => state.order.orderDate,
  currentEatType: state => state.order.currentEatType,
  shopId: state => state.order.shopId,
  shoppingCart: state => state.order.shoppingCart,
  cachedViews: state => state.cacheViews.cachedViews
}

export default getters
