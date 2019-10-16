import React from 'react'
import styles from './AdditionalProducts.module.sass'
import { Row } from "components/Bootstrap"
import { classes } from 'utils'

const AdditionalProducts = ({ products }) => {
  return (
    <div className={styles.additionalProducts}>
      <Row>
        {
          products.map(product =>
            <div className={classes(styles.product, product.active && styles.active)}>
              <img src={product.image} alt={product.title}/>
              {product.price}
              CheckBox {product.active && 'active'}
            </div>
          )
        }
      </Row>
    </div>
  )
}

export default AdditionalProducts