const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const configs = require('./configs/config');
// router
const login = require('./router/login');
const test = require('./router/test');
const port = require('./configs/config').websiteconfig.port;

var server = undefined;

// Express only serves static assets in production
if (configs.websiteconfig.mode == 'prod') {
  server = require('./server/server.prod');
} else {
  server = require('./server/server.dev');
}

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.use('/login', login);
server.use('/test', test);

server.listen(port, "localhost", function() {
  console.log(`Starting server on http://localhost:${port}`);
})

module.exports = server;
