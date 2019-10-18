import React from 'react'
import styles from './AdditionalProducts.module.sass'
import { Row } from "components/Bootstrap"
import { classes } from 'utils'

const AdditionalProducts = ({ products }) => {
  return (
    <Row className={styles.additionalProducts}>
      {
        products.map(product =>
          <div className={classes('col-3', styles.product, product.active && styles.active)}>
            <img src={product.image} alt={product.title}/>
            <span>{product.price} {`\u20BD`}</span>
            {product.active && 'active'}
          </div>
        )
      }
    </Row>
  )
}

export default AdditionalProducts