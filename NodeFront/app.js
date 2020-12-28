const express = require('express')
const bodyParser = require('body-parser')
const SERVER_NAME = require('./config').SERVER_NAME
const routerList = require('./router')

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

routerList.forEach(routerItem => {
  app.use(routerItem.path, routerItem.component)
})

let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port
  console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)
})