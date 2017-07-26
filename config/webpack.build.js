/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const webpackConfig = require('./webpack.config');

const config = merge.smart(webpackConfig, {
  entry: {
    index: path.join(__dirname, '../src/', 'index.jsx'),
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../lib'),
    libraryTarget: 'umd',
    library: ['ReactCreditCards'],
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['lib'], { root: path.join(__dirname, '../') }),
    new CopyPlugin([
      { from: 'styles.scss' },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
  watch: false,
});

module.exports = config;
