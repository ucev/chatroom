const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: [
      path.join(__dirname, '../src/index.js')
    ],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '../dist')
    },
    devtool: 'inline-source-map',
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
      new ExtractTextPlugin('styles.css')
    ],
    resolve: {
      extensions: ['.js']
    }
  }
};