import {
  SELECTED_FILTERS_UPDATE_SELECTED,
  SELECTED_FILTERS_SET_PRICE_RANGE
} from "store/actionTypes"
import { resetFilter } from "store/actions/selectedFilters"

// При использовании фильтра выбора цены сбрасывает фильтр размера bySizes
// При использовании фильтра выбора размера сбрасывает фильтр цены bySizesPrice
const resetSizePriceFilter = store => next => action => {
  switch (action.type) {
    case SELECTED_FILTERS_UPDATE_SELECTED:
      if (action.filterKey === 'bySizes') next(resetFilter('bySizesPrice'))
      return next(action)

    case SELECTED_FILTERS_SET_PRICE_RANGE:
      next(resetFilter('bySizes'))
      return next(action)

    default:
      return next(action)
  }
}

export default resetSizePriceFilter