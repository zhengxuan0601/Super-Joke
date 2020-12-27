module.exports = (req, res) => {
  let responParams = {
    code: '0',
    data: {
      userName: '郑大轩',
      accountName: 'zhengxuan',
      age: 24,
      sex: 'man'
    },
    message: 'success'
  }
  res.send(responParams)
}