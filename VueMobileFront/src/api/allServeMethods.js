import http from './httpInstance'
import { INVOICE_CONTEXT } from '../config'

function getuserInfo () {
  return http({
    method: 'get',
    url: `${INVOICE_CONTEXT}/v1/getuserInfo`
  })
}

function userLogin (data) {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/v1/userLogin`,
    data
  })
}

export {
  getuserInfo,
  userLogin
}
