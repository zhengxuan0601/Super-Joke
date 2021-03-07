import http from './httpInstance'
import { INVOICE_CONTEXT } from '../config'

function getmainClassifyList () {
  return http({
    method: 'post',
    url: `${INVOICE_CONTEXT}/dataCatalog/web/mainClassify/list`
  })
}

export {
  getmainClassifyList
}
