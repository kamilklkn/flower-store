import { FILTERS } from "store/actionTypes"

const initialState = {
  bySizesPrice: [2500, 6000],
  bySizes: ['Премиум'] //, 'Стандартный', 'Большой'
}

const getStateWithoutKey = (state, filterKey) => {
  const { [filterKey]: removedKey, ...withoutKey } = state
  return withoutKey
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTERS.RESET_ALL_FILTERS:
      return {}

    case FILTERS.RESET_FILTER: {
      return getStateWithoutKey(state, action.filterKey)
    }

    case FILTERS.UPDATE_SELECTED:
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

    case FILTERS.SET_SELECTED_PRICE_RANGE:
      const { min, max } = action
      return {
        ...state,
        bySizesPrice: [min, max]
      }

    default:
      return state
  }
}