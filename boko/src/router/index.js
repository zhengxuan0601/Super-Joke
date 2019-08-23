import Vue from 'vue'
import Router from 'vue-router'
import Myboko from '../pages/Myboko'
import Index from '../pages/Index'
import Aboutus from '../pages/Aboutus'
import Message from '../pages/Message'
import ArticleDetail from '../pages/ArticleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/myboko',
      name: 'Myboko',
      component: Myboko
    },
    {
      path: '/aboutus',
      name: 'Aboutus',
      component: Aboutus
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/articledetail/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
  ]
})
