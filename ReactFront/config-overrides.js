const { addWebpackAlias, override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')
function pathResolve (pathUrl) {
  return path.join(__dirname, pathUrl)
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    '@': pathResolve('./src')
  }),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]'
  })
)