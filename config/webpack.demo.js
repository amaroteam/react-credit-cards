/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var dateFns = require('date-fns');
var WebpackDevServer = require('webpack-dev-server');

var cssLoaders = ['css', 'postcss?pack=custom', 'sass'];
var config = {
  context: path.join(__dirname, '../demo'),
  resolve: {
    modules: [path.join(__dirname, '../demo'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3030',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './index.jsx',
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:3000/',
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 9',
                  'ie_mob >= 10',
                  'ff >= 30',
                  'chrome >= 34',
                  'safari >= 7',
                  'opera >= 23',
                  'ios >= 7',
                  'android >= 4.4',
                  'bb >= 10',
                ],
              }),
            ],
          };
        },
      },
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      notify: true,
      logPrefix: 'rccs',
      proxy: 'http://localhost:3030',
    }, {
      reload: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel?cacheDirectory'],
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../demo'),
        ],
      },
      {
        test: /\.scss$/,
        loader: ['style'].concat(cssLoaders).join('!'),
      },
    ],
  },
};

var compiler = webpack(config);
var start;

compiler.plugin('compile', function() {
  start = new Date();
  console.log(dateFns.format(start, 'hh:mm:ss') + ' Bundling...');
});

compiler.plugin('emit', function(compilation, callback) {
  var now = new Date();
  console.log('Duration: ' + dateFns.differenceInSeconds(now, start) + 's');
  console.log('Hash: ' + compilation.hash);
  callback();
});

new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../demo'),
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(3030, 'localhost', function(err) {
  if (err) {
    console.log('err', err);
  }
});
