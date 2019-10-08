import React from 'react'
import { Provider } from 'react-redux'
import store from "store/configureStore"
// import Product from "pages/Product"
import Catalog from "pages/Catalog"

import "bootstrap/scss/bootstrap-grid.scss"


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Catalog/>
        {/*<Product/>*/}
      </div>
    </Provider>
  )
}

export default App
