import { CATALOG } from "store/actionTypes"
import { fetchProducts as fetchProductsApi } from 'api'

export const requestProducts = () => ({
  type: CATALOG.PRODUCTS_REQUEST
})


export const successProducts = (data) => ({
  type: CATALOG.PRODUCTS_SUCCESS,
  data
})

export const failureProducts = error => ({
  type: CATALOG.PRODUCTS_FAILURE,
  error
})

export const fetchProducts = () => async dispatch => {
  console.log('fetchProducts')
  dispatch(requestProducts())
  try {
    const data = await fetchProductsApi()
    dispatch(successProducts(data))
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