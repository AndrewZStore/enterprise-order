import request from "@/utils/request";
 
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



