import { SERVER_NAME } from './config'
import getUserInfo from './router/getUserInfo'
import userLogin from './router/userLogin'

const routerList = [
  {
    component: getUserInfo,
    path: `${SERVER_NAME}/v1/getuserInfo`
  },
  {
    component: userLogin,
    path: `${SERVER_NAME}/v1/userLogin`
  }
]

export default routerList
