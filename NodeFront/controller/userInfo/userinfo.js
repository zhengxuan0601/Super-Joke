import express from 'express'
import * as STATUS from '../../config'
import Admin from '../../models/userinfo'
const router = express.Router()

router.get('/', (req, response) => {
  let newPerson = new Admin(req.query)
  getAllPersons().then(data => {
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

async function getAllPersons () {
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