const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    devServer: {
        port: 3000,
        historyApiFallback: true,
        headers: {   // ✅ must be defined here
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
        },
    },
    entry: "./src/index.js",
    devtool: "cheap-module-source-map",
    output: {
        publicPath: "auto",
        crossOriginLoading: "anonymous",  // 👈 enables proper script sharing between origins
    },

    module: {
        rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" }],
    },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
        new ModuleFederationPlugin({
            name: "shell",
            filename: "remoteEntry.js",
            exposes: {
                "./AuthStore": "./src/authStore",
                "./Navigation": "./src/navigation"  // 👈 expose navigation API
            },
            remotes: {
                app1: "app1@http://localhost:8080/remoteEntry.js",
                app2: "app2@http://localhost:8082/remoteEntry.js",
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
};
