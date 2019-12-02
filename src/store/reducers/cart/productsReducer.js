import {
  CART_PRODUCT_ADD, CART_PRODUCT_DECREASE,
  CART_PRODUCT_INCREASE, CART_PRODUCT_OPTION_DELETE,
  CART_PRODUCT_REMOVE
} from "store/actionTypes"
import itemReducer from "store/reducers/cart/itemReducer"

const initialState = {
  byId: {
    id1: {
      id: 'id1',
      title: 'Сборный в коробке',
      image: 'http://localhost:3000/static/media/8.8dc61bc0.jpg',
      options: {
        grass: {
          title: 'Побольше',
          price: 300
        },
        box: {
          title: 'Бархатная',
          price: 1500
        }
      },
      size: 'Большой',
      price: 9600,
      count: 1
    },
    id2: {
      id: 'id2',
      title: 'Монобукет кустовой розы',
      image: 'http://localhost:3000/static/media/5.d5ce967b.jpeg',
      size: 'Премиум',
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


function optionDelete(state, action) {
  const product = state[action.id]
  console.log(product)
  const { [action.optionKey]: _, ...noKey } = product.options

  return {
    ...product,
    options: {
      ...noKey
    }
  }
}


export const byId = (state, action) => {
  switch (action.type) {
    case CART_PRODUCT_INCREASE:
    case CART_PRODUCT_DECREASE:
      const product = state[action.id]
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
      const { [action.id]: _, ...noKey } = state
      return { ...noKey }

    case CART_PRODUCT_OPTION_DELETE:
      console.log('products CART_PRODUCT_OPTION_DELETE', action)
      return {
        ...state,
        [action.id]: optionDelete(state, action)
      }

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