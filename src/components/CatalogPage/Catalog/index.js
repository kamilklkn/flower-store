import React from 'react'
import { connect } from 'react-redux'
import { Row } from "components/Bootstrap"
// import Product from "components/CatalogPage/Product"
import { Link } from 'react-router-dom'
import Available from "components/ProductPage/Available"

import styles from "components/CatalogPage/Catalog/Catalog.module.sass"
import { getNameById, classes } from "utils"
import { productSizes } from "constants/productSizes"


// function filterProducts(products, filter) {
//   // console.log(products)
//   // Здесь сделать фильтрацию товаров с использованием reselect
//
//   return Object.values(filter).reduce((results, filter) => {
//     // Не запускаем фильтр, если он не установлен
//     if ('selected' in filter && !filter.selected.length) {
//       return results
//     }
//     return filter.func(results, filter)
//   }, products)
//
// }

const TitleWithPrice = ({ title, price, active }) => (
  <div className={classes(
    styles.titleWithPrice,
    active && styles.inactive
  )}>
    {title} — {`\u0020`}
    <span className={styles.price}>
      {price} <span>{`\u20BD`}</span>
    </span>
  </div>
)


const Catalog = ({ products, showOnlyRequiredSizes, requiredSizesIds }) => {
  return (
    <Row>
      {products.map(product => {
        const firstSize = product.sizes[0]
        const { available, id, slug, title, sizes } = product

        return (
          <div className={`${styles.product} col-4 mb-2 pl-1 pr-1`} key={id}>
            <Link to={`/catalog/${slug}`}>
              <div className={styles.image}>
                {/*<p className={styles.size}>{size.h}см / {size.w}см</p>*/}
                <img src={firstSize.image} alt={title}/>
              </div>
            </Link>

            <Available
              now={available.now}
              fromDate={available.fromDate}
              className="np"
            />

            <Link className={styles.title} to={`/catalog/${slug}`}>
              {title}
            </Link>

            {
              showOnlyRequiredSizes ? (
                  <div className={styles.sizes}>
                    {
                      sizes.map(size =>
                        <TitleWithPrice
                          key={size.id}
                          title={getNameById(size.id, productSizes)}
                          price={size.price}
                          active={!requiredSizesIds.includes(size.id)}
                        />
                      )
                    }
                  </div>
                )
                : (
                  <p className={styles.price}>
                    {firstSize.price} <span>{`\u20BD`}</span>
                  </p>
                )
            }

            <hr/>
          </div>
        )
      })}
    </Row>
  )
}

function mapStateToProps(state) {
  return {
    // products: filterProducts(state.catalog.products, state.filter),
    products: state.catalog.products,
    // showOnlyRequiredSizes: !!state.filter.sizes.selected.length,
    // requiredSizesIds: state.filter.sizes.selected
  }
}

export default connect(
  mapStateToProps
)(Catalog)