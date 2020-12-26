import * as types from './muations-type'

export default {
  [types.UPDATE_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
