import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import { noDataDirective } from '@/lib/directives' // 引入自定义指令，无数据
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/common.css'
import '@/style/global.less'
import '@/assets/iconfont/iconfont.css'

Vue.use(Element)
Vue.config.productionTip = false
Vue.directive('noData', noDataDirective)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
