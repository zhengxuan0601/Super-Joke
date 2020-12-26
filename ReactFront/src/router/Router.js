// 主菜单路由配置文件
import Index from '@/pages/Index/Index'
import About from '@/pages/About/About'
import Err404 from '@/pages/Err404'

export default [
  {
    name: 'Index',
    path: '/contextmain/index',
    component: Index,
  },
  {
    name: 'About',
    path: '/contextmain/about',
    component: About
  },
  {
    name: 'Err404',
    path: '',
    component: Err404
  },
]