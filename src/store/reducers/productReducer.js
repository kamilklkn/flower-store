import { FETCH_PRODUCT_SUCCESS } from "store/actionTypes"

const initialState = null

const productRedcer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      console.log('productReducer action', action)
      return {
        ...action.response
      }

    default:
      return state
  }
}

export default productRedcer
