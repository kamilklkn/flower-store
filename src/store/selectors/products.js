export const getProductsSelector = state => {
  if (!state.catalog.products) return false
  return state.catalog.products.entities.products
}