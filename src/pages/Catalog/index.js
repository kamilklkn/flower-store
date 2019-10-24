import React, { Component } from "react"
import styles from "./Catalog.module.sass"
import Catalog from "components/CatalogPage/Catalog"
// import Filter from 'components/CatalogPage/Filter'
import loadable from "@loadable/component"
import PageLayout from "layouts/Page"

const fallback = () => (
  <div>Loading...</div>
)

const Filter = loadable(() => import('components/CatalogPage/Filter'), fallback)

class CatalogPage extends Component {
  render() {
    return (
      <PageLayout>
        <div className={styles.catalog}>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <Filter/>
              </div>
              <div className="col-9 pt-3">
                <Catalog/>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }
}

export default CatalogPage