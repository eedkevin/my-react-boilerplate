import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import i18nReducer from '../containers/I18nProvider/reducer';

function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    i18n: i18nReducer,
    ...asyncReducers,
  });
}

export default createReducer;
