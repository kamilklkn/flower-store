import { CATALOG } from "store/actionTypes"

const initialState = {
  products: {},
  grass: {},
  additionalProducts: {}
}

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case CATALOG.PRODUCTS_SUCCESS:
      return {
        ...action.data
      }

    default:
      return state
  }
}

export default catalog