const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index',
    mode: 'production',
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'hostApp',
            remotes: {
                //localhost is name of the nginx server name
                remoteApp: 'remoteApp@http://localhost:3001/remote/remoteEntry.js',
            },
            shared: {
                react: { singleton: true, requiredVersion: '^18.3.1',eager:true },
                'react-dom': { singleton: true, requiredVersion: '^18.3.1',eager:true },
            },
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
    resolve: { extensions: ['.js', '.jsx'] },
};
