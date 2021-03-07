import http from './httpInstance'
import { INVOICE_CONTEXT } from '../config'

// 查询所有菜单数据信息
function findMenuList () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/findMenuList`
  })
}

// 添加菜单
function addMenu (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/addMenu`,
    data
  })
}

// 删除菜单
function deleteMenuByIds (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/deleteMenuByIds`,
    data
  })
}

// 编辑菜单
function updateMenu (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/updateMenu`,
    data
  })
}

// 添加文章
function addArticle (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/addArticle`,
    data
  })
}

// 查询所有文章
function findArticleList (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/findArticleList`,
    data
  })
}

// 删除指定文章
function deleteArtiles (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/deleteArtiles`,
    data
  })
}

// 编辑文章
function editArticle (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/editArticle`,
    data
  })
}

// 根据文章id查询文章详细信息
function findArticleInfo (id) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/findArticleInfo?id=${id}`
  })
}

// 新增用户信息
function addNewPerson (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/addNewPerson`,
    data
  })
}

// 查询用户列表
function findAllusers () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/findAllusers`
  })
}

// 更新用户信息
function updateuserInfo (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/updateuserInfo`,
    data
  })
}

// 删除用户信息
function deleteBatchuser (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/deleteBatchuser`,
    data
  })
}

// 查询用户信息
function findUserInfo (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/findUserInfo`,
    data
  })
}

// 查询留言分页数据信息
function findMessageList (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/findMessageList`,
    data
  })
}

// 批量删除留言
function deleteMessage (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/deleteMessage`,
    data
  })
}

// 上传banner图片配置信息
function uploadBanner (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/uploadBanner`,
    data
  })
}

// 查询banner列表
function findBannerList () {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/findBannerList`
  })
}

// 删除banner配置
function deleteBatchBanners (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/deleteBatchBanners`,
    data
  })
}

// 编辑banner配置
function updateBanner (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/updateBanner`,
    data
  })
}

// 更新blog配置信息
function setBlogConfig (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/setBlogConfig`,
    data
  })
}

// 查询blog配置信息
function findBlogConfig () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/findBlogConfig`
  })
}

// 保存更新关于自己信息
function saveAboutSelfMes (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/saveAboutSelfMes`,
    data
  })
}

// 关于我信息查询回显
function findAoutselfMessage () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/findAoutselfMessage`
  })
}

// 添加blog更新日志
function addupdateLog (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/addupdateLog`,
    data
  })
}

// 查询更新日志分页列表
function findUpdateLog (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/findUpdateLog`,
    data
  })
}

// 批量删除更新日志
function batchDeleteLogs (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/batchDeleteLogs`,
    data
  })
}

// 编辑更新日志
function editUpdateLogs (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/api/editUpdateLogs`,
    data
  })
}

// 菜单上下移
function moveMenuItem ({ menuId, moveType }) {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/api/moveMenuItem?menuId=${menuId}&moveType=${moveType}`
  })
}

export {
  findMenuList,
  addMenu,
  deleteMenuByIds,
  updateMenu,
  addArticle,
  findArticleList,
  deleteArtiles,
  editArticle,
  findArticleInfo,
  addNewPerson,
  findAllusers,
  updateuserInfo,
  deleteBatchuser,
  findUserInfo,
  findMessageList,
  deleteMessage,
  uploadBanner,
  findBannerList,
  deleteBatchBanners,
  updateBanner,
  setBlogConfig,
  findBlogConfig,
  saveAboutSelfMes,
  findAoutselfMessage,
  addupdateLog,
  findUpdateLog,
  batchDeleteLogs,
  editUpdateLogs,
  moveMenuItem
}
