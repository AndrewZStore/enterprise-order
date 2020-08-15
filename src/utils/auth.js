import Cookies from "js-cookie";
 
const TokenKey = "vue_admin_token";
 
/**
 * 获取TOKEN
 * @returns {*}
 */
export function getToken() {
  return Cookies.get(TokenKey);
}
 
/**
 * 设置TOKEN
 * @param token {String}
 * @returns {*}
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
 
/**
 * 移除TOKEN
 * @returns {*}
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}