const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  devServer: {
    port: 3001,
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
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button' // expose Button component
      },
      shared: {
        react: { singleton: true, requiredVersion:false,eager: true },
        'react-dom': { singleton: true, requiredVersion: false,eager: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
