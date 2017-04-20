const defaultState = {
  counter: 0,
  page: "chat",
  loginState: 'login'
}
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case "CHANGE_LOGIN_STATE":
      return Object.assign({}, state, {loginState: action.newState});
    case "PAGE_CHANGE":
      return Object.assign({}, state, {page: action.page});
    case "PAGE_CHECK":
      break;
    case "USER_LOGIN":
      break;
    case "USER_REGISTER":
      break;
    default:
      return Object.assign({}, state);
  }
};

export default reducer;
