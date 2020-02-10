import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from "react-router-dom"

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
                       circle: 0
                    }]
                 }) => {
   const [activeSizeIndex, setActiveSizeIndex] = useState(firstActiveSizeIndex)

   useEffect(() => {
      setActiveSizeIndex(firstActiveSizeIndex)

   }, [firstActiveSizeIndex])

   const firstSize = sizes[activeSizeIndex]

   const handleSizeClick = (index) => {
      setActiveSizeIndex(index)
   }

   return (
      <div className={cn(styles.product, 'col-6', 'mb-2', 'pl-1', 'pr-1')} key={id}>
         <Link className={styles.image} to={`/catalog/${slug}`}>
            {/*<p className={styles.size}>{firstSize.h}см / {firstSize.w}см</p>*/}
            <Photo src={firstSize.image}/>
            <SizeInfo className={styles.size} circle={firstSize.circle}/>
         </Link>

         <Available
            now={available.now}
            fromDate={available.fromDate}
            className="np"
         />

         <Link className={styles.title} to={`/catalog/${slug}`}>
            {title}
         </Link>

         <div className={styles.sizes}>
            {sizes.map(({ title, price, active }, i) => (
               <SizeTitle
                  key={i}
                  title={title}
                  price={price}
                  active={activeSizeIndex === i}
                  onClick={() => handleSizeClick(i)}
               />
            ))}
         </div>
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