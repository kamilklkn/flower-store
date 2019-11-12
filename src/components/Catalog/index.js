import React from 'react'
import Img from "react-image"
import { Row } from "components/Bootstrap"
import { Link } from 'react-router-dom'

import Available from "components/Product/Available"
import RoubleSymbol from "components/UI/RoubleSymbol"

import { classes } from "utils"
import styles from "./Catalog.module.sass"


const TitleWithPrice = ({ title, price, active }) => (
  <div className={classes(
    styles.titleWithPrice,
    active && styles.active
  )}>
    {title} — {`\u0020`}
    <span className={styles.price}>
      {price} <span>{`\u20BD`}</span>
    </span>
  </div>
)

const MyComponent = ({ src }) => <Img
  src={src}
  crossOrigin="anonymous"
  loader={<div>loading</div>}
/>


const Catalog = ({
                   products = [],
                   showOnlyRequiredSizes = false,
                   requiredSizes = [],
                   selectedPriceRange = {
                     priceMin: 0,
                     priceMax: 100000
                   }
                 }) => {

  const [priceMin, priceMax] = selectedPriceRange

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
                {/*<img src={firstSize.image} alt={title}/>*/}
                <MyComponent src={firstSize.image}/>
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

            {showOnlyRequiredSizes ? (
                <div className={styles.sizes}>
                  {sizes.map((size, i) =>
                    <TitleWithPrice
                      key={i}
                      title={size.title}
                      price={size.price}
                      active={
                        requiredSizes.includes(size.title)
                        || (size.price >= priceMin && size.price <= priceMax)
                      }
                    />
                  )}
                </div>
              )
              : (
                <p className={styles.price}>
                  {firstSize.price} <RoubleSymbol/>
                </p>
              )}

            <hr/>
          </div>
        )
      })}
    </Row>
  )
}

export default Catalog