import { createSelector } from "reselect"

export function getTotalByOptions(options = {}) {
  return Object.entries(options).reduce((total, [optionKey, option]) => {
    return total +  option.price
  }, 0)
}

const cartItemsSelector = state => state.ui.cart.products.byId
const cartItemsAllIdsSelector = state => state.ui.cart.products.allIds

const cartAdditionalItemsSelector = state => state.ui.cart.additionalProducts.byId
const cartAdditionalItemsAllIdsSelector = state => state.ui.cart.additionalProducts.allIds

const totalProductPriceSelector = createSelector(
  [cartItemsAllIdsSelector, cartItemsSelector],
  (allIds, itemsById) => {
    return allIds.reduce((total, id) => {
      const product = itemsById[id]
      const { count, price, options } = product
      const totalByOptions = getTotalByOptions(options)
      return total + ((price + totalByOptions) * count)
    }, 0)
  }
)

const totalAdditionalProductPriceSelector = createSelector(
  [cartAdditionalItemsAllIdsSelector, cartAdditionalItemsSelector],
  (allIds, itemsById) => {
    return allIds.reduce((total, id) => {
      const product = itemsById[id]
      const { count, price } = product
      return total + (count * price)
    }, 0)
  }
)

export const totalSelector = createSelector(
  totalProductPriceSelector,
  totalAdditionalProductPriceSelector,
  (productsTotal, AdditionalProductsTotal) =>
    productsTotal + AdditionalProductsTotal
)

export const getItemsSelector = createSelector(
  [cartItemsAllIdsSelector, cartItemsSelector],
  (allIds, itemsById) => allIds.map(id => itemsById[id])
)

export const getAdditionalItemsSelector = createSelector(
  [cartAdditionalItemsAllIdsSelector, cartAdditionalItemsSelector],
  (allIds, itemsById) => allIds.map(id => itemsById[id])
)




