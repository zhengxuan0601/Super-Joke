import reducer from "./reducer"
import { createStore, applyMiddleware  } from "redux"
import thunk from 'redux-thunk'

const logger = store => next => action => {
  return next(action)
}

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)
export default store