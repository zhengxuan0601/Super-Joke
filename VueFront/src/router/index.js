import Vue from 'vue'
import Router from 'vue-router'
import routes from '../routerConfig'

Vue.use(Router)
const createRoute = (routes) => {
  return routes.reduce((processedRoutes, currentRoute) => {
    processedRoutes.push(processRouteObj(currentRoute))
    return processedRoutes
  }, [])
}

const processRouteObj = ({ menuCode, breadcrumb, children, component, keepAlive, ...args }) => {
  return Object.assign({
    meta: { menuCode, keepAlive },
    props: {
      breadcrumbObj: {
        content: breadcrumb,
        menuCode: menuCode
      }
    },
    component: () => import(`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}

const router = new Router({
  // mode: 'history', // 历史模式需要服务端统一修改tomcat配置 跟环境部署有关 每次部署都要去跟进 麻烦 干脆还是用hash模式
  base: process.env.BASE_URL,
  routes: createRoute(routes)
})

router.beforeEach(async (to, form, next) => {
  // 防止死循环跳出
  if (to.path.indexOf('error') > -1) {
    next()
    return
  }
  // 不是系统中的路由走404页面
  const routePath = routes.map((routeObj) => {
    if (routeObj.children) {
      let children = routeObj.children.map(({ path }) => `${routeObj.path}/${path}`)
      children.push(routeObj.path)
      return children
    } else {
      return routeObj.path
    }
  }).join(',').split(',')
  if (!routePath.includes(to.path)) {
    next({ path: '/error/404' })
  } else {
    next()
  }
})

export default router