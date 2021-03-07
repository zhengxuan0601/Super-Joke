module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  // 用于开发环境下与后端联调
  devServer: {
    open: false,
    port: 8000,
    proxy: {
      '/feedbook': {
        ws: false,
        target: 'http://localhost:3000/feedbook',
        changeOrigin: true,
        pathRewrite: {
          '^/feedbook/': ''
        }
      }
    }
  }
}
