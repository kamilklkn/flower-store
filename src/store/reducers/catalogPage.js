import { PRODUCTS } from "store/actionTypes"

const initialState = {
  ids: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS.PRODUCTS_SUCCESS:
      return {
        ids: action.response.result
      }
    default:
      return state
  }
}