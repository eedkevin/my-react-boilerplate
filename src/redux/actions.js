const CHANGE_TEXT = 'CHANGE_TEXT';

function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text,
  };
}

export { CHANGE_TEXT, changeText };