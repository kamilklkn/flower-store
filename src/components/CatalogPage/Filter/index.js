import React, { Component } from 'react'
import { connect } from "react-redux"

import { FILTER_TYPES } from 'constants/filterTypes'
import * as actions from './actions'

import styles from './Filter.module.sass'
import ButtonsGroupExpander from "components/CatalogPage/Filter/ButtonsGroupExpander";
import Button from "components/CatalogPage/Filter/Button";
import ColorButton from "components/CatalogPage/Filter/ColorButton";

import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

class Filter extends Component {
  state = {
    currentPriceRange: {
      min: this.props.currentPriceRange.min || this.props.initialPriceRange.min,
      max: this.props.currentPriceRange.max || this.props.initialPriceRange.max,
    },
  }

  renderFilterItemsByType(filter, filterKey) {
    switch (filter.type) {
      case FILTER_TYPES.RANGE:
        return (
          <InputRange
            step={100}
            minValue={this.props.initialPriceRange.min}
            maxValue={this.props.initialPriceRange.max}
            value={this.state.currentPriceRange}
            onChange={currentPriceRange =>
              this.setState({ currentPriceRange })
            }
            onChangeComplete={currentPriceRange =>
              this.props.setSelectedPriceRange(
                [currentPriceRange.min, currentPriceRange.max]
              )
            }
          />
        )

      case FILTER_TYPES.ITEMS_OBJECTS:
        return filter.items.map(button =>
          <Button
            key={button.id}
            title={button.name}
            active={filter.selected.includes(button.name)}
            onClick={() => this.props.updateSelect({
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
            onClick={() => this.props.updateSelect({
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
      max: filter.priceRange.inititalRange.max
    },
    currentPriceRange: {
      min: filter.priceRange.selected.min,
      max: filter.priceRange.selected.max
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