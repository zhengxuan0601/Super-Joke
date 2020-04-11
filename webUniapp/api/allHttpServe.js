import Request from './http.js'
const request = new Request().http

function getLogin(userName, password, deptCode) {
  return request(`/app/user/login?userName=${userName}&password=${password}&deptCode=${deptCode}`, 'POST')
}

export {
  getLogin
}
