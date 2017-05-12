import createReducer from '../redux/reducers';

export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  return function injectSagas(sagas) {
    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}

export default getAsyncInjectors;
