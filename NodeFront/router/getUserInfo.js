import express from 'express'
import * as STATUS from '../config'
const router = express.Router()

router.get('/', (_req, res) => {
  let responParams = {
    code: STATUS.SUCCESS_STATUS,
    data: {
      userName: '郑大轩',
      accountName: 'zhengxuan',
      age: 24
    },
    message: 'success'
  }
  res.send(responParams)
})

export default router