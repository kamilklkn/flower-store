import React from 'react'
import 'mdn-polyfills/Object.assign'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
// import loadable from "@loadable/component"

import CatalogPage from "pages/Catalog"
import Page404 from "pages/404"
import "bootstrap/scss/bootstrap-grid.scss"

// const Product = loadable(() => import('pages/Product'), () => <div>Loading...</div>)


const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={CatalogPage}/>
      <Route exact path="/catalog" component={CatalogPage}/>
      {/*<Route path="/catalog/:product" component={ProductPage}/>*/}
      {/*<Route exact path="cabinet" component={Home}/>*/}
      {/*<Route exact path="cart" component={Home}/>*/}

      <Route path="*" component={Page404}/>
    </Switch>
  </ConnectedRouter>
)

export default App
