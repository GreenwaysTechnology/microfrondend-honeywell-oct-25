const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3001,
    static: path.resolve(__dirname, 'dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    allowedHosts: 'all',  // allows all hosts
  },
  output: {
    publicPath: 'auto',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
