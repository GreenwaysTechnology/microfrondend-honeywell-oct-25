const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_app',
      remotes: {
        // remote_app is loaded from remoteEntry.js of remote-app on port 3001
        remote_app: 'remote_app@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: true },
        'react-dom': { singleton: true, requiredVersion: false, eager: true },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: false, eager: true },
        'react-redux': { singleton: true, requiredVersion: false, eager: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
