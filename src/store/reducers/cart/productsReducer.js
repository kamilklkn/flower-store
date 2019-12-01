import {
  CART_PRODUCT_ADD, CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE,
  CART_PRODUCT_REMOVE
} from "store/actionTypes"
import itemReducer from "store/reducers/cart/itemReducer"

const initialState = {
  byId: {
    id1: {
      id: 'id1',
      title: 'Сборный в коробке (Премиум)',
      image: 'http://localhost:3000/static/media/8.8dc61bc0.jpg',
      price: 8600,
      count: 2
    },
    id2: {
      id: 'id2',
      title: 'Монобукет кустовой розы (Большой)',
      image: 'http://localhost:3000/static/media/5.d5ce967b.jpeg',
      price: 5000,
      count: 5
    }
  },
  allIds: ['id1', 'id2']
}


// {
//   type: 'CART_ADD_PRODUCT',
//   product: {
//       id: 'id3',
//       title: '33333 (Большой)',
//       image: 'http://localhost:3000/static/media/5.d5ce967b.jpeg',
//       price: 3333,
//       additionalProductsIds: ['id0n']
//   },
//   additionalProducts: ['id0n']
// }



export const byId = (state, action) => {
  switch (action.type) {
    case CART_PRODUCT_INCREASE:
    case CART_PRODUCT_DECREASE:
      const product = state[action.id]
      console.log(product)
      return {
        ...state,
        [action.id]: itemReducer(product, action)
      }

    case CART_PRODUCT_ADD:
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          count: 1
        }
      }

    case CART_PRODUCT_REMOVE:
      const { [action.id]: _, ...withoutKey } = state
      return { ...withoutKey }

    default:
      return state
  }
}

export const allIds = (state, action) => {
  switch (action.type) {
    case CART_PRODUCT_REMOVE:
      return state.filter(id => id !== action.id)

    case CART_PRODUCT_ADD:
      return [...state, action.product.id]

    default:
      return state
  }
}

const productsReducer = (state = initialState, action) => ({
  byId: byId(state.byId, action),
  allIds: allIds(state.allIds, action)
})

export default productsReducer