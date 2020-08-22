const stateData = {
  inputVal: "",
  order: ""
}

export default (state = stateData, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "change_value":
      newState = JSON.parse(JSON.stringify(state))
      newState.inputVal = action.value
      return newState
    case "change_order":
      newState = JSON.parse(JSON.stringify(state))
      newState.order = action.value
      return newState
  
    default:
      break;
  }
  return state
}