const socketio = require('socket.io');

class SocketIO {
  constructor(server) {
    this.io = socketio(server);
    this.sockets = {};
    this.init();
  }

  init() {
    this.io.on("connection", function(socket) {
      console.log(`connected: ${socket.id}`);
      socket.on("connect", function() {
        console.log("connected: " + socket.id);
      })
      socket.inited = false;
      socket.on("info", function(data) {
        console.log(`get data at ${Date.now()} from ${socket.id}`);
        socket.emit("news", `get data at ${Date.now()} from ${socket.id}`);
      });
      socket.on("init", function(data) {
        if (socket.inited) {
          return;
        } else {
          if (data.id) {
            this.sockets[data.id] = socket;
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
