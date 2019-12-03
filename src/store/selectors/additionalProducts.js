import { createSelector } from "reselect"

const additionalProductsEntitiesSelector = state =>
  state.entities.additionalProducts

export const additionalProductsSelector = createSelector(
  additionalProductsEntitiesSelector,
  (entities) => entities.allIds.map(id => entities.byId[id])
)
