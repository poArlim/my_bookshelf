import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer, 
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </Provider>

  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
