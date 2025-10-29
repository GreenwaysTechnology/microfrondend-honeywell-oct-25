const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    headers: {   // ✅ must be defined here
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
    },
  },
  output: {
    publicPath: "auto",
    crossOriginLoading: "anonymous",  // 👈 enables proper script sharing between origins
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" }],
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell@http://localhost:3000/remoteEntry.js",
      },
      exposes: { "./App": "./src/App" },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
