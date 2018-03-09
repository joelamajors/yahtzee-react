const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const resolveRoot = require('path').resolve.bind(null, __dirname, '..');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./client.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
              presets: ['es2015', 'react', 'stage-1']
          }
        },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap&sourceComments'
      }
    ]
  },
  sassLoader: {
    sourceMap: true,
    includePaths: [
      resolveRoot('./app/assets/stylesheets')
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]

};
