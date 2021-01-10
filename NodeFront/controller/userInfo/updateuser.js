import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
const router = express.Router()

router.post('/', (req, response) => {
  Admin.find({ userName: req.body.userName }, (err, res) => {
    if (!err) {
      if (res && res.length) {
        response.send({
          code: STATUS.ERR_STATUS,
          msg: '用户名已经存在',
          data: null
        })
        return
      }
    }
    Admin.findOneAndUpdate({ id: req.body.id }, {
      $set: req.body
    }, {}, (err, res) => {
      if (err) {
        response.send({
          code: STATUS.ERR_STATUS,
          msg: '更新用户信息失败',
          data: null
        })
      }
      response.send({
        code: STATUS.SUCCESS_STATUS,
        msg: '更新用户信息成功',
        data: null
      })
    })
  })
})

export default router