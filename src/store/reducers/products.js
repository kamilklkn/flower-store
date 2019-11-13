import { PRODUCTS } from "store/actionTypes"

// {
//   simpleDomainData1: {....},
//   simpleDomainData2: {....},
//   entities : {
//     entityType1 : {....},
//     entityType2 : {....}
//   },
//   ui : {
//     uiSection1 : {....},
//     uiSection2 : {....}
//   }
// }

// const initialState = {
//   enities: {
//     products: {}
//   },
//   result: []
// }


const initialState = {}

const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS.PRODUCTS_SUCCESS:
      return {
        ...action.response.entities.products
      }

    default:
      return state
  }
}

export default products