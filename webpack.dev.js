'use strict';

require('dotenv').config();

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(process.cwd(), './src/ui/index.js'),
  output: {
    path: path.resolve(process.cwd(), './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(process.cwd(), 'build'),
    compress: true,
    port: 9966,
  },
};
