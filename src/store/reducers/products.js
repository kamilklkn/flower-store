import {
  FETCH_PRODUCTS_SUCCESS
} from "store/actionTypes"

const initialState = {
  byId: {},
  allIds: []
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      const { entities , result } = action.response
      return {
        byId: { ...entities.products },
        allIds: [...result]
      }

    default:
      return state
  }
}

export default products