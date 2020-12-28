const express = require('express')
const router = express.Router()
const STATUS = require('../config')

router.get('/', (req, res) => {
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

module.exports = router