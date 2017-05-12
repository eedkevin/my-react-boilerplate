var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var OfflinePlugin = require('offline-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var cssFilename = 'static/css/[name].[contenthash:8].css';

var config = {
  devtool: 'hidden-source-map',
  entry: {
    main: [
      'whatwg-fetch',
      'babel-polyfill',
      './src/index.js'
    ],
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    pathinfo: true,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: process.env.PUBLIC_URL || '/',
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
          'transform-react-constant-elements',
          ["react-intl", {
            "messagesDir": "./build/messages/"
          }],
        ],
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                  }),
                ],
              },
            },
          ],
        }),
      },
      /*
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                module: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                  }),
                ],
              },
            },
            'sass-loader',
          ],
        }),
      },
      */
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: process.env.ENV,
        NODE_ENV: '"production"',
        browser: 'false',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      production: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeNilAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new OfflinePlugin({
      ServiceWorker: {
        entry: path.resolve(process.cwd(), 'src/sw.js'),
        output: 'sw.js',
        events: true,
        publicPath: '/sw.js',
        navigateFallbackURL: '/index.html',
      },
      AppCache: false,
    }),
    new AssetsPlugin({
      fullPath: true,
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