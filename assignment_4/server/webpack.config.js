const path = require("path");

module.exports = {
  entry: "./client/src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "client/src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "public/js",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"),
    libraryTarget: "window",
    library: "app",
  },
};
