import style from './src/stylesheets/application.scss';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './src/store'
import App from './src/containers/App.js';

let state;
const store = configureStore(state)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('mount')
);
