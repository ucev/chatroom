import PageManager from './PageManager';
var pm = new PageManager();
pm.setState("front_page", "ongoing_dialog");
pm.setState("user", "info");
pm.push("front_page", 1);
const defaultState = {
  counter: 0,
  pageState: pm,
  // users who you can chat with
  users: [],
  // user who you are chatting with
  toid: 0,
  conversations: [],
  // users who you have conversations with
  ongoingDialog: [],
  // new info notification
  newinfo: {}
} 
const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case "GET_USERS":
      return Object.assign({}, state, {users: action.users});
    case "NEW_INFO_NOTIFICATION":
      return Object.assign({}, state, {newinfo: {from: action.from, info: action.info}});
    case "PAGE_CHANGE":
      var newState = Object.assign({}, {page: action.page}, action.data);
      return Object.assign({}, state, newState);
    case "PAGE_STATE_CHANGE":
      return Object.assign({}, state, action.data);
    case "SENTENCE_RECEIVED":
      var conversations = Array.from(state.conversations);
      conversations.push(action.data);
      return Object.assign({}, state, {conversations: conversations, ongoingDialog: action.ongoingDialog});
    case "SET_USER_INFO":
      var newState = {userid: action.userid, nickname: action.nickname, avatar: action.avatar};
      return Object.assign({}, state, newState);
    case "USER_LOGIN":
      break;
    case "USER_REGISTER":
      break;
    default:
      return Object.assign({}, state);
  }
};

export default reducer;
