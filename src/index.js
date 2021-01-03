import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider as ReactProvider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert'; //https://www.npmjs.com/package/react-alert
import * as serviceWorker from './serviceWorker';

import AlertTemplate from './AlertTemplate';

const alertOprions = {
  timeout: 5000,
}

ReactDOM.render(
  <React.StrictMode>
    <ReactProvider store={store()}>
      <AlertProvider template={AlertTemplate} {...alertOprions}>
      <App />
      </AlertProvider>
    </ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
