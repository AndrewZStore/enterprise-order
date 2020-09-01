import axios from "axios";
import store from '@/store/index'

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 环境变量base接口地址 url = base url + request url
  withCredentials: true, // 跨域请求时发送Cookie
  timeout: 60000, // 请求超时
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
 
axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

/**
 * 全局 响应拦截器, 支持添加多个拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 * @param {Object} res 请求返回的数据
 * @return {Promise<reject>}
 */
service.interceptors.response.use(
  response => {
    const { data, status } = response
    if (status === 200) {
      return data
    } else if (status === 400) {
      return Promise.reject(new Error("请求错误"))
    } else if (status === 401) {
      return Promise.reject(new Error("请求未授权"))
    } else if (status === 403) {
      return Promise.reject(new Error("拒绝请求"))
    } else if (status === 500) {
      return Promise.reject(new Error("服务器错误"))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service