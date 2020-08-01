export default  [
  {
    title: '首页展示',
    router: '/contextmain/index',
    icon: '',
    component: 'Index/Index',
    
  },
  {
    title: '关于我们',
    router: '/contextmain/about',
    icon: '',
    component: 'About/About'
  },
  {
    title: '菜单分类',
    router: 'menu',
    icon: '',
    children: [
      {
        title: '菜单分类1',
        router: '/contextmain/menu1',
        icon: '',
        component: 'About/About'
      }, {
        title: '菜单分类2',
        router: '/contextmain/menu2',
        icon: '',
        component: 'About/About'
      }
    ]
  },
  {
    title: '菜单分类2',
    router: 'menu2',
    icon: '',
    children: [
      {
        title: '菜单分类3',
        router: '/contextmain/menu3',
        icon: '',
        component: 'About/About'
      }, {
        title: '菜单分类4',
        router: '/contextmain/menu4',
        icon: '',
        component: 'About/About'
      }
    ]
  }
]