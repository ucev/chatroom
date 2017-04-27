const cookie = require('js-cookie');
const moment = require('moment');
import store from './store';

const action = {
  __unsubscribe: undefined,
  __socket: undefined,
  __inited: false,
  changeLoginState: (newState) => {
    store.dispatch({ type: "CHANGE_LOGIN_STATE", newState: newState });
  },
  curPageChange: function (curpage, toid = undefined) {
    var data = { toid: toid };
    if (toid) {
      var conversations = this.storeChatGet(toid);
      data.conversations = conversations;
    }
    store.dispatch({ type: "CUR_PAGE_CHANGE", curpage: curpage, data: data });
  },
  getUsers: () => {
    var userid = cookie.get("userid");
    fetch(`/login/users?id=${userid}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code == 0) {
            store.dispatch({ type: "GET_USERS", users: data.data });
          }
        })
      }
    })
  },
  getState: function () {
    if (!this.__inited) {
      this.__inited = true;
      this.pageChange("chat");
      this.socketConnect();
    }
    return store.getState();
  },
  login: function (username, password) {
    var that = this;
    var fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    fetch("/login/login", {
      method: "POST",
      body: fd
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code === 0) {
            store.dispatch({ type: "SET_USER_INFO", userid: data.data.id, nickname: data.data.nickname });
            cookie.set("userid", data.data.id);
            cookie.set("nickname", data.data.nickname);
            /** 
             * init socketio
             */
            this.socketConnect();
            that.pageChange("chat");
          } else {
            alert("登陆失败");
          }
        })
      }
    })
  },
  pageChange: function (page) {
    var data = {};
    if (page == 'chat') {
      var ongoingDialog = this.storeChatList();
      data.ongoingDialog = ongoingDialog;
      //store.dispatch({ type: "ONGOING_DIALOG", ongoingDialog: ongoingDialog });
    }
    /**
     * 
     */
    this.getUsers();
    return store.dispatch({ type: "PAGE_CHANGE", page: page, data: data });
  },
  pageCheck: function () {
    var userid = cookie.get("userid");
    var that = this;
    if (!userid) {
      that.pageChange("login");
    } else {
      var nickname = cookie.get("nickname");
      store.dispatch({ type: "SET_USER_INFO", userid: userid, nickname: nickname });
    }
  },
  register: function (username, password) {
    var that = this;
    var fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    fetch('/login/register', {
      method: "POST",
      body: fd
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code === 0) {
            alert("注册成功");
            that.changeLoginState("login");
          } else {
            alert("注册失败");
          }
        })
      }
    })
  },
  sendSentence: function (sentence) {
    var userid = cookie.get("userid");
    var state = this.getState();
    var data = { from: userid, to: state.toid, sentence: sentence, datetime: moment().valueOf() };
    this.__socket.emit("info", data);
  },
  sentenceReceived: function (data) {
    /**
     * 
     */
    var toid = this.getState().toid;
    this.storeChatAdd(toid, data);
    return store.dispatch({ type: "SENTENCE_RECEIVED", data: data });
  },
  socketConnect: function () {
    var that = this;
    var userid = cookie.get("userid");
    return this.socketDisconnect().then(function () {
      that.__socket = new io("http://localhost:3003");
      that.__socket.on("connect", function () {
        console.log("connected");
        that.__socket.emit("init", { id: userid });
        that.__socket.on("news", function (data) {
          that.sentenceReceived(data);
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  },
  socketDisconnect: function () {
    var that = this;
    return new Promise((resolve, reject) => {
      if (!that.__socket) {
        resolve();
      }
      that.__socket.on("disconnect", () => {
        resolve();
      })
      that.__socket.disconnect();
    })
  },
  startChat: function (toid) {
    this.curPageChange("chat", toid);
  },
  storeChatAdd(toid, data) {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    var existsData = datas[toid];
    if (!existsData) {
      existsData = [];
    }
    existsData.push(data);
    datas[toid] = existsData;
    localStorage.setItem("ongoingDialog", JSON.stringify(datas));
  },
  storeChatGet(toid) {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    return datas[toid] ? datas[toid] : [];
  },
  storeChatList() {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    var ongoingDialog = [];
    for (var id in datas) {
      var dialogs = datas[id];
      ongoingDialog.push({ id: id, dialog: dialogs[dialogs.length - 1] });
    }
    return ongoingDialog;
  },
  subscribe: function (updateFunc) {
    this.unsubscribe();
    this.__unsubscribe = store.subscribe(updateFunc);
  },
  unsubscribe: function () {
    if (this.__unsubscribe) {
      this.__unsubscribe();
      this.__unsubscribe = undefined;
    }
  }
}

export default action;
