import Vue from 'vue'
import initApp from './initApp'
import Element from 'element-ui'
import BreadCrumb from '@/components/BreadCrumb'
import { noDataDirective } from '@/lib/directives' // 引入自定义指令，无数据
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/common.css'
import '@/style/global.less'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont_v/iconfont.css'
import mixin from '@/mixin/pageContainer'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import APIMAP from '@/config/configMapOptions'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night-eighties.css'

Vue.directive('highlight', el => {
  let highlight = el.querySelectorAll('code,pre')
  highlight.forEach(block => {
    if (block) {
      hljs.highlightBlock(block)
    }
  })
})
Vue.use(VueQuillEditor)
Vue.use(Element)
Vue.mixin(mixin)
Vue.config.productionTip = false
Vue.prototype.APIMAP = APIMAP
Vue.directive('noData', noDataDirective)
Vue.component('BreadCrumb', BreadCrumb)
initApp()
