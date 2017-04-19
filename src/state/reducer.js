var cookie = require('cookie-cutter');

const defaultState = {
  counter: 0,
  page: "chat",
}
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case "PAGE_CHANGE":
      return Object.assign({}, state, {page: action.page});
    case "PAGE_CHECK":
      var user = cookie.get("user");
      if (!user) {
        return reducer(state, {type: "PAGE_CHANGE", page: "login"});
      }
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
};

export default reducer;
