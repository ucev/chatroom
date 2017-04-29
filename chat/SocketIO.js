const socketio = require('socket.io');
const Chat = require('../class/chat.class');
const Users = require('../class/users.class');

class SocketIO {
  constructor(server) {
    this.io = socketio(server);
    this.sockets = {};
    this.__chat = new Chat();
    this.__users = new Users();
    this.init();
  }

  transferSocketId(id) {
    return `sock${id}`;
  }

  getSocketId(key) {
    return Number(key.substr(4));
  }

  chatInfoReceive(socket, data) {
    console.log("chat info receive");
    console.log(data);
    var that = this;
    data.datetime = Math.floor(data.datetime / 1000);
    this.__chat.add(data).then((id) => {
      data.id = id;
      data.datetime *= 1000;
      var from = that.transferSocketId(data.from);
      var to = that.transferSocketId(data.to);
      if (that.sockets[from]) {
        that.sockets[from].emit("news", data);
      }
      if (that.sockets[to]) {
        that.sockets[to].emit("news", data);
      }
    }).catch(() => {
    })
  }

  chatInfoSent(socket, data) {
    /**
     * 
     */
    console.log("chat info sent");
    console.log(data);
    for (var k in this.sockets) {
      if (this.sockets[k] == socket) {
        var toid = this.getSocketId(k);
        this.__chat.updateUnreadedChat(data.infoid, toid);
      }
    }
  }

  onlineStateChange() {
    for (var k in this.sockets) {
      this.sockets[k].emit("users");
    }
  }

  socketCommandInit(socket, data) {
    var that = this;
    if (socket.initState == 'initing' || !data.id) {
      return;
    }
    socket.initState = 'initing';
    console.log("init data: " + JSON.stringify(data));
    var userid = Number(data.id);
    that.sockets[that.transferSocketId(userid)] = socket;
    that.__users.updateOnlineState(userid, 1).then(() => {
      that.onlineStateChange();
      return that.__chat.getUnreadedChat(userid);
    }).then((infos) => {
      socket.emit("news", infos);
      socket.initState = 'inited';
    }).catch((err) => {
      console.log("ERROR");
      console.log(err);
      socket.initState = 'uninited';
    })
  }

  socketEventConnect(socket) {
    var that = this;
    console.log(`connected: ${socket.id}`);
    socket.on("connect", function () {
      console.log("connected: " + socket.id);
    })
    /**
     * socket.initState: ['uninited', 'initing', 'inited']
     */
    socket.initState = 'uninited';
    socket.on("info", function (data) {
      that.chatInfoReceive(socket, data);
    });
    socket.on("init", function (data) {
      that.socketCommandInit(socket, data);
    });
    socket.on("received", function(data) {
      console.log("---------received");
      that.chatInfoSent(socket, data);
    });
    socket.on("disconnect", function() {
      that.socketEventDisconnect(socket);
    })
  }

  socketEventDisconnect(socket) {
    console.log(`disconnect: ${socket.id}`);
    for (var k in this.sockets) {
      if (this.sockets[k] == socket) {
        /**
         * caution
         */
        console.log(k);
        delete this.sockets[k];
        var userid = this.getSocketId(k);
        this.__users.updateOnlineState(userid, 0).then(() => {
          this.onlineStateChange();
        }).catch(()=>{});
        break;
      }
    }
  }

  init() {
    var that = this;
    this.io.on("connection", function (socket) {
      that.socketEventConnect(socket);
    })
  }

}

module.exports = SocketIO;
