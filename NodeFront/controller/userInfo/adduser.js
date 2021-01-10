import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
import { createEquieId } from '../../lib/util'
const router = express.Router()

router.post('/', (req, response) => {
  getAllPersons().then(data => {
    let saveParams = req.body
    saveParams.id = createEquieId(data.map(item => item.id))
    let newPerson = new Admin(saveParams)
    if (data.find(item => item.userName === newPerson.userName)) {
      let responParams = {
        code: STATUS.ERR_STATUS,
        message: '该用户名已经存在'
      }
      response.send(responParams)
    } else {
      newPerson.save((err, res) => {
        if (!err) {
          let responParams = {
            code: STATUS.SUCCESS_STATUS,
            message: '添加用户成功'
          }
          response.send(responParams)
        } else {
          let responParams = {
            code: STATUS.ERR_STATUS,
            message: '添加用户失败'
          }
          response.send(responParams)
        }
      })
    }
  })  
})

function getAllPersons () {
  return new Promise((resolve, reject) => {
    Admin.find((err, res) => {
      if (err) {
        reject()
      } else {
        resolve(res)
      }
    })
  }) 
}

export default router