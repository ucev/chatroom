const socketio = require('socket.io');

class SocketIO {
  constructor(server) {
    this.io = socketio(server);
    this.sockets = {};
    this.init();
  }

  transferSocketId(id) {
    return `sock${id}`;
  }

  init() {
    var that = this;
    this.io.on("connection", function(socket) {
      console.log(`connected: ${socket.id}`);
      socket.on("connect", function() {
        console.log("connected: " + socket.id);
      })
      socket.inited = false;
      socket.on("info", function(data) {
        var from = that.transferSocketId(data.from);
        var to = that.transferSocketId(data.to);
        if (that.sockets[from]) {
          that.sockets[from].emit("news", data);
        }
        if (that.sockets[to]) {
          that.sockets[to].emit("news", data);
        }
        socket.emit("reply", "data sent");
      });
      socket.on("init", function(data) {
        if (socket.inited) {
          return;
        } else {
          console.log("init data: " + JSON.stringify(data));
          if (data.id) {
            that.sockets[that.transferSocketId(data.id)] = socket;
            socket.inited = true;
          }
        }
      })  
    })
    this.io.on("disconnec", function(socket) {
      console.log(`disconnect: ${socket.id}`);
    })
  }

}

module.exports = SocketIO;
