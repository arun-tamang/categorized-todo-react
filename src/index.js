import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

const index = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(index, document.getElementById('root'));
registerServiceWorker();
