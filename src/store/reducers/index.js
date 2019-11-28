import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'

import products from './products'
import filters from './filters'
import selectedFilters from './selectedFilters'


const rootReducer = history => combineReducers({
  entities: combineReducers({
    products,
    filters
  }),
  ui: combineReducers({
    selectedFilters
  }),
  router: connectRouter(history)
})

/**
 * https://github.com/jalbertsr/redux-store/blob/master/src/services/dataService.js
 * import fetch from 'isomorphic-fetch'
 *
 * productList: {
    products: [],
    error: null,
    loading: false
 *
 * store = {
 *   entities: {
 *     products: {
 *       byId: {
 *         _id_: {
 *           ...
 *         },
 *         ...
 *       },
 *       allIds: [_id_, ...]
 *     },
 *     filters: {
 *       byId: {
 *
 *       },
 *       allIds: []
 *     }
 *   }
 * }
 *
 */

export default rootReducer