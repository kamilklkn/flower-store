import 'mdn-polyfills/Object.assign'
import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import loadable from "@loadable/component"

import Catalog from "pages/Catalog"

import "bootstrap/scss/bootstrap-grid.scss"

const Product = loadable(() => import('pages/Product'), () => <div>Loading...</div>)


const Page404 = () => (
  <div>404</div>
)


const App = ({ history }) => (
  <div>
    App
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Catalog}/>
        {/*<Route exact path="cabinet" component={Home}/>*/}
        {/*<Route exact path="cart" component={Home}/>*/}
        <Route exact path="/catalog" component={Catalog}/>
        <Route path="/catalog/:product" component={Product}/>


        <Route path="*" component={Page404}/>
      </Switch>
    </ConnectedRouter>

  </div>
)

export default App
