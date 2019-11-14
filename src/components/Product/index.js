import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from "react-router-dom"

import RoubleSymbol from "components/UI/RoubleSymbol"
import Available from "components/ProductDetails/Available"
import Photo from "components/Product/Photo"
import SizeTitle from "components/Product/SizeTitle"
import SizeInfo from "components/Product/SizeInfo"

import styles from "components/Product/Product.module.sass"


const Product = ({
                   id = 0,
                   title = '[title]',
                   slug = '[slug]',
                   available = {
                     now: true,
                     fromDate: ''
                   },
                   showPriceAllSizes = false,
                   firstActiveSizeIndex = 0,
                   sizes = [{
                     title: '[sizeTitle]',
                     price: 0,
                     image: '',
                     h: 10,
                     w: 10
                   }]
                 }) => {

  const firstSize = sizes[firstActiveSizeIndex]

  return (
    <div className={cn(styles.product, 'col-4', 'mb-2', 'pl-1', 'pr-1')} key={id}>
      <Link className={styles.image} to={`/catalog/${slug}`}>
        {/*<p className={styles.size}>{firstSize.h}см / {firstSize.w}см</p>*/}
        <Photo src={firstSize.image}/>
        <SizeInfo className={styles.size} height={firstSize.h} weight={firstSize.w}/>
      </Link>


      <Available
        now={available.now}
        fromDate={available.fromDate}
        className="np"
      />

      <Link className={styles.title} to={`/catalog/${slug}`}>
        {title}
      </Link>

      {showPriceAllSizes ? (
        <div className={styles.sizes}>
          {sizes.map((size, i) =>
            <SizeTitle
              key={i}
              {...size}
            />)}
        </div>
      ) : (
        <p className={styles.price}>
          {firstSize.price} <RoubleSymbol/>
        </p>
      )}
      <hr/>
    </div>
  )
}


Product.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  available: PropTypes.shape({
    now: PropTypes.bool.isRequired,
    fromDate: PropTypes.instanceOf(Date)
  }),
  sizes: PropTypes.array.isRequired,
  showPriceAllSizes: PropTypes.bool,
  firstActiveSizeIndex: PropTypes.number
}


export default Product