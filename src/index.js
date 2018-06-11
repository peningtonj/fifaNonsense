
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./js/reducers/index.js";
import store from './js/store/store.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-select/dist/react-select.css';
import 'react-table/react-table.css'
import 'react-tabs/style/react-tabs.css';
import './index.css';

import { Provider } from 'react-redux'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

registerServiceWorker();
