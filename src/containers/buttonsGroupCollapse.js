import { connect } from "react-redux"
import { getSelectedFilters } from "store/selectors/products"
import * as actions from "store/actions/selectedFilters"
import ButtonsGroupCollapse from "components/Filter/ButtonsGroupCollapse"
import { getFilters } from "store/selectors/filters"


function mapStateToProps(state) {
  return {
    selectedFilters: getSelectedFilters(state),
    filters: getFilters(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelect: (filterKey, value) => dispatch(actions.updateSelect(filterKey, value)),
    setPriceRange: (min, max) => dispatch(actions.setPriceRange(min, max)),
    resetFilter: (filterKey) => dispatch(actions.resetFilter(filterKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonsGroupCollapse)