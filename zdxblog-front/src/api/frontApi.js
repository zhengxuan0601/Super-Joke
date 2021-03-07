import http from './httpInstance'
import { INVOICE_CONTEXT } from '../config'
// 查询所有菜单数据信息
function findMenuList () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findMenuList`
  })
}

// 查询所有文章
function findArticleList (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/findArticleList`,
    data
  })
}

// 根据文章id查询文章详细信息
function findArticleInfo (id) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findArticleInfo?id=${id}`
  })
}

// 更新浏览次数
function updateReadTimes (id) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/updateReadTimes?id=${id}`
  })
}

// 查询用户信息
function findUserInfo (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/findUserInfo`,
    data
  })
}

// 用户登录
function userLogin (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/userLogin`,
    data
  })
}

// 根据文章ID获取上一篇和下一篇文章
function findBetweenArticle (id) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findBetweenArticle?id=${id}`
  })
}

// 查询最热门8篇文章
function getHotTopArticle () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/getHotTopArticle`
  })
}

// 添加评论留言
function saveMessage (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/saveMessage`,
    data
  })
}

// 根据文章id查询所有留言
function queryAllMessage (articleId) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/queryAllMessage?articleId=${articleId || ''}`
  })
}

// 查询banner列表
function findBanners () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findBanners`
  })
}

// 查询blog配置信息
function findBlogConfig () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findBlogConfig`
  })
}

// 关于我信息查询回显
function findAoutselfMessage () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findAoutselfMessage`
  })
}

// 根据当地地名查询当地天气信息
function queryWeatherByCityName (cityName) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/queryWeatherByCityName?cityName=${cityName}`
  })
}

// 查询更新日志
function findUpdateLog () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/findUpdateLog`
  })
}

export {
  findMenuList,
  findArticleList,
  findArticleInfo,
  updateReadTimes,
  findUserInfo,
  userLogin,
  findBetweenArticle,
  getHotTopArticle,
  saveMessage,
  queryAllMessage,
  findBanners,
  findBlogConfig,
  findAoutselfMessage,
  queryWeatherByCityName,
  findUpdateLog
}
