/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const webpackConfig = require('./webpack.config');
const NPMPackage = require('../../package');

const config = merge.smart(webpackConfig, {
  entry: {
    demo: './index.jsx',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../../docs'),
    publicPath: '/react-credit-cards',
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['docs'], { root: path.join(__dirname, '../../') }),
    new ExtractText('demo.[hash].css'),
    new HtmlPlugin({
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title,
    }),
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
});

module.exports = config;
