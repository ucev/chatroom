const defaultState = {
  counter: 0,
  // front page tab
  page: "chat",
  // front page or chat page
  curpage: 'front',
  loginState: 'login',
  // users who you can chat with
  users: [],
  // user who you are chatting with
  toid: 0,
  conversations: [],
  // users who you have conversations with
  ongoingDialog: []
}
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case "CHANGE_LOGIN_STATE":
      return Object.assign({}, state, {loginState: action.newState});
    case "CUR_PAGE_CHANGE":
      var newState = action.data;
      newState.curpage = action.curpage;
      return Object.assign({}, state, newState);
    case "GET_USERS":
      return Object.assign({}, state, {users: action.users});
    case "PAGE_CHANGE":
      var newState = Object.assign({}, {page: action.page}, action.data);
      return Object.assign({}, state, newState);
    case "PAGE_CHECK":
      break;
    case "SENTENCE_RECEIVED":
      var conversations = Array.from(state.conversations);
      conversations.push(action.data);
      return Object.assign({}, state, {conversations: conversations});
    case "SET_USER_INFO":
      var userinfo = {userid: action.userid, nickname: action.nickname};
      return Object.assign({}, state, userinfo);
    case "USER_LOGIN":
      break;
    case "USER_REGISTER":
      break;
    default:
      return Object.assign({}, state);
  }
};

export default reducer;
