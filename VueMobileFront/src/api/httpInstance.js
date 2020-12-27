import axios from 'axios'
import { REQUEST_SUCCESS } from '../config'
import { Toast } from 'vant'
const http = axios.create({
  timeout: 5000,
  withCredentials: true
})

// 相应拦截器
http.interceptors.response.use(function (response) {
  // 请求多语言的json文件
  if (/.*\.json$/.test(response.config.url)) {
    return response
  }

  // 返回的是文件二进制流  用blob接收  直接返回不做其它处理
  if (response.headers['content-disposition'] && response.headers['content-disposition'].includes('attachment')) {
    return response
  }
  // 对错误进行统一处理
  if (response.data.code !== REQUEST_SUCCESS) {
    Toast.fail(response.data.message)
    return Promise.reject(response)
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.message,
    data: response.data.data
  })
}, function (error) {
  if (error.message.indexOf('timeout') > -1) {
    // 多语言需要自己在项目中配置
    // eslint-disable-next-line
    Toast.fail('请求超时，请重试！')
  }
  // http返回401的错误状态也认为是登录过期
  let res = error.response || {}
  let message = res.statusText || '错误的请求'
  // 对响应错误做点什么
  return Promise.reject(new Error(message))
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
