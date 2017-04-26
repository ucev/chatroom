const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = require('./config').websiteconfig.port;

module.exports = function (env) {
  console.log("config file: " + __filename);
  return {
    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      path.resolve(__dirname, '../src/index.dev.js')
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../public'),
      hot: true,
      port: port,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader'
          })
        },
        {
          test: /\.svg$/,
          use: 'svg-loader'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      extensions: ['.js']
    }
  }
};