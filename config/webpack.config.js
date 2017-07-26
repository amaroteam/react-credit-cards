/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';
const cssLoaders = [
  'style',
  'css?sourceMap',
  {
    loader: 'postcss',
    options: {
      sourceMap: true,
      plugins: [
        autoprefixer(),
      ],
    },
  },
  'sass?sourceMap',
];

const config = {
  context: path.join(__dirname, '../src'),
  resolve: {
    alias: {
      assets: path.join(__dirname, '../assets'),
      test: path.join(__dirname, '../test'),
    },
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  entry: path.join(__dirname, '../src/', 'index.jsx'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../lib'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel?cacheDirectory'],
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../test'),
        ],
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? ExtractText.extract({
            use: cssLoaders.slice(1),
          })
          : cssLoaders,
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractText('styles-compiled.css'),
  ],
  watch: true,
};

module.exports = config;
