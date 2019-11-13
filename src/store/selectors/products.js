import { createSelector } from 'reselect'
import * as filtersFunctions from "utils/filtersFunctions"


export const getStatusSizesFilter = (state) => 'bySizes' in state.ui.selectedFilters


const getProductById = (state, id) => state.entities.products[id]

const getProducts = state =>
  state.ui.catalogPage.ids.map(id => getProductById(state, id))

const getSelectedFilters = state => state.ui.selectedFilters


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