import http from './httpInstance'
import { ALLSERVE_CONTEXT } from '../config'

function userLogin (userName, password) {
  return http({
    method: 'post',
    url: `${ALLSERVE_CONTEXT}/self/printPc/login/userAuth?userName=${userName}&password=${password}`
  })
}

export default {
  userLogin
}