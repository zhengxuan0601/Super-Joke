import http from './httpInstance'
import { INVOICE_CONTEXT } from '../config'

function userLogin (userName, password) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/self/printPc/login/userAuth?userName=${userName}&password=${password}`
  })
}

export default {
  userLogin
}