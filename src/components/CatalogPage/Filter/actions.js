import * as actionTypes from './actionTypes'

export function updateSelect({ filterKey, value }) {
  return {
    type: actionTypes.UPDATE_SELECT,
    payload: {
      filterKey,
      value
    }
  }
}

export function setSelectedPriceRange(range) {
  return {
    type: actionTypes.SET_SELECTED_PRICE_RANGE,
    payload: range
  }
}

export function resetFilter(filterKey) {
  return {
    type: actionTypes.RESET_FILTER,
    payload: filterKey
  }
}

export function resetAllFilters() {
  return {
    type: actionTypes.RESET_ALL_FILTERS
  }
}


