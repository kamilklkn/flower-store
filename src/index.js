import React from 'react'
import { render } from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.css'
import configureStore, { history } from "store/configureStore"
import { Provider } from "react-redux"

const store = configureStore()

render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
