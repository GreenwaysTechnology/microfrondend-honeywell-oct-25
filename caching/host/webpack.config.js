const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, 'dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } },
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
