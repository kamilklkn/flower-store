import React, { Component } from "react"
import loadable from "@loadable/component"
import PageLayout from "layouts/Page"
import ProductsListContainer from "containers/productsList"
import FilterResetAllButtonContainer from 'containers/filtersResetAllButton'
// import Filter from "components/Filter"
import styles from "./Catalog.module.sass"

// import pMinDelay from 'p-min-delay' pMinDelay(,2000)


const fallback = () => (
  <div>Загрузка...</div>
)
const Filter = loadable(() => import('components/Filter'), {
  fallback: fallback(),
})



class CatalogPage extends Component {
  render() {
    return (
      <PageLayout>
        <div className={styles.catalog}>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <Filter/>
                <FilterResetAllButtonContainer/>
              </div>
              <div className="col-9 pt-3">
                <ProductsListContainer/>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }
}

export default CatalogPage