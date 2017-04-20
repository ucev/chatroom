const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');


const app = express();
const login = require('./router/login');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/login', login);
app.get('/test', (req, res) => {
  res.json({a: 1, b: 2});
});

/*
const server = require('http').createServer(app);
const io = require('socket.io')();
io.on("connection", function(socket) {
  socket.on("chat", function(msg) {
    //socket.broadcast("chat out", "hello, " + Date.now());
    socket.emit("chat out", "hello, " + Date.now());
  })
});*/


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

module.exports = app;
