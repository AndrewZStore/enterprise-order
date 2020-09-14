const getters = {
  token: state => state.user.token,
  orgId: state => state.user.orgId,
  sysId: state => state.user.sysId,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  deptName: state => state.user.deptName,
  userPhone: state => state.user.userPhone,
  shoppingCart: state => state.shop.shoppingCart,
  cachedViews: state => state.cacheViews.cachedViews
}

export default getters
