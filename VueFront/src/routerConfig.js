export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/error/404',
    name: 'Error',
    component: 'Err404'
  },
  {
    path: '/index',
    name: 'Index',
    component: 'Index',
    keepAlive: false
  },
  {
    path: '/hello',
    name: 'Hello',
    component: 'Hello',
    keepAlive: false
  }
]
