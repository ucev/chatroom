const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const configs = require('./configs/config');
// router
const login = require('./router/login');
const test = require('./router/test');
const port = require('./configs/config').websiteconfig.port;

var app = undefined;
var server = undefined;
var httpServer = undefined;

// Express only serves static assets in production
if (configs.websiteconfig.mode == 'prod') {
  server = app = require('./server/server.prod');
  httpServer = require('http').createServer(app);
} else {
  server = require('./server/server.dev');
  app = server.app;
  httpServer = server.listeningApp;
}

var SocketIO = require('./chat/SocketIO');
var io = new SocketIO(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', login);
app.use('/test', test);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

/**
 * !!!
 */
if (configs.websiteconfig.mode == 'prod') {
  httpServer.listen(port);
} else {
  server.listen(3003);
}

module.exports = app;
