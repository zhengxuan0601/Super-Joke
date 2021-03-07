export default [
  {
    title: '博客配置',
    icon: 'el-icon-reading',
    children: [
      {
        router: '/adminindex/menuconfig',
        title: '菜单配置'
      },
      {
        router: '/adminindex/articleconfig',
        title: '文章配置'
      },
      {
        router: '/adminindex/usermanage',
        title: '用户管理'
      },
      {
        router: '/adminindex/messagemanage',
        title: '留言管理'
      },

      {
        router: '/adminindex/bannerconfig',
        title: 'Banner配置'
      }
    ]
  },
  {
    router: '/adminindex/blogconfig',
    title: '配置管理',
    icon: 'el-icon-setting'
  },
  {
    router: '/adminindex/aboutselfconfig',
    title: '关于我配置',
    icon: 'el-icon-user'
  },
  {
    router: '/adminindex/updatebloglog',
    title: '更新日志',
    icon: 'el-icon-notebook-2'
  }
]
