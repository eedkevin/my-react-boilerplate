const CHANGE_LOCALE = 'CHANGE_LOCALE';
const FETCH_MESSAGE_SUCCEED = 'FETCH_MESSAGE_SUCCEED';
const FETCH_MESSAGE_FAILED = 'FETCH_MESSAGE_FAILED';

function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
}

export { CHANGE_LOCALE, FETCH_MESSAGE_SUCCEED, FETCH_MESSAGE_FAILED, changeLocale };
