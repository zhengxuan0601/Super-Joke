import Vue from 'vue'
import initApp from './initApp'
import Element from 'element-ui'
import BreadCrumb from '@/components/BreadCrumb'
import { noDataDirective } from '@/lib/directives' // 引入自定义指令，无数据
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/common.css'
import '@/style/global.less'
import '@/assets/iconfont/iconfont.css'
import '@/assets/font/iconfont.css'

Vue.use(Element)
Vue.config.productionTip = false
Vue.directive('noData', noDataDirective)
Vue.component('BreadCrumb', BreadCrumb)
initApp()
