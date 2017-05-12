import { call, put, takeEvery } from 'redux-saga/effects';
import { CHANGE_LOCALE, FETCH_MESSAGE_SUCCEED, FETCH_MESSAGE_FAILED } from './actions';

function fetchMessagesFromAPI(locale) {
  switch (locale) {
    case 'en':
      return import(`../../translations/en.json`);
    case 'zh-Hans':
      return import(`../../translations/zh-Hans.json`);
    case 'zh-Hant':
      return import(`../../translations/zh-Hant.json`);
    default:
      return import(`../../translations/en.json`);
  }
}

function* fetchMessages(action) {
  try {
    const messages = yield call(fetchMessagesFromAPI, action.payload);
    yield put({type: FETCH_MESSAGE_SUCCEED, payload: {locale: action.payload, messages}});
  } catch (e) {
    yield put({type: FETCH_MESSAGE_FAILED, payload: {locale: action.payload, error: e.message }});
  }
}

function* i18nSaga() {
  yield takeEvery(CHANGE_LOCALE, fetchMessages);
}

export default [i18nSaga];
