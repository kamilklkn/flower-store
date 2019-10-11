import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row } from "components/Bootstrap"
import CatalogProduct from "components/CatalogPage/Product";


class Catalog extends Component {
  render() {
    console.log('Catalog render')
    const { products, filter } = this.props
    // console.log(products)

    // const filteredProducts = products
    // Здесь сделать фильтрацию товаров с использованием reselect
    const filteredProducts = Object.values(filter).reduce((results, filter) => {
      // Не запускаем фильтр, если он не установлен
      if ('selected' in filter && !filter.selected.length) {
        console.log(filter.title)
        return results
      }
      return filter.func(results, filter)
    }, products)

    return (
      <Row>
        {filteredProducts.map(product => {
          const size = product.sizes[0]
          return (
            <CatalogProduct
              key={product.id}
              slug={product.slug}
              title={product.title}
              price={size.price}
              image={size.image}
              available={product.available}
              size={{
                h: size.h,
                w: size.w,
              }}
            />
          )
        })}
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.catalog.products,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps
)(Catalog)