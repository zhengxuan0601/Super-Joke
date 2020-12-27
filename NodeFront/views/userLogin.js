module.exports  = (req, res) => {
  console.log(req.body)
  let searchParams = req.body
  if (searchParams.userName === 'zhengxuan' && searchParams.password === '12345') {
    let response = {
      code: '0',
      data: searchParams,
      message: '登录成功'
    }
    res.send(response)
  } else {
    let response = {
      code: '1',
      data: null,
      message: '用户名或密码错误'
    }
    res.send(response)
  }
}