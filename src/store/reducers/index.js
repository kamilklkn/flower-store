import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'
// import filters from './filters'
import catalog from './catalog'

const rootReducer = history => combineReducers({
  catalog,
  filter: {},
  router: connectRouter(history)
})

export default rootReducer