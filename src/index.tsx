import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from "history/createBrowserHistory";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import App from "./App";
import './index.css';
import rootReducer from './reducers';

const history = createBrowserHistory();

const middleWare = [
  thunk,
  createLogger(),
  routerMiddleware(history),
];

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(...middleWare),
  ),
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement,
  );
};

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('accept')
    render();
  });
  
  module.hot.accept('./reducers', () => {
    console.log('accept reducers')
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}
