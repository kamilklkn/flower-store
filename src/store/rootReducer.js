import { combineReducers } from "redux"
import filter from "components/CatalogPage/Filter/reducer"
import catalog from "components/CatalogPage/Catalog/reducer"

const rootReducer = combineReducers({
  catalog,
  filter
})

export default rootReducer