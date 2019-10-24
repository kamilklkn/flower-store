import React, { Component } from 'react'
import { connect } from "react-redux"

import { FILTER_TYPES } from 'constants/filterTypes'
import * as actions from './actions'

import styles from './Filter.module.sass'
import ButtonsGroupExpander from "components/CatalogPage/Filter/ButtonsGroupExpander";
import Button from "components/CatalogPage/Filter/Button";
import ColorButton from "components/CatalogPage/Filter/ColorButton";
import InputPriceRange from "components/CatalogPage/Filter/InputPriceRange";


class Filter extends Component {
  renderFilterItemsByType(filter, filterKey) {
    const {
      initialPriceRange,
      currentPriceRange,
      setSelectedPriceRange,
      updateSelect
    } = this.props

    switch (filter.type) {
      case FILTER_TYPES.RANGE:
        return (
          <InputPriceRange
            initial={initialPriceRange}
            current={currentPriceRange}
            onChangeComplete={(range) => setSelectedPriceRange(range)}
          />
        )

      case FILTER_TYPES.ITEMS_OBJECTS:
        return filter.items.map(button =>
          <Button
            key={button.id}
            title={button.name}
            active={filter.selected.includes(button.name)}
            onClick={() => updateSelect({
              filterKey, value: button.name
            })}
          />
        )

      case FILTER_TYPES.COLORS_BUTTONS:
        return filter.items.map(button =>
          <ColorButton
            key={button.id}
            color={button.color}
            active={filter.selected.includes(button.name)}
            title={button.name}
            onClick={() => updateSelect({
              filterKey, value: button.name
            })}
          />
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
          // Потому что, мы будем не из нутри обращаться к this.props.filter[key]
          Object.entries(this.props.filter)
          // Сортируем ключи по подярку, чтобы Safari не менял
          // порядок отображения фильтров
            .sort((a, b) => a[1].order > b[1].order ? 1 : -1)
            .map(item => {
              const [filterKey, filter] = item
              return (
                <ButtonsGroupExpander
                  key={filterKey}
                  className={filterKey}
                  title={filter.title}
                  expandDefault={filter.expand}
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
    filter,
    initialPriceRange: {
      min: filter.priceRange.inititalRange.min,
      max: filter.priceRange.inititalRange.max,
    },
    currentPriceRange: {
      min: filter.priceRange.selected[0],
      max: filter.priceRange.selected[1]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelect: (params) => dispatch(actions.updateSelect(params)),
    setSelectedPriceRange: (range) => dispatch(actions.setSelectedPriceRange(range))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);