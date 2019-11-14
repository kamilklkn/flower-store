import { normalize } from "normalizr"
import { PRODUCTS_FAILURE,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS } from "store/actionTypes"
import * as schema from "./productsSchema"
import { fetchProducts as fetchProductsApi } from 'api'


export const requestProducts = () => ({
  type: PRODUCTS_REQUEST
})


export const successProducts = (response) => ({
  type: PRODUCTS_SUCCESS,
  response
})


export const failureProducts = error => ({
  type: PRODUCTS_FAILURE,
  error
})


export const fetchProducts = () => async dispatch => {
  dispatch(requestProducts())
  try {
    const response = await fetchProductsApi()
    dispatch(
      successProducts(normalize(response, schema.arrayOfProducts))
    )
  } catch (e) {
    dispatch(failureProducts(e))
  }
}