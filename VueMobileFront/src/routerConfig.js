export default [
  {
    path: '/',
    redirect: '/homemain/home'
  },
  {
    path: '/error/404',
    component: 'Error'
  },
  {
    path: '/homemain',
    name: 'HomeMain',
    component: 'BarPage/HomeMain',
    keepAlive: false,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: 'BarPage/Home',
        keepAlive: false
      },
      {
        path: 'search',
        name: 'Search',
        component: 'BarPage/Search',
        keepAlive: false
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: 'Login',
    keepAlive: false
  }
]
