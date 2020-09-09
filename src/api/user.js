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

// 餐段查询
export function getMealTime(data) {
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