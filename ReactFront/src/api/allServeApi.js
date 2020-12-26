import http from './httpInstance'
import { ALLSERVE_CONTEXT } from '../config'

function getmainClassifyList () {
  return http({
    method: 'post',
    url: `${ALLSERVE_CONTEXT}/web/mainClassify/list`
  })
}

export {
  getmainClassifyList
}