import { normalize } from "normalizr"
import { FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS } from "store/actionTypes"
import * as schema from "./productsSchema"
import { fetchProducts as fetchProductsApi } from 'api'


export const requestProducts = () => ({
  type: FETCH_PRODUCTS_REQUEST
})


export const successProducts = (response) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  response
})


export const failureProducts = error => ({
  type: FETCH_PRODUCTS_FAILURE,
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