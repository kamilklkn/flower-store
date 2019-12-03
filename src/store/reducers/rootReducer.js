import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'
import products from './productsReducer'
import filters from './filter/filtersReducer'
import selectedFilters from './filter/selectedFiltersReducer'
import cart from "./cart/rootReducer"
import grass from "./grassReducer"
import activeProduct from './productReducer'
import additionalProducts from "./additionalProductsReducer"

const rootReducer = history => combineReducers({
  entities: combineReducers({
    products,
    additionalProducts,
    grass,
    filters
  }),
  ui: combineReducers({
    selectedFilters,
    activeProduct,
    cart
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