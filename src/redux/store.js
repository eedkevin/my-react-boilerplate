import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const reducers = createReducer();
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  sagas.forEach(saga => store.runSaga(saga));
  return store;
}

export default configureStore;
