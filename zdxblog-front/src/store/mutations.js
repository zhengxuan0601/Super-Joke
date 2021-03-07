import * as types from './mutations-type'

export default {
  [types.UPDATE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },

  [types.UPDATE_CONFIGINFO] (state, configInfo) {
    state.configInfo = configInfo
  }
}
