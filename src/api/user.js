import request from "@/utils/request"
 
/**
 * 登录
 * @param params
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: "/manager/app/login",
    method: "post",
    data
  });
}

/**
 * 获取门店列表
 * @param params
 * @returns {AxiosPromise}
 */

// 查询门店列表
export function getShop(data) {
  return request({
    url: "/manager/app/getShop",
    method: "post",
    data
  });
}

// home轮播
export function getImgList(data) {
  return request({
    url: "/manager/app/getImgList",
    method: 'post',
    data
  })
}

// 订单列表
export function getOrderList(data) {
  return request({
    url: "/manager/app/getOrderList",
    method: 'post',
    data
  })
}

// 查询订单详情
export function getOrderDetail(data) {
  return request({
    url: "/manager/app/getOrderDetail",
    method: "post",
    data
  })
}


// 查询企业餐段时间
export function getEatTime(data) {
  return request({
    url: "/manager/app/getEatTime",
    method: 'post',
    data
  })
}


// 查询门店菜单
export function getMenu(data) {
  return request({
    url: '/manager/app/getMenu',
    method: 'post',
    data
  })
}


// 提交订单
export function submitOrder(data) {
  return request({
    url: '/manager/app/submit',
    method: 'post',
    data
  })
}


// 查询地址
export function getAddress(data) {
  return request({
    url: '/manager/app/getAddress',
    method: 'post',
    data
  })
}

// 修改密码
export function modifyPwd(data) {
  return request({
    url: '/manager/app/resetPassword',
    method: 'post',
    data
  })
}

// 获取openid
export function getOpenId(data) {
  return request({
    url: '/manager/app/getOpenid',
    method: 'post',
    data
  })
}

// 投诉建议
export function submitComplain(data) {
  return request({
    url: '/manager/app/addComment',
    method: 'post',
    data
  })
}

// 投诉类型
// 投诉建议
export function ComplainType(data) {
  return request({
    url: '/manager/app/queryCommentType',
    method: 'post',
    data
  })
}

// 取消订单
export function cancelOrderApi(data) {
  return request({
    url: '/manager/app/cancelOrder',
    method: 'post',
    data
  })
}
