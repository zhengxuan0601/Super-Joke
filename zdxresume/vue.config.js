module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  // 用于开发环境下与后端联调
  devServer: {
    open: false,
    port: 8000,
    proxy: {
      '/invoice': {
        ws: false,
        target: 'http://10.183.188.174:7025/invoice',
        changeOrigin: true,
        pathRewrite: {
          '^/invoice/': ''
        }
      }
    }
  }
}
