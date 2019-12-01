import { combineReducers } from "redux"
import productsReducer from "store/reducers/cart/productsReducer"
import additionalProductsReducer from "store/reducers/cart/additionalProductsReducer"

export default combineReducers({
  products: productsReducer,
  additionalProducts: additionalProductsReducer
})