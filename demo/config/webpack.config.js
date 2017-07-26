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
  context: path.join(__dirname, '../'),
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  entry: {},
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel?cacheDirectory'],
        include: [
          path.join(__dirname, '../../src'),
          path.join(__dirname, '../'),
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
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file',
            query: { name: 'media/[name].[ext]' },
          },
          {
            loader: 'image-webpack',
            query: {
              optipng: {
                optimizationLevel: 5,
              },
              pngquant: {
                quality: '75-90',
              },
            },
          },
        ],
        include: /media/,
      },
    ],
  },
};

module.exports = config;
