import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from "./SizeTitleWithPrice.module.sass"
import RoubleSymbol from "components/UI/RoubleSymbol"

const SizeTitleWithPrice = ({
                              title = '[title]',
                              price = 0,
                              active = false
                            }) => (
  <div className={
    cn(styles.titleWithPrice, active && styles.active)
  }>
    {title} — {`\u0020`} <span className={styles.price}>
      {price} <RoubleSymbol/>
    </span>
  </div>
)

SizeTitleWithPrice.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  active: PropTypes.bool
}

export default SizeTitleWithPrice