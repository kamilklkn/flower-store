import React from 'react'
import { Provider } from 'react-redux'
import store from "store/configureStore"
import Product from "pages/Product"
import Catalog from "pages/Catalog"
import Home from 'pages/Home'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import "bootstrap/scss/bootstrap-grid.scss"

const Page404 = () => (
  <div>404</div>
)

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="cabinet" component={Home}/>
            <Route exact path="cart" component={Home}/>
            <Route exact path="/catalog" component={Catalog}/>
            <Route path="/catalog/:product" component={Product}/>
              {/*{*/}
                {/*console.log(match.params.product)*/}
              {/*}*/}
              {/*/!*<Redirect  to={{*!/*/}
                {/*/!*pathname: "/login",*!/*/}
                {/*/!*state: { from: location }*!/*/}
              {/*/!*}}/>*!/*/}

              {/*<Product/>*/}
            {/*</Route>*/}
            <Route path="*" component={Page404} />
          </Switch>
        </div>
      </Provider>
    </Router>
  )
}

export default App
