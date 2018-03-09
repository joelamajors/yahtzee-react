import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerForBrowser } from 'redux-little-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'

import * as reducers from './reducers.js'
import routes from '../config/routes.js'

// Set up the Redux store in the default way.
const router = routerForBrowser({ routes })
const reducer = combineReducers({
	router: router.reducer,
	...reducers
})
const store = createStore(
  reducer,
  composeWithDevTools(router.enhancer, applyMiddleware(router.middleware)),
  applyMiddleware(reduxThunk)
)

export default store
