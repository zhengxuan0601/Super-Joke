const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = {
  // publicPath: process.env.VUE_APP_CONTEXT,
  // assetsDir: process.env.VUE_APP_ASSETS,
  publicPath: './',
  runtimeCompiler: true,
  devServer: {
    open: false,
    port: 8000,
    // 用于开发环境下与后端联调
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
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1'
            ]
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      ]
    }
  }
}
