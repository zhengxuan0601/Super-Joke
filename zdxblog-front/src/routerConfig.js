export default [
  {
    path: '/',
    redirect: '/blogindex'
  },
  {
    path: '/error/404',
    name: 'Error',
    component: 'Err404'
  },
  {
    path: '/login',
    name: 'Login',
    component: 'Login',
    keepAlive: false,
    showHeader: false
  },
  {
    path: '/blogindex',
    name: 'BlogIndex',
    component: 'BlogIndex',
    keepAlive: true,
    showHeader: true
  },
  {
    path: '/articledetails',
    name: 'ArtileDeatils',
    component: 'ArtileDeatils',
    keepAlive: false,
    showHeader: true
  },
  {
    path: '/messageboard',
    name: 'MessageBoard',
    component: 'MessageBoard',
    keepAlive: false,
    showHeader: true
  },
  {
    path: '/aboutmyself',
    name: 'AboutMyself',
    component: 'AboutMyself',
    keepAlive: false,
    showHeader: true
  },
  {
    path: '/articleclassify',
    name: 'ArticleClassify',
    component: 'ArticleClassify',
    keepAlive: false,
    showHeader: true
  },
  {
    path: '/adminindex',
    name: 'AdmminIndex',
    component: 'Admin/AdminIndex',
    keepAlive: false,
    children: [
      {
        name: 'MenuConfig',
        path: 'menuconfig',
        component: 'Admin/MenuConfig'
      },
      {
        name: 'ArticleConfig',
        path: 'articleconfig',
        component: 'Admin/ArticleConfig'
      },
      {
        name: 'OperateArticle',
        path: 'operatearticle',
        component: 'Admin/OperateArticle'
      },
      {
        name: 'UserManage',
        path: 'usermanage',
        component: 'Admin/UserManage'
      },
      {
        name: 'MessageManage',
        path: 'messagemanage',
        component: 'Admin/MessageManage'
      },
      {
        name: 'BlogConfig',
        path: 'blogconfig',
        component: 'Admin/BlogConfig'
      },
      {
        name: 'BannerConfig',
        path: 'bannerconfig',
        component: 'Admin/BannerConfig'
      },
      {
        name: 'AboutSelfConfig',
        path: 'aboutselfconfig',
        component: 'Admin/AboutSelfConfig'
      },
      {
        name: 'UpdateBlogLog',
        path: 'updatebloglog',
        component: 'Admin/UpdateBlogLog'
      }
    ]
  }
]
