import { FILTERS } from "store/actionTypes"
import { FILTER_TYPES } from "constants/filterTypes"

// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productShades } from "constants/productShades"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"
import { stability } from "constants/filter/stability"

{
  type: 'UPDATE_SELECTED',
    filterKey: 'bySizes',
  value: 'Стандартный'
}

{
  type: 'RESET_FILTER',
    filterKey: 'bySizes'
}

{
  type: 'UPDATE_SELECTED',
    filterKey: 'bySizes',
  value: 'Большой'
}

{
  type: 'RESET_ALL_FILTERS'
}

{
  type: 'SET_SELECTED_PRICE_RANGE',
    min: 3000,
  max: 5000
}


// function resetFilters(state) {
//   const newState = { ...state }
//
//   Object.keys(newState).map(key => {
//     if ('filtersToReset' in newState[key]
//       && newState[key].filtersToReset.length
//     ) {
//       // todo: fix it. It runs on any filter click.
//       // todo: учитывать, что
//       // console.log(key)
//       // newState[key].filtersToReset.forEach(filterKey => {
//       //   // Сбрасываем выбранное на фильтре
//       //   newState[filterKey].selected = []
//       // })
//     }
//   })
//
//   return newState
// }


// function resetAllFilters(state) {
//   Object.values(state).forEach(filter => {
//     filter.selected = []
//   })
//   return state
// }


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


const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTERS.UPDATE_SELECT:
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

    case FILTERS.SET_SELECTED_PRICE_RANGE:
      return {
        ...resetFilters(state),
        priceRange: {
          ...state.priceRange,
          selected: [action.payload.min, action.payload.max]
        }
      }

    case FILTERS.RESET_FILTER:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: []
        }
      }

    case FILTERS.RESET_ALL_FILTERS:
      return resetAllFilters({ ...state })

    default:
      return state
  }
}

export default filters