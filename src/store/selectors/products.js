import { createSelector } from 'reselect'
import * as filtersFunctions from "utils/filtersFunctions"

export const getProductsSelector = state => state.entities.products.byId

const getProducts = state =>
  state.entities.products.allIds.map(id => getProductById(state, id))

export const getProductById = (state, id) => state.entities.products.byId[id]
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
export const getCountSelectedFilters = (state) =>
  Object.keys(getSelectedFilters(state)).length

export const getFilteredProducts = createSelector(
  [getSelectedFilters, getProducts],
  (selectedFilters, products) => {
    // return Object.keys(selectedFilters).reduce((resultProducts, filterKey) => {
    //   const selected = selectedFilters[filterKey]
    return Object.entries(selectedFilters).reduce((resultProducts, [filterKey, selected]) => {
      const filterFunction = filtersFunctions[filterKey]

      return filterFunction(resultProducts, selected)
    }, products)
  }
)