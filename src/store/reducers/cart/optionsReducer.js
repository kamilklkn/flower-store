import { CART_PRODUCT_OPTION_DELETE } from "store/actionTypes"

const initialState = {

}

export const optionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_PRODUCT_OPTION_DELETE:
      console.log('CART_PRODUCT_OPTION_DELETE', action)
      return state
  }
}