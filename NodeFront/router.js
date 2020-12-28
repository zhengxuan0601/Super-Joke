const SERVER_NAME = require('./config').SERVER_NAME
const routerList = [
  {
    component: require('./router/getUserInfo'),
    path: `${SERVER_NAME}/v1/getuserInfo`
  },
  {
    component: require('./router/userLogin') ,
    path: `${SERVER_NAME}/v1/userLogin`
  }
]

module.exports = routerList
