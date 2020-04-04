export default [
  {
    path: '/',
    title: '首页',
    icon: ''
  },
  {
    path: 'menu1',
    title: '分类',
    icon: '',
    children: [
      {
        title: '分类一',
        path: '/index/menu1'
      },
      {
        title: '分类二',
        path: '/index/menu2'
      }
    ]
  },
  {
    path: 'menu2',
    title: '分类2',
    icon: '',
    children: [
      {
        title: '分类三',
        path: '/index/menu3'
      },
      {
        title: '分类四',
        path: '/index/menu4'
      }
    ]
  },
  {
    path: '/index',
    title: '关于',
    icon: ''
  }
]
