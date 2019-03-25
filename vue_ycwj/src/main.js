// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.prototype.$api=api
Vue.prototype.$md5=md5

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
