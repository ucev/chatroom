//const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config')("dev");

const basepath = path.resolve(__dirname, "..");

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, {
  contentBase: path.join(basepath, "public"),
  stats: {
    colors: true
  },
	setup: function(app) {
		app.use(function(req, res, next) {
			console.log(`Using middleware for ${req.url}`);
			next();
		});
	}
})

module.exports = server;