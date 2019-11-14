import {
  SELECTED_FILTERS_UPDATE_SELECTED,
  SELECTED_FILTERS_SET_PRICE_RANGE,
  SELECTED_FILTERS_RESET_ALL,
  SELECTED_FILTERS_RESET
} from "store/actionTypes"


const initialState = {
  // bySizesPrice: [2500, 6000],
  // bySizes: ['Премиум'] //, 'Стандартный', 'Большой'
}

const getStateWithoutKey = (state, filterKey) => {
  const { [filterKey]: removedKey, ...withoutKey } = state
  return withoutKey
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FILTERS_RESET_ALL:
      return {}

    case SELECTED_FILTERS_RESET: {
      return getStateWithoutKey(state, action.filterKey)
    }

    case SELECTED_FILTERS_UPDATE_SELECTED:
      const { filterKey, value } = action

      const selected = [filterKey] in state ? [...state[filterKey]] : []
      selected.includes(value) ?
        selected.splice(selected.indexOf(value), 1) :
        selected.push(value)

      if (selected.length) {
        return {
          ...state,
          [filterKey]: selected
        }
      } else {
        return getStateWithoutKey(state, filterKey)
      }

    case SELECTED_FILTERS_SET_PRICE_RANGE:
      const { min, max } = action
      return {
        ...state,
        bySizesPrice: [min, max]
      }

    default:
      return state
  }
}