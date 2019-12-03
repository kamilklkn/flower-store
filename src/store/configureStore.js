import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

// import monitorReducersEnhancer from 'store/enhancers/monitorReducer'
// import loggerMiddleware from 'store/middleware/logger'
import createRootReducer from './reducers/rootReducer'

import resetFilters from "store/middleware/resetFilters"
import cleanerAdditionalProductsMiddleware from "store/middleware/cleanerAdditionalProducts"

export const history = createBrowserHistory()


export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, routerMiddleware(history),
    resetFilters, cleanerAdditionalProductsMiddleware] //loggerMiddleware
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer] //monitorReducersEnhancer
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers/rootReducer', () => store.replaceReducer(createRootReducer(history)))
  }

  return store
}