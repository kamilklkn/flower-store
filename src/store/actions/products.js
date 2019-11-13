import { normalize } from "normalizr"

import { PRODUCTS } from "store/actionTypes"
import * as schema from "./productsSchema"
import { fetchProducts as fetchProductsApi } from 'api'


export const requestProducts = () => ({
  type: PRODUCTS.PRODUCTS_REQUEST
})


export const successProducts = (response) => ({
  type: PRODUCTS.PRODUCTS_SUCCESS,
  response
})


export const failureProducts = error => ({
  type: PRODUCTS.PRODUCTS_FAILURE,
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


//
// export const receiveProducts = (subreddit, json) => ({
//   type: CATALOG.RECEIVE_PRODUCTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// })

//
// export const fetchProducts = subreddit => dispatch => {
//   dispatch(requestProducts(subreddit))
//   return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receiveProducts(subreddit, json)))
// }
//
// const shouldFetchProducts = (state, subreddit) => {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) return true
//   if (posts.isFetching) return false
// }

// export const fetchProductsIfNeeded = subreddit => (dispatch, getState) => {
//   if (shouldFetchProducts(getState(), subreddit)) {
//     return dispatch(fetchProducts(subreddit))
//   }
// }