import React, { Component } from 'react'
import { connect } from "react-redux"

import { FILTER_TYPES } from 'constants/filterTypes'
import * as actions from 'store/actions/filters'

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

  checkSomeFilterSelected(filters) {
    return Object.values(filters).some(filter => !!filter.selected.length)
  }

  render() {
    const { filters, resetFilter, resetAllFilters } = this.props
    return (
      <div className={styles.filter}>
        {
          // Более функциональный стиль, чем с Object.keys
          // Потому что, мы будем не из нутри обращаться к this.props.filter[key]
          // + Сортируем ключи по порядку, в котором они изначаль были,
          // чтобы Safari не менял порядок отображения фильтров
          // так происходит после обновления стейта фильтра
          Object.entries(filters)
            .sort((a, b) => a[1].order > b[1].order ? 1 : -1)
            .map(item => {
              const [filterKey, filter] = item
              return (
                <ButtonsGroupExpander
                  key={filterKey}
                  filterKey={filterKey}
                  title={filter.title}
                  expandDefault={filter.expand || !!filter.selected.length}
                  showResetButton={!!filter.selected.length}
                  onResetFilter={resetFilter}
                >
                  <ul>
                    {this.renderFilterItemsByType(filter, filterKey)}
                  </ul>
                </ButtonsGroupExpander>
              )
            })
        }

        {
          this.checkSomeFilterSelected(filters) && (
            <div
              onClick={() => resetAllFilters()}
              className={styles.resetAllBtn}
            >
              Сбросить все фильтры
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps({ filter }) {
  return {
    filters: filter,
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
    setSelectedPriceRange: (range) => dispatch(actions.setSelectedPriceRange(range)),
    resetFilter: (filterKey) => dispatch(actions.resetFilter(filterKey)),
    resetAllFilters: () => dispatch(actions.resetAllFilters()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);