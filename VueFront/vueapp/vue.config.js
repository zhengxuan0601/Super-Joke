module.exports = {
  // publicPath: process.env.VUE_APP_CONTEXT,
  // assetsDir: process.env.VUE_APP_ASSETS,
  publicPath: './',
  runtimeCompiler: true,
  // 用于开发环境下与后端联调
  // 如有需要, 还可以配合easy-proxy进行使用
  devServer: {
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
