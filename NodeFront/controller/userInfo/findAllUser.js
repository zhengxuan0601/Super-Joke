import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
const router = express.Router()

router.get('/', (req, response) => {
  Admin.find({}, { _id: 0, __v: 0 }, (err, res) => {
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