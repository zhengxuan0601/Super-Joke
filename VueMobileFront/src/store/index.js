import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './muations'
Vue.use(Vuex)

const state = {
  userInfo: null
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {}
})
