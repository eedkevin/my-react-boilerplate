var path = require('path');
var webpack = require('webpack');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var config = {
  devtool: 'cheap-module-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?',
      'webpack/hot/only-dev-server',
      'whatwg-fetch',
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js'
    ],
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    pathinfo: true,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: {
          cacheDirectory: true,
          presets: [
            ['env', {
              targets: {
                browsers: [
                  "> 1%",
                  "last 2 versions"
                ],
              }
            }],
            'stage-2',
            'react',
          ],
          plugins: [
            'react-hot-loader/babel',
            // Adds component stack to warning messages
            'transform-react-jsx-source',
            // Adds __self attribute to JSX which React will use for some warnings
            'transform-react-jsx-self',
            ["react-intl", {
              "messagesDir": "./build/messages/"
            }],
          ]
        }
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.(scss|sass)$/,
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
        ]
      }
      /*
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'sass-loader',
        ]
      },
      */
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: process.env.ENV,
        NODE_ENV: '"development"',
        browser: 'true',
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new AssetsPlugin({
      fullPath: false,
      filename: 'build/assets.json',
      prettyPrint: true,
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};

module.exports = config;