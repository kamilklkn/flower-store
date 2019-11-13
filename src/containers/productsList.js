import React, { Component } from 'react'
import { connect } from "react-redux"
import { fetchProducts } from "store/actions/catalog"
import Catalog from "components/Catalog"
import { getProductsSelector } from "store/selectors/catalog"

class CatalogContainer extends Component {
  componentDidMount() {
    console.log('fetchProducts')
    this.props.fetchProducts()
  }

  static defaultProps = {
    products: []
  }

  render() {
    const { products } = this.props
    console.log('products', products)

    return (
      <div>
        dfsf
        {/*<Catalog/>*/}
      </div>
    )
  }
}

// todo унести отельно в api grass
// todo унести в апи additionalProducts


const mapStateToProps = state => ({
  products: getProductsSelector(state)
})

const mapDispatchToProps = {
  fetchProducts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogContainer)


function filterTest(products, filter) {
  // console.log(products)
  // Здесь сделать фильтрацию товаров с использованием reselect
  // https://medium.com/devschacht/neil-fenton-improving-react-and-redux-performance-with-reselect-40f1d3efba89
// https://www.npmjs.com/pack age/reselect

  return Object.values(filter).reduce((results, filter) => {
    // Не запускаем фильтр, если он не установлен
    if ('selected' in filter && !filter.selected.length) {
      return results
    }
    return filter.func(results, filter)
  }, products)

}


function filterProducts(products, filter) {
  // console.log(products)
  // Здесь сделать фильтрацию товаров с использованием reselect
  // https://medium.com/devschacht/neil-fenton-improving-react-and-redux-performance-with-reselect-40f1d3efba89
// https://www.npmjs.com/pack age/reselect

  return Object.values(filter).reduce((results, filter) => {
    // Не запускаем фильтр, если он не установлен
    if ('selected' in filter && !filter.selected.length) {
      return results
    }
    return filter.func(results, filter)
  }, products)

}


// function mapStateToProps(state) {

// const a = compose(
//   ({products, filters}) => {
//     console.log('f2')
//     return {products, filters}
//   },
//   ({products, filters}) => {
//     console.log('f1')
//     return {products, filters}
//   },
// )
//
// const myState = a({
//   products: state.catalog.products.slice(),
//   filters: {...state.filter}
// })
// console.log(myState)
//
// myState.products[0].title = 'dsfsdfsdf'
//
// showOnlyRequiredSizes: !!state.filter.sizes.selected.length
// || !!state.filter.priceRange.selected.length,
//   requiredSizes: state.filter.sizes.selected,
//   selectedPriceRange: state.filter.priceRange.selected
// function mapStateToProps(state) {
//   return {
//     products: filterProducts(state.catalog.products, state.filter),
//   }
// }


// function mapStateToProps(state) {
//   console.log('mapStateToProps', state)
//   return {
//     products: [] //state.catalog.products
//     // products: compose(
//     //   // updateProducts,
//     //   filterProducts
//     // )(state.products)
//   }
// }

