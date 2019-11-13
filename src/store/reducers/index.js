import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'

import products from './products'
import selectedFilters from './selectedFilters'
import catalogPage from './catalogPage'

const rootReducer = history => combineReducers({
  entities: combineReducers({
    products
  }),
  ui: combineReducers({
    catalogPage,
    selectedFilters
  }),
  router: connectRouter(history)
})

export default rootReducer