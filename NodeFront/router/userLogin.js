import express from 'express'
import * as STATUS from '../config'
const router = express.Router()

router.post('/', (req, res) => {
  let searchParams = req.body
  if (searchParams.userName === 'zhengxuan' && searchParams.password === '12345') {
    let response = {
      code: STATUS.SUCCESS_STATUS,
      data: searchParams,
      message: '登录成功'
    }
    res.send(response)
  } else {
    let response = {
      code: STATUS.ERR_STATUS,
      data: null,
      message: '用户名或密码错误'
    }
    res.send(response)
  }
})

export default router