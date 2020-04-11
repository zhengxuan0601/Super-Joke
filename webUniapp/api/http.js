export default class Request {
  http (router, method, data) {
    const path = 'http://10.183.188.174:7025/invoice' //'/invoice'
    return new Promise((resolve,reject) => {
      uni.request({
        url: `${path}${router}`,
        data: data,
        method:method,
        success: (res) => {
          resolve(res.data)
        }
      })
    })    
  }
}