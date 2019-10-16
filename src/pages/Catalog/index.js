import React, { Component } from "react"
import styles from "./Catalog.module.sass"
// import Filter from "components/CatalogPage/Filter"
import Catalog from "components/CatalogPage/Catalog"

class CatalogPage extends Component {
  render() {
    return (
      <div className={styles.catalog}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {/*<Filter/>*/}
            </div>
            <div className="col-9 pt-3">
              <Catalog/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CatalogPage