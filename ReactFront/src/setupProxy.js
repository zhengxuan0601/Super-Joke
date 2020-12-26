const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/invoice', {
    target: 'http://10.183.188.174:7025/invoice',
    changeOrigin: true,
    pathRewrite: {
      '^/invoice': ''
    }
  }))
}