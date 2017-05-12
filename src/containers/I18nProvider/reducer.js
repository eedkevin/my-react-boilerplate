import { FETCH_MESSAGE_SUCCEED, FETCH_MESSAGE_FAILED } from './actions';

function i18nReducer(state, action) {
  if (!state) {
    state = { locale: 'zh-Hant', messages: require(`../../translations/zh-Hant.json`) };
  }
  switch(action.type) {
    case FETCH_MESSAGE_SUCCEED: {
      return {
        ...state,
        locale: action.payload.locale,
        messages: action.payload.messages,
      };
    }
    case FETCH_MESSAGE_FAILED: {
      alert(action.payload.error);
      return state;
    }
    default:
      return state;
  }
}

export default i18nReducer;
