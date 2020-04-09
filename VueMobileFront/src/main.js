import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { noDataDirective } from '@/lib/directives' // 引入自定义指令，无数据
import 'amfe-flexible'
import './style/common.css'
import './style/global.less'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false
Vue.directive('noData', noDataDirective)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
