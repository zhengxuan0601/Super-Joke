import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
const router = express.Router()

router.get('/', (req, response) => {
  let deleteName = req.query.userName
  Admin.remove({ userName: deleteName }, (err, res) => {
    if (!err) {
      response.send({
        code: STATUS.SUCCESS_STATUS,
        data: null,
        message: '删除用户成功'
      })
    } else {
      response.send({
        code: STATUS.ERR_STATUS,
        data: null,
        message: '删除用户失败'
      })
    }
  })
})

export default router