import { createSelector } from "reselect"

const cartItemsSelector = state => state.ui.cart.products.byId
const cartItemsAllIdsSelector = state => state.ui.cart.products.allIds

const cartAdditionalItemsSelector = state => state.ui.cart.additionalProducts.byId
const cartAdditionalItemsAllIdsSelector = state => state.ui.cart.additionalProducts.allIds

const totalProductPriceSelector = createSelector(
  [cartItemsAllIdsSelector, cartItemsSelector],
  (allIds, itemsById) => {
    return allIds.reduce((total, id) => {
      const { count, price } = itemsById[id]
      return total + (count * price)
    }, 0)
  }
)

const totalAdditionalProductPriceSelector = createSelector(
  [cartAdditionalItemsAllIdsSelector, cartAdditionalItemsSelector],
  (allIds, itemsById) => {
    return allIds.reduce((total, id) => {
      const { count, price } = itemsById[id]
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




