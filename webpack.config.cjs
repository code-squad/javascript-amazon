const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ENTRY_FILE = path.resolve(__dirname, "src", "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "src", "build");

const config = {
  entry: ENTRY_FILE,
  mode: "production",
  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          "css-loader"
        ]
      }
    ]
  }
};

module.exports = config;
