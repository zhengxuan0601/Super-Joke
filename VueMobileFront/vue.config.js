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
      '/feedbook': {
        ws: false,
        target: 'http://192.168.1.104:3000/feedbook',
        changeOrigin: true,
        pathRewrite: {
          '^/feedbook/': ''
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
