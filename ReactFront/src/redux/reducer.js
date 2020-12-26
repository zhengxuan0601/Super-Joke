import * as TYPE from './muations'
const stateData = {
  inputVal: 0,
  order: ''
}

export default (state = stateData, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case TYPE['SET_UPDATE_VALUE']:
      newState = JSON.parse(JSON.stringify(state))
      newState.inputVal = action.value
      return newState
    case TYPE['SET_UPDATE_ORDER']:
      newState = JSON.parse(JSON.stringify(state))
      newState.order = action.value
      return newState

    default:
      break
  }
  return state
}