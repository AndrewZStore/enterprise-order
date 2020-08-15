
import request from "@/utils/request";
 
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
