import React, { Component } from 'react'
import styles from './Catalog.module.sass'
import Filter from 'components/CatalogPage/Filter'


class Index extends Component {
  render() {
    return (
      <div className={styles.catalog}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Filter/>
            </div>
            <div className="col-9">
              Products
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index