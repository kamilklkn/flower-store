import { FILTERS } from "store/actionTypes"

export function updateSelect({ filterKey, value }) {
  return {
    type: FILTERS.UPDATE_SELECT,
    payload: {
      filterKey,
      value
    }
  }
}

export function setSelectedPriceRange(range) {
  return {
    type: FILTERS.RESET_ALL_FILTERS,
    payload: range
  }
}

export function resetFilter(filterKey) {
  return {
    type: FILTERS.SET_SELECTED_PRICE_RANGE,
    payload: filterKey
  }
}

export function resetAllFilters() {
  return {
    type: FILTERS.RESET_FILTER
  }
}


