import { PRODUCTS_SUCCESS } from "store/actionTypes"

const initialState = {
  ids: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SUCCESS:
      return {
        ids: action.response.result
      }
    default:
      return state
  }
}