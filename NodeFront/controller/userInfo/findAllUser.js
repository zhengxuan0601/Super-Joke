import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
const router = express.Router()

router.get('/', (req, response) => {
  Admin.find((err, res) => {
    if (!err) {
      response.send({
        code: STATUS.SUCCESS_STATUS,
        data: res,
        message: 'success'
      })
    } else {
      response.send({
        code: STATUS.ERR_STATUS,
        data: null,
        message: 'fail'
      })
    }
  })
})

export default router