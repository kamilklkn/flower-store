import * as actionTypes from './actionTypes'
import { FILTER_TYPES } from "constants/filterTypes"

// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"


const filterFunctions = {
  byColors(products, { selected }) {
    return products.filter(product =>
      selected.includes(product.color)
    )
  },
  bySizes(products, { selected }) {
    return products.filter(product =>
      product.sizes.some(size =>
        selected.includes(size.id)
      )
    )
  },
  bySizesPrice(products, { min, max }) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.price >= min && size.price <= max
      )
    )
  }
}


const initialState = {
  colors: {
    title: 'Цвета',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    selected: [1, 3],
    items: productColors,
    func: filterFunctions.byColors
  },
  sizes: {
    title: 'Размеры',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productSizes,
    selected: [1, 2],
    func: filterFunctions.bySizes
  },
  flowers: {
    title: 'Цветы',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: flowers,
    selected: [],
    func: null
  },
  productPacking: {
    title: 'Упаковка',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productPacking,
    selected: [],
    func: null
  },
  priceRange: {
    type: FILTER_TYPES.RANGE,
    title: 'Цена',
    min: 400,
    max: 15000,
    func: filterFunctions.bySizesPrice
  }
}


const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SELECT:
      /** Экшен снимает/ставит элемент фильтра **/
      const { filterKey, itemId } = action.payload
      const selected = [...state[filterKey].selected]
      if (selected.includes(itemId)) {
        // Удаляем itemId (снимаем фильтр)
        selected.splice(selected.indexOf(itemId), 1)
      } else {
        // Добавляем фильтр
        selected.push(itemId)
      }

      return {
        ...state,
        [filterKey]: {
          ...state[filterKey],
          selected
        }
      }
    default:
      return state
  }
}

export default filter