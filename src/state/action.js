const cookie = require('js-cookie');
const moment = require('moment');
import store from './store';

const action = {
  __unsubscribe: undefined,
  __socket: undefined,
  __inited: false,
  getAvatarPath: (avatar) => {
    return `/images/avatar/${avatar}`;
  },
  getUserInfo: function () {
    var that = this;
    var userid = cookie.get("userid");
    fetch(`/login/users/userinfo?userid=${userid}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code == 0) {
            var userinfo = data.data;
            that.setUserInfo(userinfo);
          }
        })
      }
    })
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
      this.socketConnect();
    }
    return store.getState();
  },
  login: function (username, password) {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        alert("用户名或密码不能为空");
        reject();
      }
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
              var userinfo = data.data;
              that.setUserInfo(userinfo);
              resolve();
              // init socketio
              this.socketConnect();
            } else {
              alert("登陆失败");
              reject();
            }
          }).catch(() => {
            reject();
          })
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      })
    })
  },
  logout: function () {
    return new Promise((resolve, reject) => {
      cookie.remove("userid");
      cookie.remove("nickname");
      cookie.remove("avatar");
      this.socketDisconnect();
      resolve();
    })
  },
  newInfoNotification: function (toid, data) {
    if (this.__clearNewInfoNotification) {
      clearTimeout(this.__clearNewInfoNotification);
    }
    var state = store.getState();
    if (state.curpage == 'chat' && state.toid != toid) {
      store.dispatch({ type: "NEW_INFO_NOTIFICATION", from: toid, info: data.content });
      var notEle = document.createElement("audio");
      notEle.src = '/notification.mp3';
      notEle.play();
      this.__clearNewInfoNotification = setTimeout(() => {
        store.dispatch({ type: "NEW_INFO_NOTIFICATION", from: -1, info: "" });
        this.__clearNewInfoNotification = undefined;
      }, 2000);
    }
  },
  register: function (username, password) {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        alert("用户名或密码不能为空");
        reject();
      }
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
              resolve();
            } else {
              reject();
            }
          }).catch(() => {
            reject();
          })
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      })
    })
  },
  sendSentence: function (sentence) {
    var state = this.getState();
    var data = { from: state.userid, to: state.toid, content: sentence, datetime: moment().valueOf() };
    this.__socket.emit("info", data);
  },
  sentenceAdd: function (data) {
    /**
     * 
     */
    // 不能自己发给自己
    if (data.from == data.to) return;
    var state = this.getState();
    var userid = state.userid;
    var toid = data.to == userid ? data.from : data.to;
    if (data.to == userid) {
      this.sentenceReply(data.id);
    }
    this.storeChatAdd(toid, data);
    this.newInfoNotification(toid, data);
    if (data.from == state.toid || state.curpage != 'chat') {
      var ongoingDialog = this.storeChatList();
      return store.dispatch({ type: "SENTENCE_RECEIVED", data: data, ongoingDialog: ongoingDialog });
    }
  },
  sentenceReceived: function (data) {
    if (data instanceof Array) {
      for (var dt of data) {
        this.sentenceAdd(dt);
      }
    } else {
      this.sentenceAdd(data);
    }
  },
  sentenceReply: function (infoid) {
    this.__socket.emit("received", { infoid: infoid });
  },
  setUserInfo: function (userinfo) {
    cookie.set("userid", userinfo.id);
    cookie.set("nickname", userinfo.nickname);
    cookie.set("avatar", userinfo.avatar);
    store.dispatch({ type: "SET_USER_INFO", userid: userinfo.id, nickname: userinfo.nickname, avatar: userinfo.avatar });
  },
  socketConnect: function () {
    var that = this;
    var userid = cookie.get("userid");
    return this.socketDisconnect().then(function () {
      if (!userid) return;
      that.__socket = new io("http://localhost:3003");
      that.__socket.on("connect", function () {
        window.socket = that.__socket;
        that.__socket.emit("init", { id: userid });
        that.__socket.on("news", function (data) {
          that.sentenceReceived(data);
        });
        that.__socket.on("users", function (data) {
          that.getUsers();
        })
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
    var data = {};
    this.storeChatUnreadReset(toid);
    var conversations = this.storeChatGet(toid);
    data.conversations = conversations;
    data.toid = toid;
    store.dispatch({ type: "PAGE_STATE_CHANGE", data: data });
  },
  storeChatAdd(toid, data) {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    var existsData = datas[toid];
    if (!existsData) {
      existsData = { last: 0, unread: 0, data: [] };
    }
    existsData.last = data.datetime;
    existsData.data.push(data);
    existsData.data.sort((a, b) => (a.datetime - b.datetime));
    var state = store.getState();
    if (state.curpage == 'chat' && state.toid == toid) {
      existsData.unread = 0;
    } else {
      existsData.unread += 1;
    }
    datas[toid] = existsData;
    localStorage.setItem("ongoingDialog", JSON.stringify(datas));
  },
  storeChatGet(toid) {
    if (!toid) {
      return [];
    }
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    return datas[toid] ? datas[toid].data : [];
  },
  storeChatUnreadReset(toid) {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    var existsData = datas[toid];
    if (!existsData) {
      existsData = { last: 0, unread: 0, data: [] };
    }
    existsData.unread = 0;
    datas[toid] = existsData;
    localStorage.setItem("ongoingDialog", JSON.stringify(datas));
  },
  storeChatList() {
    var datas = JSON.parse(localStorage.getItem("ongoingDialog"));
    datas = datas ? datas : {};
    var ongoingDialog = [];
    for (var id in datas) {
      var dialogs = datas[id].data;
      ongoingDialog.push({ id: id, dialog: dialogs[dialogs.length - 1], unread: datas[id].unread });
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
  },
  updateNickname: function (nickname) {
    return new Promise((resolve, reject) => {
      var fd = new FormData();
      fd.append("userid", cookie.get('userid'));
      fd.append("nickname", nickname);
      fetch('/login/users/nickname', {
        method: "POST",
        body: fd
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.code == 0) {
              this.getUserInfo();
              resolve();
            } else {
              alert(data.msg);
              reject();
            }
          }).catch(() => {
            reject();
          })
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      })
    })
  },
  uploadAvatar: function (avatar) {
    var fd = new FormData();
    fd.append("avatar", avatar);
    fd.append("userid", cookie.get("userid"));
    fetch("/login/users/avatar", {
      method: "POST",
      body: fd
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code == 0) {
            this.getUserInfo();
          }
        })
      }
    })
  },
  userCheck: function () {
    var userid = cookie.get("userid");
    return !!userid;
  },
}

export default action;
