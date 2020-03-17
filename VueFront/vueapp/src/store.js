import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    errorCodeMap: {}
  },
  mutations: {
    changeUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {}
})
