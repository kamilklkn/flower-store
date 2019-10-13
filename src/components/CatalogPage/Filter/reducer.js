import * as actionTypes from './actionTypes'
import { FILTER_TYPES } from "constants/filterTypes"

// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productShades } from "constants/productShades"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"

// todo fix some, because if selected two filters, next product skip check
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
  byShades(products, { selected }) {
    return products.filter(product => {
        if (!product.shade) return false
        return product.shade.some(size =>
          selected.includes(size.id)
        )
      }
    )
  },
  byFlowers(products, { selected }) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.flowers.ids.some(flowerId =>
          selected.includes(flowerId)
        )
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
  priceRange: {
    type: FILTER_TYPES.RANGE,
    title: 'Цена',
    func: filterFunctions.bySizesPrice,
    min: 400,
    max: 15000
  },
  shade: {
    title: 'Оттенок',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productShades,
    func: filterFunctions.byShades,
    selected: []
  },
  colors: {
    title: 'Цвет',
    type: FILTER_TYPES.COLORS_BUTTONS,
    items: productColors,
    func: filterFunctions.byColors,
    selected: []
  },
  sizes: {
    title: 'Размеры',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productSizes,
    func: filterFunctions.bySizes,
    selected: [1, 2]
  },
  flowers: {
    title: 'Цветы',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: flowers,
    func: filterFunctions.byFlowers,
    selected: []
  },
  productPacking: {
    title: 'Упаковка',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productPacking,
    func: null,
    selected: []
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