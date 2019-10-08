import React, { Component } from 'react'
import { connect } from "react-redux"
import FilterGroup from 'components/CatalogPage/Filter/FilterGroup'
import { FILTER_TYPES } from 'constants/filterTypes'
import * as actions from './actions'

import styles from './Filter.module.sass'


class Filter extends Component {
  handleFilterElementClick = (filterKey, itemId) => {
    this.props.updateSelect({ filterKey, itemId })
  }

  renderFilter() {
    return Object.keys(this.props.filter).map(key => {
      const filter = this.props.filter[key]

      switch (filter.type) {
        case FILTER_TYPES.ITEMS_OBJECTS:
          return (
            <FilterGroup
              key={key}
              filterKey={key}
              title={filter.title}
              items={filter.items}
              selected={filter.selected}
              onClickItem={this.handleFilterElementClick}
            />
          )
        case FILTER_TYPES.RANGE:
          return (
            <div key={key}>Range</div>
          )
        default:
          return (<div>default</div>)
      }
    })
  }


  render() {
    return (
      <div className={styles.filter}>
        {this.renderFilter()}
      </div>
    )
  }
}

function mapStateToProps({ filter }) {
  return {
    filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelect: (params) => dispatch(actions.updateSelect(params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);