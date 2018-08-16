import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from "mobx";
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = {
  @observable messages: [],
  @observable user: null,
  @observable bgUrl: null,
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
