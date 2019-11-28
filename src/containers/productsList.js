import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from "react-redux"
import { compose } from "redux"
import { fetchProducts } from "store/actions/products"
import {
  getFilteredProducts,
  getStatusSizesFilter,
  getStatusPriceFilter,
  getSizesAndPriceSelectedFilters
} from "store/selectors/products"
import Product from "components/Product"
import { Row } from "components/Bootstrap"
import Preloader from "components/Preloader"


class ProductsListContainer extends Component {
  static propTypes = {
    products: propTypes.array.isRequired
  }

  static defaultProps = {
    products: []
  }

  static setActiveStatusInSizesOfProducts = (products, selected, callback) =>
    products.map(product => {
      let firstActiveSizeIndex = false
      const sizes = product.sizes.map((size, i) => {
        size.active = callback(size, selected)

        if (size.active && firstActiveSizeIndex === false)
          firstActiveSizeIndex = i

        return size
      })

      return {
        ...product,
        firstActiveSizeIndex,
        sizes
      }
    })

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {
      products,
      isActiveSizesFilter,
      isActivePriceFilter,
      selectedFilters
    } = this.props

    const preparedProducts = compose(
      (products) => !isActiveSizesFilter ? products :
        ProductsListContainer.setActiveStatusInSizesOfProducts(
          products,
          selectedFilters.bySizes,
          (size, selected) => selected.includes(size.title)
        ),
      (products) => !isActivePriceFilter ? products :
        ProductsListContainer.setActiveStatusInSizesOfProducts(
          products,
          selectedFilters.bySizesPrice,
          (size, selected) => {
            const [min, max] = selected
            return size.price >= min && size.price <= max
          }
        )
    )(products)

    // todo это должно приходить из redux,
    //  это должно быть отдельным экшеном начала загрузки
    //  (понять где это располагать в сторе)
    if (!preparedProducts.length) return <Preloader/>

    return (
      <Row>
        {preparedProducts.map(product => (
          <Product
            key={product.id}
            {...product}
            showPriceAllSizes={isActiveSizesFilter || isActivePriceFilter}
          />
        ))}
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  products: getFilteredProducts(state),
  isActiveSizesFilter: getStatusSizesFilter(state),
  isActivePriceFilter: getStatusPriceFilter(state),
  selectedFilters: getSizesAndPriceSelectedFilters(state)
})

const mapDispatchToProps = {
  fetchProducts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListContainer)