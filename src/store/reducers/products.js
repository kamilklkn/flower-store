import {
  PRODUCTS_SUCCESS,
} from "store/actionTypes"

const initialState = {}

const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_SUCCESS:
      return {
        ...action.response.entities.products
      }

    default:
      return state
  }
}

export default products