import * as actionTypes from './actionTypes'
import { FILTER_TYPES } from "constants/filterTypes"

// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productShades } from "constants/productShades"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"
import { stability } from "constants/filter/stability"


function resetFilters(state) {
  const newState = { ...state }

  Object.keys(newState).map(key => {
    if ('filtersToReset' in newState[key]
      && newState[key].filtersToReset.length
    ) {
      // todo: fix it. It runs on any filter click.
      // todo: учитывать, что
      // console.log(key)
      // newState[key].filtersToReset.forEach(filterKey => {
      //   // Сбрасываем выбранное на фильтре
      //   newState[filterKey].selected = []
      // })
    }
  })

  return newState
}


function resetAllFilters(state) {
  Object.values(state).forEach(filter => {
    filter.selected = []
  })
  return state
}

const filterFunctions = {
  byColors(products, { selected }) {
    return products.filter(product =>
      selected.includes(product.color)
    )
  },
  bySizes(products, { selected }) {
    return products.filter(product =>
      product.sizes.some(size =>
        selected.includes(size.title)
      )
    )
  },
  byShades(products, { selected }) {
    return products.filter(product => {
        if (!product.shade) return false
        return selected.includes(product.shade)
      }
    )
  },
  byPacking(products, { selected }) {
    return products.filter(product => {
        // console.log(product.packing)
        if (!('packing' in product)) return false
        return product.packing.some(pack =>
          selected.includes(pack)
        )
      }
    )
  },
  bySizesPrice(products, { selected: [min, max] }) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.price >= min && size.price <= max
      )
    )
  },
  byFlowers(products, { selected }) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.flowers.some(flowerEntity => {
            const [flowerTitle] = flowerEntity
            return selected.includes(flowerTitle)
          }
        )
      )
    )
  },
  byStability(products, { selected }) {
    return products.filter(product => {
        if (!product.stability) return false
        return selected.includes(product.stability)
      }
    )
  },
  byAvailability(products) {
    return products.filter(product =>
      !!product.available.now
    )
  },
}


const initialState = {
  priceRange: {
    order: 0,
    type: FILTER_TYPES.RANGE,
    title: 'Цена',
    func: filterFunctions.bySizesPrice,
    inititalRange: {
      min: 0,
      max: 5000
    },
    selected: [],
    expand: true,
    filtersToReset: ['sizes']
  },
  sizes: {
    order: 1,
    title: 'Размер',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productSizes,
    func: filterFunctions.bySizes,
    selected: ['Большой'],
    expand: true,
    filtersToReset: ['priceRange']
  },
  productPacking: {
    order: 2,
    title: 'Оформление букета',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productPacking,
    func: filterFunctions.byPacking,
    selected: [],
    expand: true
  },
  available: {
    order: 3,
    title: 'Наличие',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: [{
      id: 0,
      name: 'Только в наличии'
    }],
    func: filterFunctions.byAvailability,
    selected: [],
    expand: true
  },
  shade: {
    order: 4,
    title: 'Оттенок',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productShades,
    func: filterFunctions.byShades,
    selected: [],
    expand: false
  },
  stability: {
    order: 5,
    title: 'Стойкость',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: stability,
    func: filterFunctions.byStability,
    selected: [],
    expand: false
  },
  colors: {
    order: 6,
    title: 'Цвет композиции',
    type: FILTER_TYPES.COLORS_BUTTONS,
    items: productColors,
    func: filterFunctions.byColors,
    selected: [],
    expand: false
  },
  flowers: {
    order: 7,
    title: 'Состав букета',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: flowers,
    func: filterFunctions.byFlowers,
    selected: [],
    expand: false
  }
}


const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SELECT:
      /** Экшен снимает/ставит элемент фильтра **/
      const { filterKey, value } = action.payload
      const selected = [...state[filterKey].selected]
      if (selected.includes(value)) {
        // Удаляем itemId (снимаем фильтр)
        selected.splice(selected.indexOf(value), 1)
      } else {
        // Добавляем фильтр
        selected.push(value)
      }

      return {
        ...resetFilters(state),
        [filterKey]: {
          ...state[filterKey],
          selected
        }
      }

    case actionTypes.SET_SELECTED_PRICE_RANGE:
      return {
        ...resetFilters(state),
        priceRange: {
          ...state.priceRange,
          selected: [action.payload.min, action.payload.max]
        }
      }

    case actionTypes.RESET_FILTER:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: []
        }
      }

    case actionTypes.RESET_ALL_FILTERS:
      return resetAllFilters({ ...state })

    default:
      return state
  }
}

export default filter