const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const basepath = path.resolve(__dirname, "..");

const server = express();

server.use(express.static(path.join(basepath, 'dist')));
server.use(express.static(path.join(basepath, 'public')));

module.exports = server;
