export default [
  {
    path: '/',
    redirect: '/selfresume'
  },
  {
    path: '/error/404',
    name: 'Error',
    component: 'Err404'
  },
  {
    path: '/selfresume',
    name: 'SelfResume',
    component: 'SelfResume',
    keepAlive: false
  }
]
