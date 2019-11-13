import { createSelector } from 'reselect'
import * as filtersFunctions from "utils/filtersFunctions"


const getProductById = (state, id) => state.entities.products[id]

const getProducts = state =>
  state.ui.catalogPage.ids.map(id => getProductById(state, id))

export const getStatusSizesFilter = state => 'bySizes' in state.ui.selectedFilters
export const getStatusPriceFilter = state => 'bySizesPrice' in state.ui.selectedFilters
export const getSelectedFilters = state => state.ui.selectedFilters
export const getSizesAndPriceSelectedFilters = state => {
  const { bySizes, bySizesPrice } = getSelectedFilters(state)
  return {
    bySizes,
    bySizesPrice
  }
}

export const getFilteredProducts = createSelector(
  [getSelectedFilters, getProducts],
  (selectedFilters, products) => {
    return Object.keys(selectedFilters).reduce((resultProducts, filterKey) => {
      const selected = selectedFilters[filterKey]
      const filterFunction = filtersFunctions[filterKey]

      return filterFunction(resultProducts, selected)
    }, products)
  }
)