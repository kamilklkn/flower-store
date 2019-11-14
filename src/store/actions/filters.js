import { FILTERS } from "store/actionTypes"

export function updateSelect({ filterKey, value }) {
  return {
    type: FILTERS.UPDATE_SELECTED,
    payload: {
      filterKey,
      value
    }
  }
}

export function setSelectedPriceRange(range) {
  return {
    type: FILTERS.SET_SELECTED_PRICE_RANGE,
    payload: range
  }
}

export function resetFilter(filterKey) {
  return {
    type: FILTERS.RESET_ALL_FILTERS,
    payload: filterKey
  }
}

export function resetAllFilters() {
  return {
    type: FILTERS.RESET_FILTER
  }
}


