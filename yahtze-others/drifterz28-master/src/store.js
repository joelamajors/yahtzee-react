import React from 'react';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

export function configureStore(initialState) {
  const reducer = combineReducers({
    ...reducers,
  });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware
      )
    )
  );
  return store;
}
