const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: ["./src/main.js"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true
    },
    devtool: 'source-map',
    mode : devMode ? 'development' : 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].html"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                exclude: /images/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font/'
                    }
                }]
            }
        ]
    }
}