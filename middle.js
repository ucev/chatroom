//const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')("dev");

const test = require('./router/test');

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, {
  contentBase: path.join(__dirname, "public"),
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

server.use('/test', test);

server.listen(webpackConfig.devServer.port, '127.0.0.1', function() {
  console.log(`Starting server on http://localhost:${webpackConfig.devServer.port}`);
});