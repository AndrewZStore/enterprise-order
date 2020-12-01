import axios from "axios";
import { getToken } from '@/utils/auth'
import { Notify } from 'vant'
import { encrypt, decrypt } from '@/utils/encrypt'

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 环境变量base接口地址 url = base url + request url
  withCredentials: true, // 跨域请求时发送Cookie
  timeout: 6000, // 请求超时
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
})


service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    if (config.data) {
      config.data = encrypt(JSON.stringify(config.data))
      console.log(config.data)
    } else if (config.params) {
      var rs = encrypt(config.params)
      config.params = { param: rs.encoded }
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
      const resp = JSON.parse(decrypt(res))
      console.log(resp)
      return resp
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