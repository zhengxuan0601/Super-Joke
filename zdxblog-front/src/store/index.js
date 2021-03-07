import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  userInfo: null,
  configInfo: {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {}
})
