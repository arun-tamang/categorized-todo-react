import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';
import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

const index = (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(index, document.getElementById('root'));
registerServiceWorker();
