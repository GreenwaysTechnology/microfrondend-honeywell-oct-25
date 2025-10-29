const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const fs = require('fs');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
  },
  devServer: {
    port: 3001,
    static: path.resolve(__dirname, 'dist'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.[contenthash].js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: ['react', 'react-dom'],
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('GenerateRemoteEntryManifest', (stats) => {
          const info = stats.toJson().assetsByChunkName;
          const remoteEntryFile = Array.isArray(info.remoteApp)
            ? info.remoteApp.find(file => file.startsWith('remoteEntry'))
            : info.remoteApp;

          const manifest = { remoteEntry: remoteEntryFile };
          fs.writeFileSync(
            path.join(__dirname, 'dist', 'remoteEntry-manifest.json'),
            JSON.stringify(manifest, null, 2)
          );
        });
      },
    },
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
