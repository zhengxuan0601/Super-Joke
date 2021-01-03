import { SERVER_NAME } from './config'
import addNewPersonInfo from './controller/userInfo/userinfo'
import findAllUser from './controller/userInfo/findAllUser'
import deleteUserByUserName from './controller/userInfo/deleteUser'

const routerList = [
  {
    component: addNewPersonInfo,
    path: `${SERVER_NAME}/v1/addNewPersonInfo`
  },
  {
    component: findAllUser,
    path: `${SERVER_NAME}/v1/findAllUser`
  },
  {
    component: deleteUserByUserName,
    path: `${SERVER_NAME}/v1/deleteUserByUserName`
  }
]

export default routerList
