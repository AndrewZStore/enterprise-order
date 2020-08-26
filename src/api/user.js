
import request from "@/utils/request";
 
/**
 * 登录
 * @param params
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: "app/login",
    method: "post",
    data
  });
}

/**
 * 获取会员列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getTimeQuantum(data) {
  return request({
    url: "app/getEatTime",
    method: "post",
    data
  });
}