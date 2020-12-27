// 引入 express 框架 -> 需 npm 安装
const express = require('express')
const bodyParser = require('body-parser')
const SERVER_NAME = require('./config').SERVER_NAME
const getLoginInfo = require('./views/getUserInfo')
const userLogin = require('./views/userLogin') 

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express 
 */
let app = express()
/* 配置框架环境 S */
// 设置 public 为静态文件的存放文件夹
app.use('/public', express.static('public'))

// 配置获取post请求body内数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* 配置框架环境 E */
app.get(`${SERVER_NAME}/v1/getuserInfo`, function(req, res) {
  getLoginInfo(req, res)
})

app.post(`${SERVER_NAME}/v1/userLogin`, function(req, res) {
  userLogin(req, res)
})

let server = app.listen(3000, function() {
  let host = server.address().address
  let port = server.address().port
  console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)
})