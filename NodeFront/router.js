import { SERVER_NAME } from './config'
import addNewPersonInfo from './controller/userInfo/adduser'
import findAllUser from './controller/userInfo/findAllUser'
import updatePersonInfo from './controller/userInfo/updateuser'
import deleteUserById from './controller/userInfo/deleteUser'

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
    component: deleteUserById,
    path: `${SERVER_NAME}/v1/deleteUserById`
  },
  {
    component: updatePersonInfo,
    path: `${SERVER_NAME}/v1/updatePersonInfo`
  }
]

export default routerList
