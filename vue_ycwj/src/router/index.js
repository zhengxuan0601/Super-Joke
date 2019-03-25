import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index/Index'
import Menu from '@/page/Menu/Menu'
import Car from '@/page/Car/Car'
import User from '@/page/User/User'
import Search from '@/page/Search/Search'
import Category from '@/page/Category/Category'
import Login from '@/page/Login/Login'
import Reg from '@/page/Reg/Reg'
import ProInfo from '@/page/ProInfo/ProInfo'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/car',
      name: 'Car',
      component: Car
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/proinfo/:id',
      name: 'ProInfo',
      component: ProInfo
    }
  ]
})
