const cookie = require('js-cookie');
import store from './store';

const action = {
  __unsubscribe: undefined,
  changeLoginState: (newState) => {
    store.dispatch({ type: "CHANGE_LOGIN_STATE", newState: newState });
  },
  getState: () => {
    return store.getState();
  },
  login: function(username, password) {
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
            cookie.set("userid", data.data.id);
            that.pageChange("chat");
          } else {
            alert("登陆失败");
          }
        })
      }
    })
  },
  pageChange: (page) => {
    return store.dispatch({ type: "PAGE_CHANGE", page: page });
  },
  pageCheck: function() {
    var user = cookie.get("user");
    var that = this;
    if (!user) {
      that.pageChange("login");
    }
  },
  register: function(username, password) {
    var that = this;
    var fd = new FormData();
    fd.append("username", action.username);
    fd.append("password", action.password);
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
