import axios from "axios";
import store from '@/store/index'
import { Notify } from 'vant'


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


service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const res = response.data
      return res
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify({ 
      type: 'danger', 
      message: error.message,
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service