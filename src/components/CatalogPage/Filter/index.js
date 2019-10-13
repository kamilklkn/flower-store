import React, { Component } from 'react'
import { connect } from "react-redux"
import { FILTER_TYPES } from 'constants/filterTypes'
import * as actions from './actions'

import styles from './Filter.module.sass'
import ButtonsGroupExpander from "components/CatalogPage/Filter/ButtonsGroupExpander";
import Button from "components/CatalogPage/Filter/Button";
import ColorButton from "components/CatalogPage/Filter/ColorButton";


class Filter extends Component {
  handleItemClick = (itemId, filterKey) => {
    this.props.updateSelect({itemId, filterKey})
  }

  renderFilterItemsByType(filter, filterKey) {
    switch (filter.type) {
      case FILTER_TYPES.ITEMS_OBJECTS:
        return filter.items.map(button =>
          <Button
            key={button.id}
            title={button.name}
            active={filter.selected.includes(button.id)}
            onClick={this.handleItemClick.bind(this, button.id, filterKey)}
          />
        )

      case FILTER_TYPES.COLORS_BUTTONS:
        return filter.items.map(button =>
          <ColorButton
            key={button.id}
            color={button.color}
            active={filter.selected.includes(button.id)}
            title={button.name}
            onClick={this.handleItemClick.bind(this, button.id, filterKey)}
          />
        )

      case FILTER_TYPES.RANGE:
        return (
          <div>Range</div>
        )
      default:
        return
    }
  }


  render() {
    return (
      <div className={styles.filter}>
        {
          // Более функциональный стиль, чем с Object.keys
          // Потому что, мы будем из нутри обращаться к this.props.filter[key]
          Object.entries(this.props.filter).map(item => {
            const [filterKey, filter] = item
            return (
              <ButtonsGroupExpander
                key={filterKey}
                className={filterKey}
                title={filter.title}
              >
                <ul>
                  {this.renderFilterItemsByType(filter, filterKey)}
                </ul>
              </ButtonsGroupExpander>
            )
          })
        }
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
    updateSelect: (params) => {
      dispatch(actions.updateSelect(params))

    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);