const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  devServer: {
    port: 8082,
    historyApiFallback: true,
    headers: {   // ✅ must be defined here
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization"
    },
  },
  module: {
    rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" }],
  },
  devtool: "cheap-module-source-map",


  output: {
    publicPath: "auto",
    crossOriginLoading: "anonymous",  // 👈 enables proper script sharing between origins
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
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
