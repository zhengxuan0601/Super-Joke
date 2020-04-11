import { CONTEXT_SERVEAPI, SUCCESS_CODE } from '@/config'

export default class Request {
  http(router, method, data) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${CONTEXT_SERVEAPI}${router}`,
        data: data,
        method: method,
        success: (res) => {
          if (res.data.errcode === SUCCESS_CODE) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}
