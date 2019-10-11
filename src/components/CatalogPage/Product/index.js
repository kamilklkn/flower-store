import React from 'react'
import styles from './Product.module.sass'
import { Link } from 'react-router-dom'
import Available from "components/ProductPage/Available";


const CatalogProduct = ({
                          id = 0,
                          slug = '',
                          title = '',
                          price = 0,
                          image = '',
                          available,
                          size = { h: 0, w: 0 }
                        }) => {
  return (
    <div className={`${styles.product} col-4 mb-2`} key={id}>
      <Link to={`/catalog/${slug}`}>
        <div className={styles.image}>
          {/*<p className={styles.size}>{size.h}см / {size.w}см</p>*/}
          <img src={image} alt={title}/>
        </div>
      </Link>

      {/*<Available*/}
        {/*{...available}*/}
        {/*className="np"*/}
      {/*/>*/}
      <Link className={styles.title} to={`/catalog/${slug}`}>
        {title}
      </Link>



      <span className={styles.price}>
        {price} <span>{`\u20BD`}</span>
      </span>
      <hr/>

    </div>
  );
};

export default CatalogProduct;