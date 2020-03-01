const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: [
        './src/js/main.js',
        './src/css/reset.css',
        './src/css/all.css',
        './src/css/slideStyle.css',
        './src/css/searchStyle.css',
    ],

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 10% in KR'],
                        },
                        debug: true
                    }]],
            },
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader'
            ],
        }, {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
                name: '[hash].[ext]',
                limit: 10000,
            },
        }]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/',
    },
};