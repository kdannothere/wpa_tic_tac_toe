const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'), // Changed output directory to 'docs'
    filename: 'bundle.js',
    publicPath: '/pwa_tic_tac_toe/', // Set publicPath for GitHub Pages
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/icon-192x192.svg' // This will be correctly linked with publicPath
    }),
    new InjectManifest({
      swSrc: './public/sw.js',
      swDest: 'sw.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/icon-192x192.svg', to: 'icon-192x192.svg' },
        { from: 'public/icon-512x512.svg', to: 'icon-512x512.svg' },
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'docs'), // Changed devServer static path
    historyApiFallback: true, // Important for single-page apps
  },
};