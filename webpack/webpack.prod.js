const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

process.traceDeprecation = true;

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    app: `./index.js`,
    vendor: ['react', 'react-dom', 'react-router','react-bootstrap']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:6].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(['css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]",camelCase'])
    }]
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '..')
    }),
    new ExtractTextPlugin({
      filename: 'styles.[chunkhash:6].css',
      allChunks: true
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `./index.html`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
