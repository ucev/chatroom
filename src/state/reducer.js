const defaultState = {
  counter: 0,
  // front page tab
  page: "chat",
  // front page or chat page
  curpage: 'chat',
  loginState: 'login'
}
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case "CHANGE_LOGIN_STATE":
      return Object.assign({}, state, {loginState: action.newState});
    case "CUR_PAGE_CHANGE":
      return Object.assign({}, state, {curpage: action.curpage});
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
