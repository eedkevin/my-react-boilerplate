import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore, push } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import I18nProvider from './containers/I18nProvider';
import configureStore from './redux/store';
import createRoutes from './routes';
import Layout from './containers/Layout';

const history = createBrowserHistory();
const store = configureStore({}, history);
// TODO: https://github.com/reactjs/react-router-redux/issues/556
// Enable it after the issue is resolved
// const history = syncHistoryWithStore(browserHistory, store);
syncHistoryWithStore(history, store);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <I18nProvider>
        <Router history={history}>
          <Layout>
            {createRoutes(store)}
          </Layout>
        </Router>
      </I18nProvider>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(() => {
    const newCreateRoutes = require('./routes').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <I18nProvider>
            <Router history={history}>
              <Layout>
                {newCreateRoutes(store)}
              </Layout>
            </Router>
          </I18nProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}