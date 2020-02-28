const path = require("path");

module.exports = {
  mode: "development",
  entry: { js: "./src/js/main.js", css: "./src/style/main.js" },
  watch: true,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        // include: [path.resolve(__dirname, "main")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        query: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
